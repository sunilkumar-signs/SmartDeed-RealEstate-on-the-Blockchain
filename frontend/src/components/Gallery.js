import { useEffect, useState, useCallback } from "react";
import { ethers } from "ethers";

export default function Gallery({ propertyToken, marketplace, wallet }) {
  const [tokens, setTokens] = useState([]);

  const fetchGallery = useCallback(async () => {
    const results = [];

    for (let tokenId = 0; tokenId < 10; tokenId++) {
      try {
        const tokenURI = await propertyToken.tokenURI(tokenId);
        const res = await fetch(tokenURI);
        const metadata = await res.json();
        const owner = await propertyToken.ownerOf(tokenId);

        let listing = null;
        try {
          const data = await marketplace.getListing(tokenId);
          if (
            data[1] !== "0x0000000000000000000000000000000000000000"
          ) {
            listing = {
              price: ethers.formatEther(data[0]),
              seller: data[1],
            };
          }
        } catch (_) {
          // Not listed — continue
        }

        results.push({
          tokenId,
          metadata,
          owner,
          listing,
        });
      } catch (err) {
        // Token doesn't exist — skip
      }
    }

    setTokens(results);
  }, [propertyToken, marketplace]);

  useEffect(() => {
    if (propertyToken && marketplace) {
      fetchGallery();
    }
  }, [fetchGallery]);

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-4">All Properties Gallery</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tokens.map((t) => (
          <div
            key={t.tokenId}
            className="border p-4 rounded-xl shadow bg-white space-y-2"
          >
            <img
              src={t.metadata.image}
              alt={t.metadata.name}
              className="w-full max-w-xs rounded"
            />
            <h3 className="text-lg font-semibold">{t.metadata.name}</h3>
            <p className="text-sm text-gray-600">{t.metadata.description}</p>
            <p className="text-sm">
              <strong>Token ID:</strong> {t.tokenId}
            </p>
            <p className="text-sm">
              <strong>Owner:</strong> {t.owner}
            </p>

            {t.listing ? (
              <p className="text-sm text-green-600">
                For Sale @ {t.listing.price} ETH
              </p>
            ) : (
              <p className="text-sm text-gray-500">Not Listed</p>
            )}

            {wallet.toLowerCase() === t.owner.toLowerCase() && (
              <p className="text-sm text-blue-600">You Own This</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
