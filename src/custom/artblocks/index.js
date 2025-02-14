import axios from "axios";
import slugify from "slugify";

export const fetchCollection = async (_chainId, { contract, tokenId }) => {
  const url = `https://token.artblocks.io/${tokenId}`;
  const { data } = await axios.get(url);

  const startTokenId = tokenId - (tokenId % 1000000);
  const endTokenId = startTokenId + 1000000 - 1;

  return {
    id: `${contract}:${startTokenId}:${endTokenId}`,
    slug: slugify(data.collection_name, { lower: true }),
    name: data.collection_name,
    community: "artblocks",
    metadata: {
      imageUrl: `https://media.artblocks.io/${startTokenId}.png`,
      description: data.description,
      externalUrl: data.website,
    },
    royalties: [
      {
        recipient: "0x6c093fe8bc59e1e0cae2ec10f0b717d3d182056b",
        bps: 750,
      },
    ],
    contract,
    tokenIdRange: [startTokenId, endTokenId],
    tokenSetId: `range:${contract}:${startTokenId}:${endTokenId}`,
  };
};
