import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import { FarcasterFramework } from 'farcaster-framework';
import FaucetToken from './contracts/FaucetToken.json';
import Voting from './contracts/Voting.json';
import Faucet from './components/Faucet';
import PollList from './components/PollList';
import PollForm from './components/PollForm';

const App = () => {
    const [account, setAccount] = useState('');
    const [polls, setPolls] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadWeb3();
        loadBlockchainData();
    }, []);

    const loadWeb3 = async () => {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            await window.ethereum.enable();
        } else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider);
        } else {
            console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
        }
    };

    const loadBlockchainData = async () => {
        const web3 = window.web3;
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);

        const networkId = await web3.eth.net.getId();

        const tokenContract = new web3.eth.Contract(FaucetToken.abi, FaucetToken.networks[networkId].address);
        const votingContract = new web3.eth.Contract(Voting.abi, Voting.networks[networkId].address);

        // Cargar encuestas existentes
        const pollCount = await votingContract.methods.pollCount().call();
        const loadedPolls = [];
        for (let i = 1; i <= pollCount; i++) {
            const poll = await votingContract.methods.polls(i).call();
            loadedPolls.push({
                id: i,
                question: poll.question,
                options: poll.options,
            });
        }
        setPolls(loadedPolls);
        setLoading(false);
    };

    const createPoll = async (question, options) => {
        const web3 = window.web3;
        const votingContract = new web3.eth.Contract(Voting.abi, Voting.networks[networkId].address);
        await votingContract.methods.createPoll(question, options).send({ from: account });
    };

    const vote = async (pollId, option) => {
        const web3 = window.web3;
        const votingContract = new web3.eth.Contract(Voting.abi, Voting.networks[networkId].address);
        await votingContract.methods.vote(pollId, option).send({ from: account });
    };

    return (
        <FarcasterFramework>
            <div>
                <h1>Faucet y Sistema de Votación en Polygon</h1>
                <Faucet account={account} />
                <PollForm createPoll={createPoll} />
                {loading ? <p>Cargando...</p> : <PollList polls={polls} vote={vote} />}
            </div>
        </FarcasterFramework>
    );
};

export default App;
