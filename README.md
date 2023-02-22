# React Solana NFT Mint  

Mint NFTs on Solana 
With this package, all you need to mint NFTs is to provide your JSON file as an URL to the mint function.

The props should be self-explanatory, but they are: 

* rpc: devnet/mainnet URL
* creators: array of pubkeys (total shares must sum up to 100)
* mintPrice: how much you take
* seller: pubkey that receives the SOL
* symbol: any symbol (keep it short)
* royalty: 500 equals 5% 

## Setup

### Installation

`yarn add react-solana-nftmint` or `npm i -S react-solana-nftmint`

### Usage

```tsx
import * as anchor from "@project-serum/anchor";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import React, { useCallback } from "react";
import useMint, { MintProps } from "react-solana-nftmint";

export default function MyComponent() {
    const anchorWallet = useAnchorWallet()
    const props: MintProps = {
        rpc: "https://api.devnet.solana.com",
        title: "Sample NFT",
        creators: [
            {
                address: new PublicKey("6xnRdTedrerREnaveYndZPioRuK1JcQPfnyA5mQME6vT"),
                verified: false,
                share: 100 // sums must total 100 if you have more than one creator
            },
        ],
        mintPrice: new anchor.BN(0.05 * LAMPORTS_PER_SOL),
        symbol: "",
        seller: new PublicKey("6xnRdTedrerREnaveYndZPioRuK1JcQPfnyA5mQME6vT"),
        royalty: 500,
    }
    const { mintNft, ready, uploading, error } = useMint(props, anchorWallet);

    const handleMint = useCallback(async () => {
        if (!anchorWallet) {
            return
        }
        let nftURL = "https://files.sdrive.app/15zg0r4.json";
        await mintNft(nftURL);
    }, [props, anchorWallet])

    return (
        <div>
            {error && <div>{error}</div>}
            {uploading && <div>NFT is cooking...</div>}
            <button disabled={!ready} onClick={handleMint}>Mint {props.title}</button>
        </div>
    )
};
```
