// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TestEvent {

  string message;
  uint256 amount;

  event HiEvent(string message, uint256 amount);

  constructor(string memory _message) {
    message = _message;
  }

  function sayHi(uint256 _amount) public {
    amount = _amount;
    emit HiEvent(message, amount);
  }

}
