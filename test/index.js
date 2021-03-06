const DeployedAddresses = require("truffle")["DeployedAddresses"];
const EmissionErc20 = artifacts.require("EmissionErc20Contract");

contract("EmissionContract", async accounts => {
  // TRANSFER

  it("Transfer failure - invalid value", async () => {
    let contract = await EmissionErc20.deployed();
    let error;
    await contract.transfer(accounts[1], 1000000000)
      .catch(err => { error = err });
    assert.ok(error.toString().indexOf("Not enought tokens") > 0);
  });

  it("Transfer failure - invalid account owner", async () => {
    let contract = await EmissionErc20.deployed();
    let error;
    await contract.transfer(accounts[1], 100000, { from: accounts[1] })
      .catch(err => { error = err });
    assert.ok(error.toString().indexOf("Need owner permission") > 0);
  });

  it("Transfer success", async () => {
    let contract = await EmissionErc20.deployed();
    await contract.transfer(accounts[1], 100000)
      .then(() => contract.balanceOf.call(accounts[1]))
      .then(res => {
        assert.equal(res, 100000);
        return contract.balanceOf.call(accounts[0]);
      })
      .then(res => assert.equal(res, 2000000))
  });

  //APPROVE

  it("Approve failure - invalid value", async () => {
    let contract = await EmissionErc20.deployed();
    let error;
    await contract.approve(accounts[1], 1000000000, { from: accounts[1] })
      .catch(err => { error = err });
    assert.ok(error.toString().indexOf("Not enought tokens") > 0);
  });

  it("Approve failure - invalid account", async () => {
    let contract = await EmissionErc20.deployed();
    let error;
    await contract.approve(accounts[4], 1, { from: accounts[3] })
      .catch(err => { error = err });
    assert.ok(error.toString().indexOf("Not enought tokens") > 0);
  });

  it("Approve failure - invalid spender", async () => {
    let contract = await EmissionErc20.deployed();
    let error;
    await contract.approve(accounts[1], 1000, { from: accounts[1] })
      .catch(err => { error = err });
    assert.ok(error.toString().indexOf("Sender and spender equal") > 0);
  });

  it("Approve success", async () => {
    let contract = await EmissionErc20.deployed();
    await contract.approve(accounts[2], 1000, { from: accounts[1] })
      .then(() => contract.allowance.call(accounts[1], accounts[2]))
      .then(res => assert.equal(res, 1000))
  });

  //TRANSFER FROM

  it("TransferFrom failure - invalid value", async () => {
    let contract = await EmissionErc20.deployed();
    let error;
    await contract.transferFrom(accounts[1], accounts[2], 1000000000, { from: accounts[4] })
      .catch(err => { error = err });
    assert.ok(error.toString().indexOf("Not enought tokens") > 0);
  });

  it("TransferFrom failure - invalid account from", async () => {
    let contract = await EmissionErc20.deployed();
    let error;
    await contract.transferFrom(accounts[0], accounts[1], 1000, { from: accounts[4] })
      .catch(err => { error = err });
    assert.ok(error.toString().indexOf("Not enought tokens") > 0);
  });

  it("TransferFrom failure - invalid account to", async () => {
    let contract = await EmissionErc20.deployed();
    let error;
    await contract.transferFrom(accounts[1], accounts[3], 1000, { from: accounts[4] })
      .catch(err => { error = err });
    assert.ok(error.toString().indexOf("Not enought tokens") > 0);
  });

  it("TransferFrom success", async () => {
    let contract = await EmissionErc20.deployed();
    await contract.transferFrom(accounts[1], accounts[2], 500, { from: accounts[4] })
      .then(() => contract.allowance.call(accounts[1], accounts[2]))
      .then(res => {
        assert.equal(res, 500);
        return contract.balanceOf.call(accounts[1]);
      })
      .then(res => {
        assert.equal(res, 99500);
        return contract.balanceOf.call(accounts[2]);
      })
      .then(res => assert.equal(res, 500))
  });

  //EMISSION

  it("Emmission failure - invalid account", async () => {
    let contract = await EmissionErc20.deployed();
    let error;
    await contract.emmission(1000, { from: accounts[1]})
      .catch(err => { error = err });
    assert.ok(error.toString().indexOf("Need owner permission") > 0);
  });

  it("Emmission success", async () => {
    let contract = await EmissionErc20.deployed();
    await contract.emmission(100000)
    .then(() => contract.balanceOf.call(accounts[0]))
    .then(res => assert.equal(res, 2100000))
  });

  //SEIZURE

  it("Seizure failure - invalid account", async () => {
    let contract = await EmissionErc20.deployed();
    let error;
    await contract.seizure(1000, { from: accounts[1]})
      .catch(err => { error = err });
    assert.ok(error.toString().indexOf("Need owner permission") > 0);
  });

  it("Seizure failure - Too many tokens", async () => {
    let contract = await EmissionErc20.deployed();
    let error;
    await contract.seizure(2200000, { from: accounts[0]})
      .catch(err => { error = err });
    assert.ok(error.toString().indexOf("Too many tokens") > 0);  
  });

  it("Seizure success", async () => {
    let contract = await EmissionErc20.deployed();
    await contract.seizure(100000)
    .then(() => contract.balanceOf.call(accounts[0]))
    .then(res => assert.equal(res, 2000000))
  });
});
