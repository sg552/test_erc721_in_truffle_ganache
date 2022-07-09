// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;


contract TestMapping {

    // 这里设置成 public 即可访问
    mapping(address => uint) public whiteList;


    function addToWhiteList(address tempAddress) external{
        whiteList[tempAddress] = whiteList[tempAddress] + 1;
    }

    /*
        这样写不行，我们无法直接return mapping

    function getWhiteList() public view returns (mapping) {
        return whiteList;
    }
    */
}
