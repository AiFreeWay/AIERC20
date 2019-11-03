pragma solidity ^0.5.2;


contract AiERC20 {

    address private _owner;
    string private _name;
    string private _symbol;
    uint64 private _totalSupply;
    mapping (address => uint) private _balanceOf;
    mapping (address => mapping (address => uint)) private _allowances;

    event Approval(address indexed _owner, address indexed _spender, uint _value);
    event Transfer(address indexed _from, address indexed _to, uint _value);

    constructor() public {
        _owner = msg.sender;
        _name = "AiERC20";
        _name = "AI";
        _totalSupply = 2100000;
        _balanceOf[msg.sender] = _totalSupply;
    }

    function emmission(uint64 value) public {
        require(msg.sender == _owner);
        _totalSupply += value;
        _balanceOf[_owner] += value;
    }

    function name() public view returns (string memory) {
        return _name;
    }

    function symbol() public view returns (string memory) {
        return _symbol;
    }

    function totalSupply() public view returns (uint) {
        return _totalSupply;
    }

    function balanceOf(address addr) public view returns (uint) {
        return _balanceOf[addr];
    }

    function transfer(address to, uint value) public returns (bool) {
        if (value > 0 &&
            value <= _balanceOf[msg.sender] &&
            !isContract(to)) {

            _balanceOf[msg.sender] -= value;
            _balanceOf[to] += value;
            emit Transfer(msg.sender, to, value);
            return true;
        }
        return false;
    }

    function isContract(address addr) public view returns (bool) {
        uint codeSize;
        assembly {
            codeSize := extcodesize(addr)
        }
        return codeSize > 0;
    }

    function transferFrom(address from, address to, uint value) public returns (bool) {
        if (_allowances[from][msg.sender] > 0 &&
            value > 0 &&
            _allowances[from][msg.sender] >= value &&
            _balanceOf[from] >= value) {

            _balanceOf[from] -= value;
            _balanceOf[to] += value;
            _allowances[from][msg.sender] -= value;
            emit Transfer(from, to, value);
            return true;
        }
        return false;
    }

    function approve(address spender, uint value) public returns (bool) {
        _allowances[msg.sender][spender] = value;
        emit Approval(msg.sender, spender, value);
        return true;
    }

    function allowance(address tokens_owner, address spender) public view returns (uint) {
        return _allowances[tokens_owner][spender];
    }
}
