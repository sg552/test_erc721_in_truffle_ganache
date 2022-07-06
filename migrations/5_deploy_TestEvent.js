const TestEvent = artifacts.require('TestEvent.sol');

module.exports = function(deployer) {
  deployer.deploy(TestEvent, "I am from construction...");
}
