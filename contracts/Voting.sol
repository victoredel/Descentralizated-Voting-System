// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    struct Poll {
        string question;
        string[] options;
        mapping(uint256 => uint256) votes;
        mapping(address => bool) hasVoted;
        bool exists;
    }

    mapping(uint256 => Poll) public polls;
    uint256 public pollCount;

    function createPoll(string memory _question, string[] memory _options) external {
        require(_options.length > 1, "Se necesitan al menos dos opciones");
        pollCount++;
        polls[pollCount].question = _question;
        polls[pollCount].options = _options;
        polls[pollCount].exists = true;
    }

    function vote(uint256 _pollId, uint256 _option) external {
        require(polls[_pollId].exists, "Encuesta no existe");
        require(!polls[_pollId].hasVoted[msg.sender], "Ya has votado");
        require(_option < polls[_pollId].options.length, "Opción inválida");
        polls[_pollId].votes[_option]++;
        polls[_pollId].hasVoted[msg.sender] = true;
    }

    function getVotes(uint256 _pollId) external view returns (uint256[] memory) {
        require(polls[_pollId].exists, "Encuesta no existe");
        uint256[] memory results = new uint256[](polls[_pollId].options.length);
        for (uint256 i = 0; i < polls[_pollId].options.length; i++) {
            results[i] = polls[_pollId].votes[i];
        }
        return results;
    }
}
