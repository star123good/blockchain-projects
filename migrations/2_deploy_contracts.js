const APRSale = artifacts.require("./contracts/APRSale.sol");

module.exports = function (deployer) {
    deployer.deploy(APRSale);
}