// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract VeryGoodNft is ERC721URIStorage {
  uint256 private _currentId = 0;
  address public rootAddress = address(0);

  event Minted(address to, uint256 nftId, address minter);

  constructor() ERC721("VeryGoodNft", "http://baidu.com/1.jpg") {
    rootAddress = msg.sender;
  }

  function mint(address to) external{
    uint256 nftId = _currentId + 1;
    _mint(to, nftId);
    _currentId = nftId;
    address from = msg.sender;
    emit Minted(to, nftId, from);
  }
}
