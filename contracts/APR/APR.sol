// SPDX-License-Identifier: MIT

pragma solidity ^ 0.7.6;

import "./ERC20.sol";

/**
 *  APR token based on ERC20
 */
contract APR is ERC20 {
    using SafeMath for uint256;

    /**
     *  call super constructor
     *  with _name, _symbol
     */
    constructor () ERC20("April", "APR") {
        _decimals = 6;
    }
}