import { useState } from "react";

export default function MintPropertyForm({ contract, wallet }) {
  const [tokenURI, setTokenURI] = useState("https://gateway.pinata.cloud/ipfs/");
  const [minting, setMinting] = useState(false);
  const [mintedTokenId, setMintedTokenId] = useState(null);

  const handleMint = async () => {
    if (!tokenURI) return alert("Enter a token URI");
    try {
      setMinting(true);
      const tx = await contract.mintProperty(wallet, tokenURI);
      const receipt = await tx.wait();

      const event = receipt.logs
        .map((log) => {
          try {
            return contract.interface.parseLog(log);
          } catch {
            return null;
          }
        })
        .find((e) => e && e.name === "Transfer");

      const tokenId = event?.args?.tokenId?.toString();
      setMintedTokenId(tokenId);
      setTokenURI("https://gateway.pinata.cloud/ipfs/"); // Reset to default after mint
    } catch (err) {
      alert("Minting failed");
      console.error(err);
    } finally {
      setMinting(false);
    }
  };

  return (
    <div className="border p-4 rounded-xl bg-white shadow space-y-4">
      <h2 className="text-lg font-semibold">Mint Property Token</h2>
      <div>
        <label className="block text-sm font-medium mb-1">Owner Address</label>
        <input
          type="text"
          disabled
          value={wallet}
          className="w-full px-3 py-2 border rounded text-sm bg-gray-100"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Token URI (IPFS/URL)</label>
        <input
          type="text"
          value={tokenURI}
          onChange={(e) => setTokenURI(e.target.value)}
          className="w-full px-3 py-2 border rounded text-sm"
        />
      </div>
      <button
        onClick={handleMint}
        disabled={minting}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {minting ? "Minting..." : "Mint Token"}
      </button>

      {mintedTokenId && (
        <p className="text-green-600 text-sm mt-2">
          Property token minted! Token ID: <strong>{mintedTokenId}</strong>
        </p>
      )}
    </div>
  );
}
