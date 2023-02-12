# React useMint 


## Setup

### Installation

`yarn add react-use-mint`

### Usage

```tsx
const MyComponent = () => {
  import { AnchorWallet, useAnchorWallet, useConnection } from "@solana/wallet-adapter-react"
  import * as anchor from "@project-serum/anchor"
  import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js"
  import useMint, { MintProps } from "../effects/useMint"

  const anchorWallet = useAnchorWallet()
  const {mintNft, ready, error} = useMint(mintProps, anchorWallet);

  const mintProps: MintProps = {
    loading: false,
    rpc: "https://api.devnet.solana.com",
    title: "My NFT",
    creeators: [
      {
        address: new PublicKey("6xnRdTedrerREnaveYndZPioRuK1JcQPfnyA5mQME6vT"),
        verified: false,
        share: 100 // sums must total 100 if you have more than one creator
      },
    ],
    mintPrice: new anchor.BN(0.25 * LAMPORTS_PER_SOL),
    symbol: "MY_SYMBOL",
    priceReceiver: new PublicKey("6xnRdTedrerREnaveYndZPioRuK1JcQPfnyA5mQME6vT"),
    royalty: 500, // 5%
  }

  const handleMint = useCallback(async () => {
    if (!anchorWallet) {
      return
    }
    let nftURL ="https://files.sdrive.app/1frzxgr.json";
    await mintNft(nftURL);
    setLoading(false)
  }, [nftData, anchorWallet])


return (
	<div>
	  <Button disabled={!ready || !!error} text={`Mint ${name}`} variant={VARIANT.SMALL} onClick={handleMint} />
</div>
)

};
```
