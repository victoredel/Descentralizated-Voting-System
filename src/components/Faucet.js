import React, { useState } from 'react';
import Web3 from 'web3';
import FaucetToken from '../contracts/FaucetToken.json';

const Faucet = ({ account }) => {
    const [message, setMessage] = useState('');
    const web3 = new Web3(Web3.givenProvider);

    const requestTokens = async () => {
        const networkId = await web3.eth.net.getId();
        const tokenContract = new web3.eth.Contract(FaucetToken.abi, FaucetToken.networks[networkId].address);
        try {
            await tokenContract.methods.requestTokens().send({ from: account });
            setMessage('Tokens solicitados con éxito.');
        } catch (error) {
            setMessage('Error al solicitar tokens.');
        }
    };

    return (
        <div>
            <h2>Faucet de Tokens</h2>
            <button onClick={requestTokens}>Solicitar Tokens</button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Faucet;
