const ConvertLib = artifacts.require("ConvertLib");
const EmissionErc20 = artifacts.require("EmissionErc20Contract");

module.exports = function(deployer) {
  deployer.deploy(ConvertLib);
  deployer.link(ConvertLib, EmissionErc20);
  deployer.deploy(EmissionErc20);
};
