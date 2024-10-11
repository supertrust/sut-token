import { ethers } from "hardhat";

async function main() {

  const contractOwner = await ethers.getSigners();
  console.log(`Deploying contract from: ${contractOwner[0].address}`);

  const SutToken = await ethers.getContractFactory('SuperTrust');

  console.log('Deploying SutToken...');
  const sutToken = await SutToken.deploy();
  await sutToken.waitForDeployment();
  console.log(`Owner of SutToken: ${await sutToken.owner()}`)
  console.log(`SutToken deployed to: ${await sutToken.getAddress()}`)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
