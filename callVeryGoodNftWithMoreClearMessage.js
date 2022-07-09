// contract 地址要有
const CONTRACT_ADDRESS = "0x29368645453fd9c4f05AfE48D2B8CCD1F1268570"
// abi 要有
const contractJson = require('./build/contracts/VeryGoodNftWithMoreClearMessage.json')

module.exports = async function (callback) {
  // web3 是Truffle的自动引入的对象
  const contract = new web3.eth.Contract( contractJson.abi, CONTRACT_ADDRESS );

  // 获得 network , 这个是根据参数传入的
  const network = await web3.eth.net.getNetworkType()

  // const tx = contract.methods.setMessage("today is 2022-07-06, hot day!")
  // const tx = contract.methods.setAmount(321)
  //
  let temp
  temp = await contract.methods.name().call()
  console.info("=== name: ", temp)
  temp = await contract.methods.symbol().call()
  console.info("=== symbol: ", temp)

  //
  const tx = contract.methods.mint('0xc0dD5021e298dB57bEF361C735cd1C04cef2E48A')

  // 发送！
  console.info("== before estimateGas: ")
  let gas
  await tx.estimateGas()
  .then(function(temp_gas){
    console.log("-- successfully get gas: ", temp_gas)
    gas = temp_gas
  }).catch(function(e){
    throw("got error, stop")
    console.log(e)
    callback()
  })
  console.info("== after estimateGas: ", gas)

  const receipt = await tx
  .send({
    from: (await web3.eth.getAccounts())[0],// 使用了HD wallet中的第一个account
    gas: gas,
  })
  /*
  .on('transactionHash', (txhash) => {
  })
  .on('error', function(error){
  })
  .then(function(receipt){
  })
  */

  .once('sending', (payload) => {
    console.info("-- in sending..., payload: ", payload)
  })
  .once('sent', (payload) => {
    console.info("-- in sent..., payload: ", payload)
  })
  .once("transactionHash" , (txHash) => {
    console.log(`Mining transaction ... network: ${network}, tx: ${txHash}`)
    // console.log(`https://${network}.etherscan.io/tx/${txhash}`)
  })
  .once('receipt', (receipt) => {
    console.info("-- in receipt...", receipt)
    console.log('====== total: ')
    console.log(receipt)
    console.log('====== events.Minted: ', receipt.events.Minted)
    // Success, you've minted the NFT. The transaction is now on chain!
    console.log(
        `Success: The NFT has been minted and mined in block ${receipt.blockNumber}`)
    callback()
  })
  .on('confirmation', (confNumber, receipt, lastBlockHash) => {
    console.info("-- in confirm...", receipt)
  })
  .on('error', (error) => {
    console.error(`An error happened: ${error}`)
    callback()
  })

}
