// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

import "@openzeppelin/contracts/utils/Strings.sol";

contract CompleteNftExample is ERC721URIStorage {

  constructor() ERC721("CompleteNftExample", "SSS") {
    rootAddress = msg.sender;
  }

  // 已经发放的最新的NFT ID
  uint256 private _currentId = 0;
  // root用户的address
  address public rootAddress = address(0);
  // NFT的最大供应量
  uint256 public _maxSupply = 100;
  // 可以领取nft的地址白名单
  mapping(address => uint) private whiteList;

  event MintedEventLog(address to, uint256 nftId, address minter);
  event AddToWhiteListEventLog(address the_address);
  event RemoveFromWhiteListEventLog(address the_address);

  // 必须是root 用户
  modifier shouldBeRoot(){
    string memory message = string.concat("The caller address(", toAsciiString(msg.sender), ") is not the contract root.");
    require( rootAddress == msg.sender, message);
    _;
  }

  // 必须在地址白名单中
  modifier shouldInWhiteList(address to){
    string memory message = string.concat("This address( ", toAsciiString(to), " ) is not in white list");
    require( whiteList[to] > 0,  message);
    _;
  }

  // 该NFT必须是可以领取的状态
  modifier shouldLessThanMaxSupply(){
    string memory message = string.concat("Reached max supply:(_maxSupply: ", Strings.toString(_maxSupply), ", _currentId: ", Strings.toString(_currentId), "), no available nft left");
    require( _currentId < _maxSupply, message);
    _;
  }


  /**
   * 挖nft, 参数：to 获得nft的地址
   */
  function mint(address to) external shouldLessThanMaxSupply shouldInWhiteList(to) {
    uint256 nftId = _currentId + 1;
    _mint(to, nftId);
    _currentId = nftId;
    address from = msg.sender;
    emit MintedEventLog(to, nftId, from);
  }

  /**
   * 确定一个地址是否在whiteList中。
   * 0 ：不存在
   * 3 : 可以领取3次
   */
  function isInWhiteList(address theAddress) public view returns(uint){
    return whiteList[theAddress];
  }


  /**
   * 把多个地址放到whiteList 中
   */
  function addToWhiteList(address[] calldata addresses) external shouldBeRoot {
    for(uint i = 0; i < addresses.length; i++ ) {
      whiteList[addresses[i]] = whiteList[addresses[i]] + 1;
      emit AddToWhiteListEventLog(addresses[i]);
    }
  }

  /**
   * 把1个地址放到whiteList 中
   */
  function addToWhiteList(address tempAddress) external{
    whiteList[tempAddress] = whiteList[tempAddress] + 1;
    emit AddToWhiteListEventLog(tempAddress);
  }

  /**
   * 把1个address 的“对应记录”从 whitelist中删掉
   */
  function removeFromWhiteList(address tempAddress) external {
    if(whiteList[tempAddress] > 0 ){
      whiteList[tempAddress] = whiteList[tempAddress] - 1;
    }
  }

  function toAsciiString(address x) internal pure returns (string memory) {
    bytes memory s = new bytes(40);
    for (uint i = 0; i < 20; i++) {
      bytes1 b = bytes1(uint8(uint(uint160(x)) / (2**(8*(19 - i)))));
      bytes1 hi = bytes1(uint8(b) / 16);
      bytes1 lo = bytes1(uint8(b) - 16 * uint8(hi));
      s[2*i] = char(hi);
      s[2*i+1] = char(lo);
    }
    return string(s);
  }

  function char(bytes1 b) internal pure returns (bytes1 c) {
    if (uint8(b) < 10) return bytes1(uint8(b) + 0x30);
    else return bytes1(uint8(b) + 0x57);
  }
}
