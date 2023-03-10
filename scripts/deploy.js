const { ethers } = require("hardhat");

async function main() {
  const QUOKKAOfficial = await ethers.getContractFactory("QUOKKAOfficial");
  console.log("Deploying QUOKKAOfficial...");
  const contract = await QUOKKAOfficial.deploy(
    "QUOKKAOfficial",
    "QUOKKA",
    18,
    "1000000000000000000000000000",
    2,
    3,
    "1000000000000000000",
    "100000000000000000",
    "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D", // Router address on Ethereum Mainnet
    "0xcA388Cb6f0C596191ecD73D7ee5B72840D9137d7"
  );
  await contract.deployed();
  console.log("QUOKKAOfficial deployed to:", contract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });