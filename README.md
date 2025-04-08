SmartDeed Project

SmartDeed is a decentralized real estate platform that allows users to tokenize, list, and buy property assets on the blockchain. It features both on-chain contract management and off-chain oracle integration for real-time ETH/USD pricing.

Project Structure:
SmartDeed/
├── backend/      ← Smart contracts (Solidity), Hardhat, custom oracle integration
│   ├── contracts/
│   ├── scripts/
│   ├── updateOracle.js
│   ├── .env.example
├── frontend/     ← React UI to interact with contracts (mint, list, buy, view)
│   ├── src/
│   └── public/
└── README.md

Tech Stack:
Frontend: React, ethers.js, Tailwind CSS
Backend: Solidity, Hardhat, OpenZeppelin
Oracle: CoinMarketCap API + ethers.js
Wallet: MetaMask

Prerequisites:
- Node.js (v14 or higher)
- npm
- Hardhat
- MetaMask (browser extension)

Setup Instructions:

Backend (Hardhat)
1. Navigate to the backend folder:
   cd backend

2. Install dependencies:
   npm install

3. Compile and deploy contracts to Hardhat local:
   npx hardhat compile
   npx hardhat node

4. In a separate terminal, deploy contracts:
   npx hardhat run scripts/deploy.js --network localhost

Frontend (React)
1. Navigate to the frontend folder:
   cd frontend

2. Install dependencies:
   npm install

3. Start the development server:
   npm start

4. Open http://localhost:3000 in your browser.

Custom Oracle Integration (ETH/USD)

SmartDeed uses a custom off-chain oracle that fetches real-time ETH/USD price from CoinMarketCap and updates an on-chain contract (OracleHandler).

.env Configuration (in /backend)
Create a .env file with the following content:

PRIVATE_KEY=0xYourHardhatPrivateKey
ORACLE_ADDRESS=0xYourDeployedOracleAddress
CMC_API_KEY=your_coinmarketcap_api_key
RPC_URL=http://localhost:8545

Note: .env is ignored by Git. Do not commit it.

Update Oracle Price Manually:
cd backend
node updateOracle.js

License:
This project is licensed under the MIT License.

Contributions:
PRs are welcome! Please create a new branch and submit your changes via pull request.

Contact:
GitHub Issues: https://github.com/sunilkumar-signs/SmartDeed-RealEstate-on-the-Blockchain/issues
