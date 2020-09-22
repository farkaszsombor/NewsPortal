import React from 'react';

const textAreaInput = ({elementName, placeholder, label, value, changedEventHandler}) => {
    return <div className="form-group">
                <label className="control-label col-sm-2" htmlFor={elementName}>{label}</label>
                <div className="col-sm-10">
                    <textarea className="form-control" onChange={(event) => {changedEventHandler(event)}} value={value} rows="5" id={elementName} placeholder={placeholder}>{value}</textarea>
                </div>
            </div>
}

export default textAreaInput;