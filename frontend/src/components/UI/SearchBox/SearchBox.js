import React from 'react';

const searchBox = ({searchExpression, searchBoxValueChanged}) => {
    return <div className="input-group mb-3">
                <input type="text" onChange={(event) => searchBoxValueChanged(event)} className="form-control" placeholder="Search by title or description"/>
            </div>
  
}

export default searchBox