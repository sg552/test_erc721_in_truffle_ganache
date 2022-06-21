const MyTestNftB = artifacts.require('MyTestNftB.sol');

module.exports = function(deployer) {
  deployer.deploy(MyTestNftB);
}
