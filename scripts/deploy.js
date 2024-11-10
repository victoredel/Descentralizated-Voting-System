async function main() {
    const [deployer] = await ethers.getSigners();
  
    console.log("Deploying contracts with the account:", deployer.address);
  
    const FaucetToken = await ethers.getContractFactory("FaucetToken");
    const faucetToken = await FaucetToken.deploy();
  
    console.log("FaucetToken deployed to:", faucetToken.address);
  
    const Voting = await ethers.getContractFactory("Voting");
    const voting = await Voting.deploy();
  
    console.log("Voting deployed to:", voting.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  