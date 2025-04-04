import { useState } from "react";

export default function MintPropertyForm({ contract, wallet }) {
  const [to, setTo] = useState(wallet);
  const [tokenURI, setTokenURI] = useState("");
  const [status, setStatus] = useState("");

  const handleMint = async (e) => {
    e.preventDefault();
    try {
      setStatus("Minting...");
      const tx = await contract.mintProperty(to, tokenURI);
      await tx.wait();
      setStatus("Minted successfully");
    } catch (error) {
      console.error(error);
      setStatus(" Minting failed");
    }
  };

  return (
    <div className="border p-4 rounded-xl bg-white shadow max-w-xl">
      <h2 className="text-xl font-semibold mb-4">Mint Property Token</h2>
      <form onSubmit={handleMint} className="space-y-4">
        <div>
          <label className="block font-medium">Owner Address</label>
          <input
            type="text"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block font-medium">Token URI (IPFS/URL)</label>
          <input
            type="text"
            value={tokenURI}
            onChange={(e) => setTokenURI(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Mint Token
        </button>
        {status && <p className="text-sm mt-2">{status}</p>}
      </form>
    </div>
  );
}
