import React from 'react';

const StatusItem = (props) => {
    return (
        <div className="card bg-light text-dark w-100">
            <div className="card-body">
                <span className="fs-6">{props.label}: {props.value}</span>
            </div>
        </div>
    );
}

export default StatusItem;