// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract LeilaoAsCegas {
    struct Lance {
        bytes32 valorCego;
        uint valor;
        bool revelado;
    }

    address public beneficiario;
    uint public fimPeriodoLances;
    uint public fimPeriodoRevelacao;
    IERC20 public token;

    mapping(address => Lance) public lances;
    address public maiorLicitante;
    uint public maiorLance;
    bool public leilaoFinalizado;

    constructor(uint _duracaoLances, uint _duracaoRevelacao, address _tokenAddress) {
        beneficiario = msg.sender;
        fimPeriodoLances = block.timestamp + _duracaoLances;
        fimPeriodoRevelacao = fimPeriodoLances + _duracaoRevelacao;
        token = IERC20(_tokenAddress);
    }

    function enviarLance(bytes32 _valorCego) external {
        require(block.timestamp < fimPeriodoLances, "Periodo de lances terminou");
        require(lances[msg.sender].valorCego == 0, "Lance ja enviado");

        lances[msg.sender] = Lance({
            valorCego: _valorCego,
            valor: 0,  // Valor real não é armazenado até a revelação
            revelado: false
        });
    }

    function revelarLance(uint _valor, string memory _segredo) external {
        require(block.timestamp >= fimPeriodoLances && block.timestamp < fimPeriodoRevelacao, "Periodo de revelacao nao ativo");
        Lance storage lance = lances[msg.sender];
        require(lance.valorCego == keccak256(abi.encodePacked(_valor, _segredo)), "Lance invalido");
        require(!lance.revelado, "Lance ja revelado");
        
        lance.valor = _valor;
        lance.revelado = true;

        // Transferência de tokens equivalente ao valor revelado
        require(token.transferFrom(msg.sender, address(this), _valor), "Transferencia de tokens falhou");

        if (_valor > maiorLance) {
            if (maiorLicitante != address(0)) {
                // Devolver tokens ao licitante anterior
                require(token.transfer(maiorLicitante, maiorLance), "Devolucao de tokens falhou");
            }
            maiorLicitante = msg.sender;
            maiorLance = _valor;
        } else {
            // Devolver tokens ao licitante que não ganhou
            require(token.transfer(msg.sender, _valor), "Devolucao de tokens falhou");
        }
    }

    function finalizarLeilao() external {
        require(block.timestamp >= fimPeriodoRevelacao, "Periodo de revelacao nao terminou");
        require(!leilaoFinalizado, "Leilao ja finalizado");

        leilaoFinalizado = true;

        // Transferir os tokens para o beneficiario
        require(token.transfer(beneficiario, maiorLance), "Transferencia para beneficiario falhou");
    }

    function mostrarGanhador() external view returns (address, uint) {
        require(leilaoFinalizado, "Leilao ainda nao finalizado");
        return (maiorLicitante, maiorLance);
    }

}
