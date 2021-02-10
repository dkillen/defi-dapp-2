import React from 'react';
import Web3 from 'web3' ;

import Balance from '../components/Balance/Balance';

const Staking = (props) => {
    const web3 = new Web3(Web3.givenProvider || "ws://localhost:7545");
   return (
       <div className="d-grid gap-3">
           <div className="row">
               <div className="col">
                   <Balance label="Staking" amount={web3.utils.fromWei(props.stakingBalance, 'ether')} tokenType="mDAI" />
               </div>
               <div className="col">
                   <Balance label="Reward" amount={web3.utils.fromWei(props.dappTokenBalance, 'ether')} tokenType="DAPP" />                
               </div>
           </div>
           <div className="card d-grid gap-3 p-3">
               <div className="row">
                   <div className="col">
                       <label>Stake Tokens</label>
                   </div>
                   <div className="col">
                       <label>Balance: {web3.utils.fromWei(props.daiTokenBalance, 'ether')}</label>
                   </div>
               </div>
               <input 
                    type="text"
                    placeholder="0" />
               <div className="row">
                   <div className="col">
                       <button 
                            type="submit"
                            className="btn btn-outline-primary w-100" 
                            onClick={(event) => {
                                event.preventDefault();
                                let amount = '100';
                                // amount = this.input.value.toString()
                                amount = web3.utils.toWei(amount, 'ether')
                                props.onStakeTokens(amount);
                            }}>Stake</button>
                   </div>
                   <div className="col">
                       <button 
                            type="submit" 
                            className="btn btn-outline-danger w-100" 
                            onClick={(event) => {
                                event.preventDefault();
                                props.onUnstakeTokens();
                            }}>Unstake
                        </button>                        
                   </div>
               </div>
           </div>
           <button className="btn btn-outline-success">Connect</button>
       </div>
   );
}

export default Staking;