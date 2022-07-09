// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract TestArray {

    event MyLog(int element);

    function loopArray(int[] calldata numbers) external  {
        for(uint i = 0; i < numbers.length; i++ ) {
            emit MyLog(numbers[i]);
        }
    }

}
