import React, { Component } from 'react';

import Auxiliary from '../Auxiliary/Auxiliary';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
class Layout extends Component {

    render() {
        return (
            <Auxiliary>
                <Toolbar/>
                <main className="container mt-4">{this.props.children}</main>
            </Auxiliary>
        );
    }
}
export default Layout;
