// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SuperTrust is ERC20, ERC20Pausable, Ownable {
  constructor()
    ERC20("SUPER TRUST", "SUT")
    Ownable(msg.sender)
  {
    _mint(msg.sender, 238403732 * 10 ** decimals());
  }

  function pause() public onlyOwner {
    _pause();
  }

  function unpause() public onlyOwner {
    _unpause();
  }

  // The following functions are overrides required by Solidity.

  function _update(address from, address to, uint256 value)
    internal
    override(ERC20, ERC20Pausable)
  {
    super._update(from, to, value);
  }
}
