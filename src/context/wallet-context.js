import React from 'react';

const walletContext = React.createContext({
    chainId: '0',
    networkId: '0',
    account: '0x0',
    daiTokenBalance: 0,
    dappTokenBalance: 0,
    stakingBalance: 0,
});

export default walletContext;