const ConvertLib = artifacts.require("ConvertLib");
const AiERC20 = artifacts.require("AiERC20");

module.exports = function(deployer) {
  deployer.deploy(ConvertLib);
  deployer.link(ConvertLib, AiERC20);
  deployer.deploy(AiERC20);
};
