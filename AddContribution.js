import React, { useState, useEffect } from 'react';
import { BrowserProvider, Contract, parseUnits } from 'ethers';
import contractABI from '../utils/contractABI.json';
import '../App.css';

const contractAddress = "0xB26139f6730C62D4554B76fB54a89D8cA11Ec398";

const AddContribution = () => {
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [walletConnected, setWalletConnected] = useState(false);

    async function connectWallet() {
        if (!window.ethereum) return alert("Please install MetaMask!");
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            setWalletConnected(true);
            alert("Wallet connected successfully!");
        } catch (error) {
            console.error('Wallet connection failed:', error);
            alert("Failed to connect wallet. See console for details.");
        }
    }

    async function addContribution() {
        if (!window.ethereum) return alert("Please install MetaMask!");

        const provider = new BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new Contract(contractAddress, contractABI, signer);

        try {
            const tx = await contract.addContribution(name, parseUnits(amount.toString(), 'wei'));
            await tx.wait();
            alert('Contribution Added Successfully!');
        } catch (error) {
            console.error('Error:', error);
            alert('Error adding contribution. See console for details.');
        }
    }

    return (
        <div className="container">
            <div className="card">
                <h1>Carbon Offset Tracker</h1>
                <p>Track and verify carbon offset contributions easily on-chain.</p>
                {!walletConnected && <button onClick={connectWallet}>Connect Wallet</button>}
                <input
                    type="text"
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Amount (kg CO2)"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
                <button onClick={addContribution}>Add Contribution</button>
            </div>
        </div>
    );
};

export default AddContribution;
