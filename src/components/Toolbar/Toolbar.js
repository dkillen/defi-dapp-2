import React, { useContext } from 'react';

import WalletContext from '../../context/wallet-context';

import farmer from '../../assets/farmer.png';

const Toolbar = () => {
    const walletContext = useContext(WalletContext);

    return (
        <nav className="navbar navbar-light bg-light">
            <div className="container-fluid">
                <div className="navbar-brand">
                    <img src={farmer} alt="Farmer" /> My Token Farm
                </div>
                <span>Address: {walletContext.address}</span>
            </div>
        </nav>
    );
};

export default Toolbar;
