import React, { useState } from 'react';
import { BrowserProvider, Contract } from 'ethers';
import contractABI from '../utils/contractABI.json';
import '../App.css';

const contractAddress = "0xB26139f6730C62D4554B76fB54a89D8cA11Ec398";

const ViewContribution = () => {
    const [walletAddress, setWalletAddress] = useState('');
    const [contribution, setContribution] = useState(null);
    const [error, setError] = useState('');

    const connectWallet = async () => {
        if (window.ethereum) {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                setWalletAddress(accounts[0]);
                setError('');
            } catch (err) {
                setError('Failed to connect wallet. Please try again.');
            }
        } else {
            setError('Please install MetaMask to continue.');
        }
    };

    const fetchContribution = async () => {
        if (!walletAddress) {
            setError('Please connect your wallet first.');
            return;
        }

        const provider = new BrowserProvider(window.ethereum);
        const contract = new Contract(contractAddress, contractABI, provider);

        try {
            const contribution = await contract.getContribution(walletAddress);
            if (!contribution[1] || contribution[1].toString() === '0') {
                setError('No contribution found.');
                setContribution(null);
            } else {
                setContribution({
                    contributor: contribution[0],
                    amount: contribution[1].toString(), // Fix for BigInt conversion
                    timestamp: contribution[2].toString() // Fix for BigInt conversion
                });
                setError('');
            }
        } catch (error) {
            setError('Error fetching contribution. Ensure wallet and network are correct.');
        }
    };

    return (
        <div className="container">
            <h1>View Contribution</h1>
            <button onClick={connectWallet}>
                {walletAddress ? `Connected: ${walletAddress}` : 'Connect Wallet'}
            </button>
            <button onClick={fetchContribution}>Fetch Contribution</button>

            {contribution && (
                <div>
                    <p>Contributor: {contribution.contributor}</p>
                    <p>Amount: {contribution.amount} kg CO2</p>
                    <p>Timestamp: {new Date(Number(contribution.timestamp) * 1000).toLocaleString()}</p>
                </div>
            )}

            {error && <p className="error">{error}</p>}
        </div>
    );
};

export default ViewContribution;
