const TestVariable = artifacts.require('TestVariable.sol');

module.exports = function(deployer) {
  deployer.deploy(TestVariable);
}
