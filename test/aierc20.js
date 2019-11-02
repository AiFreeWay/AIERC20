const AIERC20 = artifacts.require("aierc20");

contract("AIERC20", accounts => {
  it("transfer 1000", () =>
    let contract;
    MetaCoin.deployed()
      .then(instance => {
        contract = instance;
        return instance.transfer.call(accounts[0], 1000);
      })
      .then(_void => instance.balanceOf.call(accounts[0]))
      .then(balance => {
        assert.equal(balance.valueOf(), 1000, "1000 wasn't in the first account");
      }));


  it("transferFrom 1000 without approve", () =>
    let contract;
    MetaCoin.deployed()
      .then(instance => {
        contract = instance;
        return instance.transferFrom.call(accounts[0], accounts[1], 1000);
      })
      .then(_void => instance.balanceOf.call(accounts[1]))
      .then(balance => {
        assert.equal(balance.valueOf(), 0, "0 wasn't in the second account");
      }));

    it("approve 1000", () =>
      let contract;
      MetaCoin.deployed()
        .then(instance => {
          contract = instance;
          return instance.approve.call(accounts[1], 1000);
        })
        .then(_void => instance.allowance.call(accounts[0], accounts[1]))
        .then(allowance => {
          assert.equal(allowance.valueOf(), 1000, "1000 wasn't approve for the first account");
        }));

      it("transferFrom 1000", () =>
        let contract;
        MetaCoin.deployed()
          .then(instance => {
            contract = instance;
            return instance.transferFrom.call(accounts[0], accounts[1], 1000);
          })
          .then(_void => instance.balanceOf.call(accounts[1]))
          .then(balance => {
            assert.equal(balance.valueOf(), 1000, "1000 wasn't in the second account");
          }));

        it("emission 100000", () =>
          let contract;
          MetaCoin.deployed()
            .then(instance => {
              contract = instance;
              return instance.emmission.call(100000);
            })
            .then(_void => instance.totalSupply.call())
            .then(totalSupply => {
              assert.equal(totalSupply.valueOf(), 2200000, "2200000 wasn't totalSupply");
            }));
});
