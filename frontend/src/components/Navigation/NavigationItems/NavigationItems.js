import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
    <div className="collapse navbar-collapse" id="navbarNavDropdown">
        <ul className="navbar-nav">
            <NavigationItem link='/'>Home Page</NavigationItem>
            <NavigationItem link='/article'>Article</NavigationItem>
            <NavigationItem link='/category'>Category</NavigationItem>
        </ul>
    </div>
);

export default navigationItems;
