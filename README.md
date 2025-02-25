# SmartDeed Project

**SmartDeed** is a decentralized application (DApp) built to manage tokenized assets on the blockchain. It consists of two parts:

- **Frontend**: A React-based user interface that allows interaction with the smart contracts deployed on the blockchain.
- **Backend**: The smart contracts developed using **Solidity** and deployed with **Hardhat**.

## Tech Stack

- **Frontend**: React, Web3.js or ethers.js, CSS/SCSS
- **Backend**: Solidity, Hardhat, OpenZeppelin

## Prerequisites

Before you start, ensure you have the following tools installed on your machine:

- **Node.js** (v14 or higher)
- **npm** (Node Package Manager)
- **Hardhat** (used for blockchain development)
- A **Metamask** or other Web3 wallet to interact with the blockchain

## Setup Instructions

### Backend

1. First, navigate to the `backend` directory:
    ```bash
    cd backend
    ```

2. Install the required dependencies:
    ```bash
    npm install
    ```

3. To compile and deploy the smart contracts, use the following commands:
    ```bash
    npx hardhat compile
    npx hardhat run scripts/deploy.js --network <your-network>
    ```

### Frontend

1. Now, move to the `frontend` directory:
    ```bash
    cd frontend
    ```

2. Install the necessary dependencies:
    ```bash
    npm install
    ```

3. To start the frontend development server, run:
    ```bash
    npm start
    ```

4. Open your browser and go to `http://localhost:3000` to interact with the application.

## License

This project is licensed under the MIT License.
