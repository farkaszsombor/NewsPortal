import React from 'react';

import NavigationItems from '../NavigationItems/NavigationItems';

const toolbar = () => (
    <header>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <NavigationItems></NavigationItems>
            </div>
        </nav>
    </header>
);

export default toolbar;
