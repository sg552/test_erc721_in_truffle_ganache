pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

import "@openzeppelin/contracts/utils/Strings.sol";

contract VeryGoodNftWithMoreClearMessage is ERC721URIStorage {

  uint256 private _currentId = 0;
  address public rootAddress = address(0);
  uint256 public _maxSupply = 3;

  event Minted(address to, uint256 nftId, address minter);

  modifier shouldLessThanMaxSupply(){

    string memory message = string(abi.encodePacked("Reached max supply:(_maxSupply: ", Strings.toString(_maxSupply), ", _currentId: ", Strings.toString(_currentId), "), no available nft left" ));
    require( _currentId < _maxSupply, message);
    _;
  }

  constructor() ERC721("AnotherNameAlsoVeryGood", "ANG") {
    rootAddress = msg.sender;
  }

  function mint(address to) external shouldLessThanMaxSupply{
    uint256 nftId = _currentId + 1;
    _mint(to, nftId);
    _currentId = nftId;
    address from = msg.sender;
    emit Minted(to, nftId, from);
  }
}
