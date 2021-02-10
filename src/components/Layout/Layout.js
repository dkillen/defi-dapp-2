import React, { Component } from 'react';
import Web3 from 'web3';

import DaiToken from '../../contracts/build/contracts/DaiToken.json';
import DappToken from '../../contracts/build/contracts/DappToken.json';
import TokenFarm from '../../contracts/build/contracts/TokenFarm.json';

import Auxiliary from '../../hoc/Auxiliary';
import Staking from '../../containers/Staking';
import Toolbar from '../Toolbar/Toolbar';
import Status from '../../components/Status/Status';

class Layout extends Component {

    constructor(props) {
        super(props);
        this.state = {
            chainId: '0',
            networkId: '0',
            account: '0x0',
            daiToken: {},
            dappToken: {},
            tokenFarm: {},  
            daiTokenBalance: '0',
            dappTokenBalance: '0',
            stakingBalance: '0',
        };
    }

    componentDidMount = () => {
        this.loadBlockchainData();
    }

    loadBlockchainData = async () => {
        const web3 = new Web3(Web3.givenProvider || "ws://localhost:7545");
        const accounts = await web3.eth.getAccounts();
        const networkId = await web3.eth.net.getId();
        const chainId = await web3.eth.getChainId();
        this.setState(() => {
            return {
                account: accounts[0],
                networkId: networkId,
                chainId: chainId,
            }
        });

        const daiTokenData = DaiToken.networks[this.state.networkId];
        if (daiTokenData) {
            const daiToken = new web3.eth.Contract(DaiToken.abi, daiTokenData.address);
            this.setState({ daiToken });
            daiToken.methods.balanceOf(this.state.account)
                .call()
                .then((balance) => {
                    this.setState({ daiTokenBalance: balance.toString() });
                });
        } else {
            window.alert('DaiToken contract not deployed to detected network.');
        }

        const dappTokenData = DappToken.networks[this.state.networkId];
        if(dappTokenData) {
            const dappToken = new web3.eth.Contract(DappToken.abi, dappTokenData.address);
            this.setState({ dappToken });
            dappToken.methods.balanceOf(this.state.account)
                .call()
                .then((balance) => {
                    this.setState({ dappTokenBalance: balance.toString() });
                });
        } else {
            window.alert('DappToken contract not deployed to detected network.');
        }
    
        const tokenFarmData = TokenFarm.networks[this.state.networkId];
        if(tokenFarmData) {
            const tokenFarm = new web3.eth.Contract(TokenFarm.abi, tokenFarmData.address);
            this.setState({ tokenFarm });
            tokenFarm.methods.stakingBalance(this.state.account)
                .call()
                .then((balance) => {
                    this.setState({ stakingBalance: balance.toString()});
                });
        } else {
            window.alert('TokenFarm contract not deployed to detected network.');
        }
    }

    stakeTokens = (amount) => {
        this.state.daiToken.methods.approve(this.state.tokenFarm._address, amount)
            .send({ from: this.state.account })
            .on('transactionHash', (hash) => {
                this.state.tokenFarm.methods.stakeTokens(amount)
                    .send({ from: this.state.account })
                    .on('transactionHash', (hash) => {
                        this.setState({ loading: false });
                    });
            });
    }
    
    unstakeTokens = () => {
        this.setState({ loading: true });
        this.state.tokenFarm.methods.unstakeTokens()
            .send({ from: this.state.account })
            .on('transactionHash', (hash) => {
                this.setState({ loading: false });
            })
    }

    render() {
        return (
            <Auxiliary>
                <Toolbar />
                <main className="container w-50 mt-4">
                    <Status 
                        chainId={this.state.chainId}
                        networkId={this.state.networkId}
                        account={this.state.account}
                    />
                    <Staking 
                        daiTokenBalance={this.state.daiTokenBalance}
                        dappTokenBalance={this.state.dappTokenBalance}
                        stakingBalance={this.state.stakingBalance}
                        onStakeTokens={this.stakeTokens}
                        onUnstakeTokens={this.unstakeTokens}
                    />
                </main>
            </Auxiliary>     
        );   
    }
};

export default Layout;