const MyTestNft = artifacts.require('MyTestNft.sol');

module.exports = function(deployer) {
  deployer.deploy(MyTestNft);
}
