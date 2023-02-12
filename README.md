# React Solana NFT Mint  

Mint NFTs on Solana 

## Setup

### Installation

`yarn add react-solana-mintnft` or `npm i -S react-solana-mintnft`

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
        loading: false,
        rpc: "https://api.devnet.solana.com",
        title: "My NFT",
        creators: [
            {
                address: new PublicKey("6xnRdTedrerREnaveYndZPioRuK1JcQPfnyA5mQME6vT"),
                verified: false,
                share: 100 // sums must total 100 if you have more than one creator
            },
        ],
        mintPrice: new anchor.BN(0.05 * LAMPORTS_PER_SOL),
        symbol: "MY_SYMBOL",
        priceReceiver: new PublicKey("6xnRdTedrerREnaveYndZPioRuK1JcQPfnyA5mQME6vT"),
        royalty: 500,
    }
    const { mintNft, ready, error } = useMint(props, anchorWallet);

    const handleMint = useCallback(async () => {
        if (!anchorWallet) {
            return
        }
        let nftURL = "https://files.sdrive.app/1frzxgr.json";
        await mintNft(nftURL);
    }, [props, anchorWallet])

    return (
        <div>
            {error && <div>{error}</div>}
            <button disabled={!ready} onClick={handleMint}>Mint {props.title}</button>
        </div>
    )
};
```
