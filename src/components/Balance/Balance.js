import React from 'react';

const Balance = (props) => {
    return (
        <div className="card p-3">
            <p>{props.label} Balance:</p>
            <p>{props.amount} {props.tokenType}</p>
        </div>
    );
}

export default Balance;