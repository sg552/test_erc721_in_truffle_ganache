const Web3 = require('web3')

const fs = require('fs')


async function main(file_name_without_suffix, contract_address){
  const { abi } = JSON.parse(fs.readFileSync("build/contracts/" +file_name_without_suffix+'.json'))

  // step1. 初始化web3 实例，增加json rpc server
  const web3 = new Web3(
    new Web3.providers.HttpProvider( 'HTTP://192.168.10.54:3355')
  )

  let private_key = "5da76275302d9b9fb14240871db41bfbd9ff08362150c0a8b24f0fd69e2316f2"

  // step2. 创建signer
  const signer = web3.eth.accounts.privateKeyToAccount(private_key)
  web3.eth.accounts.wallet.add(signer)

  // step3. 创建contract, abi是关键
  const contract = new web3.eth.Contract(abi, contract_address)

  let result = ''
  result = await contract.methods.minter().call()
  console.info("minter: ", result)
  result = await contract.methods.name().call()
  console.info("name: ", result)
  result = await contract.methods.symbol().call()
  console.info("symbol: ", result)

  console.info("--- signer:", signer)

  let target_address = '0xDEC781c67a86570c004c7840BE1AddAF51C39487'

  let tx = ''
  //tx = await contract.methods.mint('0xc0dD5021e298dB57bEF361C735cd1C04cef2E48A')
  tx = await contract.methods.mint(target_address)
  let from = signer.address
  // let from = (await web3.eth.getAccounts())[0]
  console.info("== now let's mine one: ,from: ", from)
  result = await tx
    .send({from: from, gas: await tx.estimateGas()})
    .once("transactionHash" , (txHash) => {
      console.info("mining transaction...", txHash)
    })
    .on('error', (error) => {
      console.info("--- on error: ", error)
    })
  console.info("mint result: ", result)

  result = await contract.methods.balanceOf(target_address).call()
  console.info(`balance of ${target_address}: `, result)

  result = await contract.methods.ownerOf(1).call()
  console.info("ownerOf n: ", result)

  tx = await contract.methods.burn(1)
  result = await tx
    .send({from: from, gas: await tx.estimateGas()})
    .once("transactionHash", (txHash) => {
      console.info("burning id: ", 1)
    })
  console.info(" burn result: ", result)

  //result = await contract.methods.

}

//require('dotenv').config()

console.info("== 使用方式: $ node call.js TestContract 0xa1b2..z9   (该TestContract.json 和 <contract address> 必须存在)")
main(process.argv[2], process.argv[3]).then( () => process.exit(0) )
