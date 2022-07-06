// contract 地址要有
const CONTRACT_ADDRESS = "0x6FCa9C7EDF4898cF8F0D48E60E1CcB51660505e6"
// abi 要有
const contractJson = require('./build/contracts/TestEvent.json')

module.exports = async function (callback) {
  // web3 是Truffle的自动引入的对象
  const contract = new web3.eth.Contract( contractJson.abi, CONTRACT_ADDRESS );

  // 获得 network , 这个是根据参数传入的
  const network = await web3.eth.net.getNetworkType()

  // TODO 这里最最关键。
  // 生成一个tx, 该tx是调用了 mintNFT产生的
  //const tx = contract.methods.mint()
  const tx = contract.methods.sayHi(99)

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
    console.log('====== events.HiEvent: ', receipt.events.HiEvent)
    console.log('====== events.HiEvent.returnValues: ', receipt.events.HiEvent.returnValues)
    console.log('====== events.HiEvent.returnValues.message: ', receipt.events.HiEvent.returnValues.message)
    console.log('====== events.HiEvent.returnValues.amount: ', receipt.events.HiEvent.returnValues.amount)
    // Success, you've minted the NFT. The transaction is now on chain!
    console.log(
        `Success: The NFT has been minted and mined in block ${receipt.blockNumber}`)
    callback()
  })
}
