import { useEffect, useState } from "react";
import { ethers } from "ethers";

export default function ListedProperties({ marketplace, wallet, propertyToken}) {
  const [listings, setListings] = useState([]);
  const [status, setStatus] = useState("");

  const fetchListings = async () => {
    const results = [];
  
    for (let tokenId = 0; tokenId < 10; tokenId++) {
      try {
        const listing = await marketplace.getListing(tokenId);
        const price = listing[0];
        const seller = listing[1];
  
        if (seller !== "0x0000000000000000000000000000000000000000") {
          // Get tokenURI from PropertyToken
          const tokenURI = await propertyToken.tokenURI(tokenId);
  
          // Fetch metadata from IPFS
          const res = await fetch(tokenURI);
          const metadata = await res.json();
  
          results.push({
            tokenId,
            seller,
            price: price.toString(),
            metadata
          });
        }
      } catch (err) {
        // Skip if token isn't listed or any error
      }
    }
  
    setListings(results);
  };  

  const handleBuy = async (tokenId, price) => {
    try {
      setStatus(`Buying token ${tokenId}...`);
      const tx = await marketplace.buyToken(tokenId, {
        value: price
      });
      await tx.wait();
      setStatus(`Successfully purchased token ${tokenId}`);
      fetchListings(); // refresh view
    } catch (err) {
      console.error(err);
      setStatus(`Error buying token ${tokenId}`);
    }
  };

  useEffect(() => {
    if (marketplace) {
      fetchListings();
    }
  }, [marketplace]);

  return (
    <div className="mt-8 border p-4 rounded-xl bg-white shadow max-w-2xl">
      <h2 className="text-xl font-semibold mb-4">Listed Properties</h2>
      <button
            onClick={fetchListings}
            className="mb-4 bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
            >
            Refresh Listings
      </button>
      {status && <p className="text-sm mb-2">{status}</p>}
      {listings.length === 0 ? (
        <p>No properties currently listed.</p>
      ) : (
        <ul className="space-y-4">
          {listings.map((listing) => (
            <li key={listing.tokenId} className="border p-3 rounded space-y-2">
                <p><strong>Token ID:</strong> {listing.tokenId}</p>
                <p><strong>Name:</strong> {listing.metadata.name}</p>
                <p><strong>Description:</strong> {listing.metadata.description}</p>
                {listing.metadata.image && (
                <img src={listing.metadata.image} alt="Property" className="w-full max-w-xs rounded" />
                )}
                <p><strong>Seller:</strong> {listing.seller}</p>
                <p><strong>Price (wei):</strong> {listing.price}</p>
            
                {wallet.toLowerCase() !== listing.seller.toLowerCase() && (
                <button
                    onClick={() => handleBuy(listing.tokenId, listing.price)}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Buy Token
                </button>
                )}
            </li>
          
          ))}
        </ul>
      )}
    </div>
  );
}
