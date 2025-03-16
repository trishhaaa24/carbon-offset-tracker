import React from 'react';
import AddContribution from './components/AddContribution';
import ViewContribution from './components/ViewContribution';

function App() {
    return (
        <div className="App">
            <h1>🌍Carbon Offset Tracker</h1>
            <AddContribution />
            <ViewContribution />
        </div>
    );
    const connectWallet = async () => {
      if (window.ethereum) {
          try {
              const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
              alert(`Wallet connected: ${accounts[0]}`);
          } catch (error) {
              alert('Wallet connection failed. Please try again.');
          }
      } else {
          alert('Please install MetaMask.');
      }
  };
  
}

export default App;
