pragma solidity ^0.5.2;


contract EmissionErc20Contract {

  address private owner;
  string private token_name;
  string private token_symbol;
  uint64 private total_supply;
  mapping (address => uint) private balances;
  mapping (address => mapping (address => uint)) private allowances;

  modifier onlyOwner {
    require(msg.sender == owner, "Need owner permission");
    _;
  }

  event Approval(address indexed owner, address indexed spender, uint value);
  event Transfer(address indexed from, address indexed to, uint value);

  constructor() public {
    owner = msg.sender;
    token_name = "AIERC20";
    token_symbol = "AI";
    total_supply = 2100000;
    balances[owner] = total_supply;
  }

  function emmission(uint64 value) external onlyOwner {
    total_supply += value;
    balances[owner] += value;
  }

  function transfer(address to, uint value) external onlyOwner {
    require(value <= balances[owner], "Not enought tokens");
    balances[owner] -= value;
    balances[to] += value;
    emit Transfer(owner, to, value);
  }

  function transferFrom(address from, address to, uint value) external {
    require(allowances[from][to] >= value, "Not enought tokens");
    balances[from] -= value;
    balances[to] += value;
    allowances[from][to] -= value;
    emit Transfer(from, to, value);
  }

  function approve(address spender, uint value) external {
    require(balances[msg.sender] >= value, "Not enought tokens");
    require(msg.sender != spender, "Sender and spender equal");
    allowances[msg.sender][spender] = value;
    emit Approval(msg.sender, spender, value);
  }

  function name() public view returns (string memory) {
    return token_name;
  }

  function symbol() public view returns (string memory) {
    return token_symbol;
  }

  function totalSupply() public view returns (uint) {
    return total_supply;
  }

  function balanceOf(address addr) public view returns (uint) {
    return balances[addr];
  }

  function allowance(address tokens_owner, address spender) public view returns (uint) {
    return allowances[tokens_owner][spender];
  }
}
