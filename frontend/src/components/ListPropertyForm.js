import { useState } from "react";
import { ethers } from "ethers";

export default function ListPropertyForm({ propertyToken, marketplace, wallet }) {
  const [tokenId, setTokenId] = useState("");
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState("");

  const handleList = async (e) => {
    e.preventDefault();
    try {
      setStatus("Approving token...");
      const approveTx = await propertyToken.approve(marketplace.target, tokenId);
      await approveTx.wait();

      setStatus("Listing token for sale...");
      const priceInWei = ethers.parseEther(price); // expects ETH input
      const listTx = await marketplace.listToken(tokenId, priceInWei);
      await listTx.wait();

      setStatus("Token listed successfully");
    } catch (error) {
      console.error(error);
      setStatus("Listing failed");
    }
  };

  return (
    <div className="border p-4 rounded-xl bg-white shadow max-w-xl">
      <h2 className="text-xl font-semibold mb-4">List Property for Sale</h2>
      <form onSubmit={handleList} className="space-y-4">
        <div>
          <label className="block font-medium">Token ID</label>
          <input
            type="number"
            value={tokenId}
            onChange={(e) => setTokenId(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block font-medium">Price (in ETH)</label>
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          List Token
        </button>
        {status && <p className="text-sm mt-2">{status}</p>}
      </form>
    </div>
  );
}
