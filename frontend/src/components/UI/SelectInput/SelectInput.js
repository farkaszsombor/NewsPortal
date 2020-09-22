import React from 'react';

const selectInput = ({categories, value, changedHandler}) => {
    const renderedCategorySelect = categories.map(category => {
        return <option key={category.id} value={category.id}>{category.name}</option>
    })
    let renderedSelect = null;
    if(categories.length !== 0) {
        renderedSelect = <select className="custom-select" onChange={(event) => {changedHandler(event)}} value={value}>
                            {renderedCategorySelect}
                        </select>
    }

    return <div className="form-group">
                <label className="control-label col-sm-2" htmlFor="description">Article Category:</label>
                <div className="col-sm-10">
                    {renderedSelect}
                </div>
            </div>
}

export default selectInput;