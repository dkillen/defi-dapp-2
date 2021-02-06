import React from 'react';

const walletContext = React.createContext({
    address: '0x0',
    connect: () => {
        
    }
});

export default walletContext;