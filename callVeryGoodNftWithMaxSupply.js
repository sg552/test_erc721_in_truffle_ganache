// contract 地址要有
const CONTRACT_ADDRESS = "0x7545eCD147210f38EF88142cd94f5Dd0C98E418D"
// abi 要有
const contractJson = require('./build/contracts/VeryGoodNftWithMaxSupply.json')

module.exports = async function (callback) {
  // web3 是Truffle的自动引入的对象
  const contract = new web3.eth.Contract( contractJson.abi, CONTRACT_ADDRESS );

  // 获得 network , 这个是根据参数传入的
  const network = await web3.eth.net.getNetworkType()

  // const tx = contract.methods.setMessage("today is 2022-07-06, hot day!")
  // const tx = contract.methods.setAmount(321)
  const tx = contract.methods.mint('0xc0dD5021e298dB57bEF361C735cd1C04cef2E48A')

  // 发送！
  const receipt = await tx
  .send({
    from: (await web3.eth.getAccounts())[0],// 使用了HD wallet中的第一个account
    gas: await tx.estimateGas(),
  })
  .on('transactionHash', (txhash) => {
    console.log(`Mining transaction ... network: ${network}, tx: ${txhash}`)
    // console.log(`https://${network}.etherscan.io/tx/${txhash}`)
  })
  .on('error', function(error){
    console.error(`An error happened: ${error}`)
    callback()
  })
  .then(function(receipt){
    console.log('====== total: ')
    console.log(receipt)
    console.log('====== events.Minted: ', receipt.events.Minted)
    // Success, you've minted the NFT. The transaction is now on chain!
    console.log(
        `Success: The NFT has been minted and mined in block ${receipt.blockNumber}`)
    callback()
  })

}
