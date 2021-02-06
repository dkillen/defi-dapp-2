import React from 'react';

import farmer from '../../assets/farmer.png';

const toolbar = () => (
    <nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
            <div className="navbar-brand">
                <img src={farmer} alt="Farmer" /> My Token Farm
            </div>
            <span>Address: 0x0</span>
        </div>
    </nav>    
);

export default toolbar;