//import "truffle/DeployedAddresses.sol";
const DeployedAddresses = require("truffle")["DeployedAddresses"];
const AiERC20 = artifacts.require("AiERC20");

contract("AIERC20", accounts => {
  it("transfer 1000", () => {
    let contract;
    AiERC20.deployed()
      .then(instance => {
        contract = instance;
        return contract.transfer.call(accounts[0], 1000);
      })
      .then(_void => contract.balanceOf.call(accounts[0]))
      .then(balance => {
        assert.equal(balance.valueOf(), 1000, "1000 wasn't in the first account");
      })
  });

  it("transferFrom 1000 without approve", () => {
    let contract2;
    AiERC20.deployed()
      .then(instance => {
        contract = instance;
        return contract.transferFrom.call(accounts[0], accounts[1], 1000);
      })
      .then(_void => contract.balanceOf.call(accounts[1]))
      .then(balance => {
        assert.equal(balance.valueOf(), 0, "0 wasn't in the second account");
      })
  });

  it("approve 1000 and transferFrom 1000", () => {
    let contract;
    AiERC20.deployed()
      .then(instance => {
        contract = instance;
        return contract.approve.call(accounts[1], 1000);
      })
      .then(_void => contract.allowance.call(contract.address, accounts[1]))
      .then(allowance => {
        assert.equal(allowance.valueOf(), 1000, "1000 wasn't approve for the first account");
      })
      .then(instance => {
        contract = instance;
        return contract.transferFrom.call(contract.address, accounts[1], 1000);
      })
      .then(_void => contract.balanceOf.call(accounts[1]))
      .then(balance => {
        assert.equal(balance.valueOf(), 1000, "1000 wasn't in the second account");
      })
  });

  it("emission 100000", () => {
    let contract;
    AiERC20.deployed()
      .then(instance => {
        contract = instance;
        return contract.emmission.call(100000);
      })
      .then(_void => contract.totalSupply.call())
      .then(totalSupply => {
        assert.equal(totalSupply.valueOf(), 2200000, "2200000 wasn't totalSupply");
      })
  });
});
