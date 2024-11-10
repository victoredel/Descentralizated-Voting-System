const FaucetToken = artifacts.require("FaucetToken");
const Voting = artifacts.require("Voting");

module.exports = function (deployer) {
  deployer.deploy(FaucetToken).then(() => {
    return deployer.deploy(Voting);
  });
};
