import React from 'react';
import farmer from '../../assets/farmer.png';

const Toolbar = () => {
    return (
        <nav className="navbar navbar-light bg-light">
            <div className="container-fluid">
                <div className="navbar-brand">
                    <img src={farmer} alt="Farmer" /> My Token Farm
                </div>
            </div>
        </nav>
    );
};

export default Toolbar;
