import React from 'react';

import TextInput from '../UI/TextInput/TextInput';
import Button from '../UI/Button/Button';
import ErrorBox from '../UI/ErrorBox/ErrorBox';

const categoryAdd = ({error, newCategory, categoryAddHandler, newCategoryChangeHandler}) => {

    return <div>
        <form className="form-horizontal">
            <TextInput elementName="name"
                        placeholder="Category Name"
                        label="Category Name:"
                        value={newCategory}
                        changedEventHandler={newCategoryChangeHandler}/>
            <div className="form-group">
                <div className="col-sm-offset-2 col-sm-10">
                    <Button type="button"
                            label="Submit"
                            classes="btn btn-primary"
                            clickedHandler={categoryAddHandler}/>
                </div>
            </div>
            <ErrorBox error={error}/>
        </form>
    </div>
};

export default categoryAdd;