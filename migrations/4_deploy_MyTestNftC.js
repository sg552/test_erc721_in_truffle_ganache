const MyTestNftC = artifacts.require('MyTestNftC.sol');

module.exports = function(deployer) {
  deployer.deploy(MyTestNftC);
}
