import { useEffect, useState } from "react";
import { ethers } from "ethers";
import {
  PROPERTY_TOKEN_ADDRESS,
  MARKETPLACE_ADDRESS,
  PropertyTokenABI,
  MarketplaceABI,
} from "./contractConfig";

function App() {
  const [wallet, setWallet] = useState(null);
  const [propertyToken, setPropertyToken] = useState(null);
  const [marketplace, setMarketplace] = useState(null);

  const connectWallet = async () => {
    if (!window.ethereum) return alert("MetaMask not found");
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
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
    <div className="p-6">
      <h1 className="text-2xl font-bold">SmartDeed DApp</h1>
      {wallet && <p>Connected Wallet: {wallet}</p>}
      {propertyToken && <p>PropertyToken contract loaded</p>}
      {marketplace && <p>Marketplace contract loaded</p>}
    </div>
  );
}

export default App;
