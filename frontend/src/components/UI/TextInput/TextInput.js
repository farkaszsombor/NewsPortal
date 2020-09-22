import React from 'react';

const textInput = ({elementName, placeholder, label, value, changedEventHandler}) => {
    return <div className="form-group">
                <label className="control-label col-sm-2" htmlFor={elementName}>{label}</label>
                <div className="col-sm-10">
                    <input type="text" className="form-control" onChange={(event) => {changedEventHandler(event)}} value={value} id={elementName} placeholder={placeholder}/>
                </div>
            </div>
}

export default textInput;