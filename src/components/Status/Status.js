import React from 'react';
import StatusItem from './StatusItem';

const Status = (props) => {
    return (
        <div className="d-grid gap-3 p-3">
            <div className="row">
                <StatusItem label="ChainID" value={props.chainId} />
            </div>
            <div className="row">
                <StatusItem label="Network ID" value={props.networkId} />
            </div>
            <div className="row">
                <StatusItem label="Account" value={props.account} />
            </div>
        </div>
    );
}

export default Status;