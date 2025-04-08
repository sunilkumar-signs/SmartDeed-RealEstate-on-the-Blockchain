import { useState, useEffect } from "react";
import { ethers } from "ethers";
import MintPropertyForm from "./components/MintPropertyForm";
import ListPropertyForm from "./components/ListPropertyForm";
import Gallery from "./components/Gallery";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import RealPropertyGallery from "./components/RealPropertyGallery";
import ListedProperties from "./components/ListedProperties";
import EthPriceWidget from "./components/EthPriceWidget";


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
  const [activePage, setActivePage] = useState("home");

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
    <div className="min-h-screen bg-gray-50">
      <Header wallet={wallet} setActivePage={setActivePage} />

      {activePage === "home" && (
        <>
          <HeroSection />
          <EthPriceWidget /> 
          <main className="p-6 space-y-6 max-w-7xl mx-auto">
            <h2 className="text-3xl font-semibold text-center mb-10">
              Newest homes for sale in <span className="text-blue-600">Saskatoon</span>
            </h2>

            {propertyToken && marketplace && wallet && (
              <RealPropertyGallery
                propertyToken={propertyToken}
                marketplace={marketplace}
                wallet={wallet}
              />
            )}
          </main>
        </>
      )}

      {activePage === "buy" && (
        <main className="p-6 space-y-6 max-w-7xl mx-auto">
          <h2 className="text-2xl font-semibold mb-4">Properties Available to Buy</h2>
          {marketplace && wallet && (
            <ListedProperties
              marketplace={marketplace}
              wallet={wallet}
              propertyToken={propertyToken}
            />
          )}
        </main>
      )}

      {activePage === "gallery" && (
        <main className="p-6 max-w-7xl mx-auto">
          <Gallery
            propertyToken={propertyToken}
            marketplace={marketplace}
            wallet={wallet}
          />
        </main>
      )}

      {activePage === "list" && (
        <main className="p-6 max-w-7xl mx-auto">
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
        </main>
      )}
    </div>
  );
}
