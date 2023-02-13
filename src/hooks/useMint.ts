import * as anchor from "@project-serum/anchor"
import { useState, useEffect } from 'react';
import {
  createAssociatedTokenAccountInstruction, createInitializeMintInstruction, getAssociatedTokenAddress, MINT_SIZE, TOKEN_PROGRAM_ID
} from "@solana/spl-token"
import {
  Connection,
  Keypair,
  PublicKey,
  SystemProgram,
  Transaction
} from "@solana/web3.js"
import { AnchorWallet } from "@solana/wallet-adapter-react";
import mintIdl from "../idl/nft_mint.json";
import { IDL, NftMint } from "../types/nft_mint";

function getAnchorEnvironment(rpc: string, idl: typeof IDL, wallet: AnchorWallet, programId: PublicKey) {
  const connection = new Connection(rpc, {
    commitment: "max",
  })
  const provider = new anchor.AnchorProvider(connection, wallet, {})
  anchor.setProvider(provider)
  const programClient = new anchor.Program(idl, programId)
  return [programClient, provider, connection]
}
export type Creators = {
  address: PublicKey,
  verified: boolean,
  share: number,
}

export type MintProps = {
  loading: boolean,
  title: string,
  rpc: string,
  wallet?: AnchorWallet,
  mintPrice: anchor.BN,
  symbol: string,
  creators: Creators[],
  seller: PublicKey,
  royalty: number,
}

export default function useMint(props: MintProps, anchorWallet?: AnchorWallet) {
  const [idl, setIdl] = useState(mintIdl);
  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const [connection, setConnection] = useState<Connection | undefined>();
  const [program, setProgram] = useState<anchor.Program<NftMint>>();
  const [provider, setProvider] = useState<anchor.AnchorProvider>();
  const [error, setError] = useState<string>("");
  useEffect(() => {
    if (ready) return;
    if (!anchorWallet) { return; }
    setReady(false);
    let [program, provider, connection] = getAnchorEnvironment(
      props.rpc,
      idl as unknown as typeof IDL,
      anchorWallet,
      new PublicKey(idl.metadata.address)
    )
    setConnection(connection as Connection);
    setProgram(program as anchor.Program<NftMint>);
    setProvider(provider as anchor.AnchorProvider);
    if (!program) { setError("no program"); return; }
    if (!provider) { setError("provider wallet"); return; }
    if (!connection) { setError("no connection"); return; }
    if (props.royalty < 0 || props.royalty > 1500) { setError("royalties too high/low"); return; }
    setReady(true);
  }, [anchorWallet, props]);
  async function mintNft(nftUrl: string) {
    if (!anchorWallet) { setError("no wallet"); return; }
    if (!program) { setError("no program"); return; }
    if (!provider) { setError("provider wallet"); return; }
    if (!connection) { setError("no connection"); return; }
    if (props.royalty < 0 || props.royalty > 1500) { setError("royalties too high/low"); return; }
    if (!nftUrl) { setError("no nft data url"); return; }
    setLoading(true);

    const getMetadata = async (
      mint: anchor.web3.PublicKey
    ): Promise<anchor.web3.PublicKey> => {
      return (
        anchor.web3.PublicKey.findProgramAddressSync(
          [
            Buffer.from("metadata"),
            TOKEN_METADATA_PROGRAM_ID.toBuffer(),
            mint.toBuffer(),
          ],
          TOKEN_METADATA_PROGRAM_ID
        )
      )[0];
    };

    const getMasterEdition = async (
      mint: anchor.web3.PublicKey
    ): Promise<anchor.web3.PublicKey> => {
      return (
        anchor.web3.PublicKey.findProgramAddressSync(
          [
            Buffer.from("metadata"),
            TOKEN_METADATA_PROGRAM_ID.toBuffer(),
            mint.toBuffer(),
            Buffer.from("edition"),
          ],
          TOKEN_METADATA_PROGRAM_ID
        )
      )[0];
    };
    const TOKEN_METADATA_PROGRAM_ID = new PublicKey("metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s")
    const mintKey: Keypair = Keypair.generate()
    const NftTokenAccount = await getAssociatedTokenAddress(mintKey.publicKey, anchorWallet.publicKey)
    console.log("NFT Account: ", NftTokenAccount.toBase58());
    const lamports: number =
      await connection.getMinimumBalanceForRentExemption(
        MINT_SIZE
      );

    const tx1 = new anchor.web3.Transaction().add(
      anchor.web3.SystemProgram.createAccount({
        fromPubkey: anchorWallet.publicKey,
        newAccountPubkey: mintKey.publicKey,
        space: MINT_SIZE,
        programId: TOKEN_PROGRAM_ID,
        lamports,
      }),
      createInitializeMintInstruction(
        mintKey.publicKey,
        0,
        anchorWallet.publicKey,
        anchorWallet.publicKey
      ),
      createAssociatedTokenAccountInstruction(
        anchorWallet.publicKey,
        NftTokenAccount,
        anchorWallet.publicKey,
        mintKey.publicKey
      )
    );
    const metadataAddress = await getMetadata(mintKey.publicKey)
    const masterEdition = await getMasterEdition(mintKey.publicKey);

    let feeReceiver = new PublicKey("Code2raHfHLuM5RNepJwUc3ML16uAfvczm3k5FbjviNA");

    let creators =  [
      {
        address: mintKey.publicKey,
        verified: false,
        share: 0,
      },
      ...props.creators.map((creator) => ({
        address: new PublicKey(creator.address),
        verified: creator.verified,
        share: creator.share,
      }))
    ];
    try {
      // @ts-ignore
      let tx2 = await program.methods
        .mintNft(
          props.title,
          props.symbol,
          nftUrl,
          props.mintPrice,
          new anchor.BN(25000),
          creators,
          props.royalty)
        .accounts({
          mintAuthority: anchorWallet.publicKey,
          mint: mintKey.publicKey,
          tokenAccount: NftTokenAccount,
          tokenProgram: TOKEN_PROGRAM_ID,
          metadata: metadataAddress,
          tokenMetadataProgram: TOKEN_METADATA_PROGRAM_ID,
          payer: anchorWallet.publicKey,
          systemProgram: SystemProgram.programId,
          rent: anchor.web3.SYSVAR_RENT_PUBKEY,
          masterEdition: masterEdition,
          minter: anchorWallet.publicKey,
          receiver: props.seller,
          feeReceiver: feeReceiver,
        })
        .instruction();
      const tx = new Transaction().add(tx1).add(tx2);
      const sig = await provider.sendAndConfirm(tx, [mintKey]);
      return `Transaction signature ${sig}`;
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }
  return {mintNft, ready, error};

}