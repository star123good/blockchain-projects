// SPDX-License-Identifier: MIT

pragma solidity ^ 0.7.6;

import "./APR.sol";

/**
 *  Smart Contract to sell APR token
 */
contract APRSale is Ownable {
    using SafeMath for uint256;

    APR private _token;
    uint256 private _price;

    event Bought(uint256 amount);
    event Sold(uint256 amount);

    /**
     *  constructor
     *  param {address} token_
     */
    constructor (address token_) {
        _token = APR(token_);
        setPrice(1);
    }

    /**
     * get price
     */
    function price() public view virtual returns (uint256) {
        return _price;
    }

    /**
     * set price
     */
    function setPrice(uint256 price_) public virtual onlyOwner {
        _price = price_;
    }
}