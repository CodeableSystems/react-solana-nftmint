export type NftMint = {
  "version": "0.1.0",
  "name": "nft_mint",
  "instructions": [
    {
      "name": "mintNft",
      "accounts": [
        {
          "name": "mintAuthority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "mint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "metadata",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMetadataProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "masterEdition",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "originalCreator",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "minter",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "receiver",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "feeReceiver",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "title",
          "type": "string"
        },
        {
          "name": "symbol",
          "type": "string"
        },
        {
          "name": "uri",
          "type": "string"
        },
        {
          "name": "price",
          "type": "u64"
        },
        {
          "name": "fee",
          "type": "u64"
        },
        {
          "name": "creators",
          "type": {
            "vec": {
              "defined": "Creators"
            }
          }
        },
        {
          "name": "royalty",
          "type": "u16"
        }
      ]
    }
  ],
  "types": [
    {
      "name": "Creators",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "address",
            "type": "publicKey"
          },
          {
            "name": "verified",
            "type": "bool"
          },
          {
            "name": "share",
            "type": "u8"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "MintFailed",
      "msg": "NFT mint failed!"
    },
    {
      "code": 6001,
      "name": "MetadataCreateFailed",
      "msg": "Metadata account creation failed!"
    },
    {
      "code": 6002,
      "name": "FeeTooLow",
      "msg": "Fee too low!"
    }
  ]
};

export const IDL: NftMint = {
  "version": "0.1.0",
  "name": "nft_mint",
  "instructions": [
    {
      "name": "mintNft",
      "accounts": [
        {
          "name": "mintAuthority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "mint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "metadata",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMetadataProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "masterEdition",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "originalCreator",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "minter",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "receiver",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "feeReceiver",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "title",
          "type": "string"
        },
        {
          "name": "symbol",
          "type": "string"
        },
        {
          "name": "uri",
          "type": "string"
        },
        {
          "name": "price",
          "type": "u64"
        },
        {
          "name": "fee",
          "type": "u64"
        },
        {
          "name": "creators",
          "type": {
            "vec": {
              "defined": "Creators"
            }
          }
        },
        {
          "name": "royalty",
          "type": "u16"
        }
      ]
    }
  ],
  "types": [
    {
      "name": "Creators",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "address",
            "type": "publicKey"
          },
          {
            "name": "verified",
            "type": "bool"
          },
          {
            "name": "share",
            "type": "u8"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "MintFailed",
      "msg": "NFT mint failed!"
    },
    {
      "code": 6001,
      "name": "MetadataCreateFailed",
      "msg": "Metadata account creation failed!"
    },
    {
      "code": 6002,
      "name": "FeeTooLow",
      "msg": "Fee too low!"
    }
  ]
};
