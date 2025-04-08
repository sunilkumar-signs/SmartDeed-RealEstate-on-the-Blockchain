import { useEffect, useState } from "react";
import { ethers } from "ethers";

export default function RealPropertyGallery({ propertyToken, marketplace, wallet }) {
  const [tokens, setTokens] = useState([]);

  const fetchGallery = async () => {
    const results = [];

    try {
      const total = await propertyToken.getCurrentTokenId();

      for (let tokenId = 0; tokenId < total; tokenId++) {
        try {
          const tokenURI = await propertyToken.tokenURI(tokenId);
          const res = await fetch(tokenURI);
          if (!res.ok) throw new Error(`Failed to fetch metadata for token ${tokenId}`);
          const metadata = await res.json();
          const owner = await propertyToken.ownerOf(tokenId);

          let listing = null;
          try {
            const data = await marketplace.getListing(tokenId);
            if (data[1] !== "0x0000000000000000000000000000000000000000") {
              listing = {
                price: ethers.formatEther(data[0]),
                seller: data[1],
              };
            }
          } catch (_) {}

          results.push({
            tokenId: tokenId.toString(),
            metadata,
            owner,
            listing,
          });
        } catch (err) {
          console.warn(`Skipping token ID ${tokenId}:`, err);
        }
      }

      setTokens(results.slice(0, 4)); // Limit to 4 cards
    } catch (err) {
      console.error("Failed to load tokens:", err);
    }
  };

  useEffect(() => {
    if (propertyToken && marketplace && wallet) fetchGallery();
  }, [propertyToken, marketplace, wallet]);

  return (
    <section className="py-12 px-4 md:px-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {tokens.map((t) => (
          <div
            key={t.tokenId}
            className="bg-white shadow rounded-lg overflow-hidden hover:shadow-md transition"
          >
            <img src={t.metadata.image} alt={t.metadata.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="font-bold text-lg">{t.metadata.name}</h3>
              <p className="text-sm text-gray-600">{t.metadata.description}</p>
              <p className="text-sm text-gray-500 mb-2">
                Owner: {t.owner.slice(0, 6)}...{t.owner.slice(-4)}
              </p>
              {t.listing ? (
                <p className="text-sm text-green-600 font-semibold">
                  Listed @ {t.listing.price} ETH
                </p>
              ) : (
                <p className="text-sm text-gray-500 italic">Not Listed</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
