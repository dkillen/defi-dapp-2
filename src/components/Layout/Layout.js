import React from 'react';

import Auxiliary from '../../hoc/Auxiliary';
import Staking from '../../containers/Staking';
import Toolbar from '../Toolbar/Toolbar';

const Layout = (props) => (
    <Auxiliary>
        <Toolbar />
        <main className="container w-50 mt-4">
            <Staking />
        </main>
    </Auxiliary>
);

export default Layout;