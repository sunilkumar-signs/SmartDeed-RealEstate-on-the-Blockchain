require("dotenv").config();
const { ethers } = require("ethers");
const axios = require("axios");
const OracleABI = require("./artifacts/contracts/OracleHandler.sol/OracleHandler.json").abi;

const {
  PRIVATE_KEY,
  ORACLE_ADDRESS,
  CMC_API_KEY,
  RPC_URL
} = process.env;

const provider = new ethers.JsonRpcProvider(RPC_URL);
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
const contract = new ethers.Contract(ORACLE_ADDRESS, OracleABI, wallet);

async function updateOraclePrice() {
  try {
    const { data } = await axios.get(
      "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=ETH",
      {
        headers: { "X-CMC_PRO_API_KEY": CMC_API_KEY }
      }
    );

    const price = data.data.ETH.quote.USD.price;
    const formatted = ethers.parseUnits(price.toFixed(2), 8); // match 8 decimals

    const tx = await contract.updatePrice(formatted);
    await tx.wait();

    console.log(` Updated Oracle to $${price}`);
  } catch (err) {
    console.error(" Error updating oracle:", err.message);
  }
}

updateOraclePrice();
