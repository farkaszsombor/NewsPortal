import React from 'react';
import { NavLink } from 'react-router-dom';


const navigationItem = (props) => (
    <li className="nav-item active">
        <NavLink className="nav-link" exact to={props.link}>
            {props.children}
        </NavLink>
    </li>
);

export default navigationItem;
