import { useState } from "react";
import { ethers } from "ethers";
import OracleHandlerABI from "../contracts/OracleHandler.json";
const ORACLE_ADDRESS = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";

export default function EthPriceWidget() {
  const [price, setPrice] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchPrice = async () => {
    setLoading(true);
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(ORACLE_ADDRESS, OracleHandlerABI.abi, provider);
      const raw = await contract.getLatestPrice();
      const parsed = ethers.formatUnits(raw, 8);
      setPrice(parsed);
    } catch (err) {
      console.error("Error fetching on-chain price", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border p-4 bg-white rounded-xl shadow mt-10 text-center max-w-lg mx-auto">
      <h2 className="text-lg font-semibold text-gray-800">Live ETH/USD Price</h2>
      <p className="text-2xl font-bold text-blue-600 mt-2 mb-4">
        {price ? `$${price}` : "—"}
      </p>
      <button
        onClick={fetchPrice}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {loading ? "Fetching..." : "Update Price"}
      </button>
    </div>
  );
}
