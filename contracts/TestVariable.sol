// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TestVariable {

  string message;
  uint256 amount;

  event ShowVar(string name, address value);
  event ShowVar(string name, string value);
  event ShowVar(string name, uint value);

  function setMessage(string memory _message) public {
    message = _message;
  }

  function getMessage() public view returns(string memory){
    return message;
  }

  function setAmount(uint256 _amount) public{
    amount = _amount;
  }

  function getAmount() public view returns(uint256) {
    return amount;
  }

  function printVariables() public{
    emit ShowVar("msg.sender", msg.sender);
    emit ShowVar("amount", amount);
    emit ShowVar("message", message);
  }

}
