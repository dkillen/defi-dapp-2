// SPDX-License-Identifier: MIT
pragma solidity 0.8.0;

import "./DappToken.sol";
import "./DaiToken.sol";

contract TokenFarm {
  // Contract name
  string public name = "Dapp Token Farm";

  // Address of the owner of the contract
  address public owner;

  // Addresses of ERC-20 token contracts
  DappToken public dappToken;
  DaiToken public daiToken;

  // Mapping to keep track of the staking balance of a particular address (investor)
  mapping(address => uint) public stakingBalance;

  // Mapping to keep track of whether a particular address (investor) has staked
  mapping(address => bool) public hasStaked;

  // Mapping to keep track of an address (investor) is currently staked
  mapping(address => bool) public isStaking;

  // Array of all addresses that have ever staked
  address[] public stakers;

  //Contract constructor
  constructor(DappToken _dappToken, DaiToken _daiToken) {
    dappToken = _dappToken;
    daiToken = _daiToken;
    owner = msg.sender;
  }

  // Stake tokens (deposit)
  function stakeTokens(uint _amount) public {
    // Require an amount greater than zero
    require(_amount > 0, "Amount cannot be zero");

    // Allows the Mock DAI tokens to be transferred to this contract for staking on behalf of the investor
    // transferFrom is a delegated transfer that allows someone to transfer tokens on behalf of another
    // From: msg.sender - the investor
    // To: address(this) - the address of this contract
    daiToken.transferFrom(msg.sender, address(this), _amount);

    // Update staking balance
    stakingBalance[msg.sender] = stakingBalance[msg.sender] + _amount;

    // Add investor to stakers array *only* if they haven't staked already
    if(!hasStaked[msg.sender]) {
      stakers.push(msg.sender);
    }

    // Update staking status
    hasStaked[msg.sender] = true;
    isStaking[msg.sender] = true;
  }

  // Unstake tokens (withdraw)
  function unstakeTokens() public {
    // Fetch staking balance
    uint balance = stakingBalance[msg.sender];

    // Require an amount greater than zero
    require(balance > 0, "Staking balance must be greater than zero");

    // Transfer mDai tokens back to the investor
    daiToken.transfer(msg.sender, balance);

    // Reset staking balance and update staking statuses
    stakingBalance[msg.sender] = 0;
    isStaking[msg.sender] = false;
  }

  // Issue tokens (interest)
  // Can only be called by the owner of the contract
  function issueTokens() public {
    // Require that the owner is the caller of the function
    require(msg.sender == owner, "Caller must be the owner");

    // Loop through all addresses in the stakers array and
    // issue their tokens if they have a balance greater than zero
    for (uint i = 0; i < stakers.length; i++) {
      address recipient = stakers[i];
      uint balance = stakingBalance[recipient];
      if (balance > 0) {
        dappToken.transfer(recipient, balance);
      }
    }
  }

}
