const VeryGoodNftWithMaxSupply = artifacts.require('VeryGoodNftWithMaxSupply.sol')

module.exports = function(deployer){
  deployer.deploy(VeryGoodNftWithMaxSupply)
}
