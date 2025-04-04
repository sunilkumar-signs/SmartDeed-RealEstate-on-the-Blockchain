import { useState, useEffect } from "react";
import { ethers } from "ethers";
import MintPropertyForm from "./components/MintPropertyForm";
import ListPropertyForm from "./components/ListPropertyForm";
import ListedProperties from "./components/ListedProperties";
import Gallery from "./components/Gallery";

import {
  PROPERTY_TOKEN_ADDRESS,
  MARKETPLACE_ADDRESS,
  PropertyTokenABI,
  MarketplaceABI,
} from "./contractConfig";

export default function App() {
  const [wallet, setWallet] = useState(null);
  const [propertyToken, setPropertyToken] = useState(null);
  const [marketplace, setMarketplace] = useState(null);
  const [activeTab, setActiveTab] = useState("home"); // NEW

  const connectWallet = async () => {
    if (!window.ethereum) return alert("MetaMask not found");
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    setWallet(accounts[0]);

    const propertyContract = new ethers.Contract(
      PROPERTY_TOKEN_ADDRESS,
      PropertyTokenABI.abi,
      signer
    );
    setPropertyToken(propertyContract);

    const marketplaceContract = new ethers.Contract(
      MARKETPLACE_ADDRESS,
      MarketplaceABI.abi,
      signer
    );
    setMarketplace(marketplaceContract);
  };

  useEffect(() => {
    connectWallet();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-4">SmartDeed DApp</h1>
      {wallet && <p className="text-sm">Connected Wallet: {wallet}</p>}
      <div className="flex space-x-4 border-b pb-2 mt-4">
        {["home", "gallery", "list"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-t ${
              activeTab === tab
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {tab === "home" && "🏠 Home"}
            {tab === "gallery" && "🖼️ Gallery"}
            {tab === "list" && "🏗️ List Property"}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "home" && (
        <div>
          <p className="text-lg mb-4">Welcome to SmartDeed — the future of real estate on-chain.</p>
          {marketplace && wallet && (
            <ListedProperties
              marketplace={marketplace}
              wallet={wallet}
              propertyToken={propertyToken}
            />
          )}
        </div>
      )}

      {activeTab === "gallery" && (
        <Gallery
          propertyToken={propertyToken}
          marketplace={marketplace}
          wallet={wallet}
        />
      )}

      {activeTab === "list" && (
        <>
          {propertyToken && wallet && (
            <MintPropertyForm contract={propertyToken} wallet={wallet} />
          )}
          {propertyToken && marketplace && wallet && (
            <ListPropertyForm
              propertyToken={propertyToken}
              marketplace={marketplace}
              wallet={wallet}
            />
          )}
        </>
      )}
    </div>
  );
}
