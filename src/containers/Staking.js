import React, { Component } from 'react';

import WalletContext from '../context/wallet-context';

import Balance from '../components/Balance/Balance';

class Staking extends Component {
    static contextType = WalletContext;

    render() {
        return (
            <div className="d-grid gap-3">
                <div className="row">
                    <div className="col">
                        <Balance label="Staking" amount="0" tokenType="mDAI" />
                    </div>
                    <div className="col">
                        <Balance label="Reward" amount="0" tokenType="DAPP" />                
                    </div>
                </div>
                <div className="card d-grid gap-3 p-3">
                    <div className="row">
                        <div className="col">
                            <label>Stake Tokens</label>
                        </div>
                        <div className="col">
                            <label>Current Balance: </label>
                        </div>
                    </div>
                    <input name="tokens" defaultValue="0"></input>
                    <div className="row">
                        <div className="col">
                            <button className="btn btn-outline-primary w-100">Stake</button>
                        </div>
                        <div className="col">
                            <button className="btn btn-outline-danger w-100">Unstake</button>                        
                        </div>
                    </div>
                </div>
                <button className="btn btn-outline-success">Connect Wallet</button>
            </div>
        );
    }
}

export default Staking;