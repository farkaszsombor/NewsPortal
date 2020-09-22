import React from 'react';

const button = ({type, label, classes, clickedHandler}) => {
    return <button onClick={clickedHandler} type={type} className={classes}>{label}</button>
}

export default button; 