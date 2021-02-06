import React from 'react';
import Auxiliary from '../../hoc/Auxiliary';
import Toolbar from '../Toolbar/Toolbar';

const layout = (props) => (
    <Auxiliary>
        <Toolbar></Toolbar>
        <main>
            {props.children}
        </main>
    </Auxiliary>
);

export default layout;