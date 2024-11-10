// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract FaucetToken is ERC20, Ownable {
    uint256 public tokenAmount = 100 * 10**18; // Cantidad de tokens por solicitud
    uint256 public waitTime = 1 days; // Tiempo de espera entre solicitudes

    mapping(address => uint256) public lastRequestTime;

    constructor() ERC20("FaucetToken", "FTK") {
        _mint(msg.sender, 1000000 * 10**18); // Crear tokens iniciales
    }

    function requestTokens() external {
        require(block.timestamp - lastRequestTime[msg.sender] > waitTime, "Espera antes de solicitar nuevamente");
        lastRequestTime[msg.sender] = block.timestamp;
        _transfer(owner(), msg.sender, tokenAmount);
    }
}
