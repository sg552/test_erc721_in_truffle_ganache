// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";


contract MyTestNftC is ERC721URIStorage {
    uint256 private _tokensCount = 0;
    address public minter = address(0);

    event LogMint(address to, uint256 tokenId, uint256 tokensCount, address minter, address sender);

    modifier onlyMinter(){
        require(
            minter == msg.sender,
            //'Invalid Minter: msg.sender: |' + msg.sender + "|," + "minter: |" + minter + "|"
            'Invalid Minter: ...'
        );
        _;
    }

    constructor() ERC721("MyTestNftC", "MTNC") {
        minter = msg.sender;
    }

    // function mint(address to) external onlyMinter {
    function mint(address to) external {

        uint256 tokenId = _tokensCount + 1;
        _mint(to, tokenId);
        _tokensCount = tokenId;

        emit LogMint(to, tokenId, _tokensCount, minter, msg.sender);
        require( minter == msg.sender, 'Invalid Minter: ...');
    }

    function burn(uint256 tokenId) external {
        _burn(tokenId);
        _tokensCount -= 1;
    }

    function safeTransferFrom(address from, address to, uint256 tokenId) public virtual override {
        require(minter == msg.sender || to == minter, 'Invalid Transfer');
        safeTransferFrom(from, to, tokenId, "");
    }

    function safeTransferFrom(address from, address to, uint256 tokenId, bytes memory _data) public virtual override {
        require(minter == msg.sender || to == minter, 'Invalid Transfer');
        require(_isApprovedOrOwner(_msgSender(), tokenId), "ERC721: transfer caller is not owner nor approved");
        _safeTransfer(from, to, tokenId, _data);
    }
}
