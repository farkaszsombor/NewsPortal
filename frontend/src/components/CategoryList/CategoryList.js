import React from 'react';

import Button from '../UI/Button/Button';

const categoryList = ({categories, categoryEditHandler, categoryChangeHandler, deleteCategoryHandler }) => {
    const inputElementRef = React.createRef();
    const renderedCategories = categories.map((category, index) => {
        return <tr key={category.id}>
            <th className="align-middle" scope="row">{index + 1}</th>
            <td className="align-middle">
                <input className="form-control" ref={inputElementRef} type="text" onChange={(event) => categoryChangeHandler(event, category.id)} value={category.name}/>
            </td>
            <td className="align-middle">
                <Button type="button"
                label="Edit"
                classes="btn btn-warning"
                clickedHandler={() => categoryEditHandler(category.id)}/>
            </td>
            <td className="align-middle">
                <Button type="button"
                    label="Delete"
                    classes="btn btn-danger"
                    clickedHandler={() => deleteCategoryHandler(category.id)}/>
            </td>
        </tr>
    });

    return <div> 
        <table className="table table-hover">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Category Name</th>
                    <th scope="col">Edit</th>
                    <th scope="col">Delete</th>
                </tr>
            </thead>
            <tbody>
                {renderedCategories}
            </tbody>
        </table>
    </div>
};

export default categoryList;