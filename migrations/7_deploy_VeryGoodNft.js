const VeryGoodNft = artifacts.require('VeryGoodNft.sol')
module.exports = function(deployer){
  deployer.deploy(VeryGoodNft);
}
