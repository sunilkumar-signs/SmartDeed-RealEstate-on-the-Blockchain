const [deployer] = await ethers.getSigners();
console.log("Using deployer address:", deployer.address);

// Deploy PropertyToken
const PropertyToken = await ethers.getContractFactory("PropertyToken");
const propertyToken = await PropertyToken.deploy();
await propertyToken.waitForDeployment();
console.log("PropertyToken deployed at:", await propertyToken.getAddress());

// Deploy Marketplace
const Marketplace = await ethers.getContractFactory("Marketplace");
const marketplace = await Marketplace.deploy(await propertyToken.getAddress());
await marketplace.waitForDeployment();
console.log("Marketplace deployed at:", await marketplace.getAddress());

// Deploy OracleHandler
const OracleHandler = await ethers.getContractFactory("OracleHandler");
const oracle = await OracleHandler.deploy();
await oracle.waitForDeployment();
console.log("OracleHandler deployed at:", await oracle.getAddress());
