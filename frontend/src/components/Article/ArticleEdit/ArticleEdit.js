import React from 'react';

import TextInput from '../../UI/TextInput/TextInput';
import TextAreaInput from '../../UI/TextAreaInput/TextAreaInput';
import SelectInput from '../../UI/SelectInput/SelectInput';
import ErrorBox from '../../UI/ErrorBox/ErrorBox';
import Button from '../../UI/Button/Button';

const articleEdit = ({categories, newArticle, titleChangedHandler, descriptionChangedHandler, categoryChangedHandler, postNewArticleHandler, error}) => {
    return (<div>
        <form  className="form-horizontal">
            <TextInput elementName="title" 
                        placeholder="Article Title" 
                        label="Article Title:" 
                        value={newArticle.title} 
                        changedEventHandler={titleChangedHandler}/>
            <TextAreaInput elementName="description" 
                        placeholder="Article Description" 
                        label="Article Description:" 
                        value={newArticle.description} 
                        changedEventHandler={descriptionChangedHandler}/>
            <SelectInput categories={categories} value={newArticle.category.id} changedHandler={categoryChangedHandler}/>
            <div className="form-group">
                <div className="col-sm-offset-2 col-sm-10">
                    <Button type="button"
                            label="Submit"
                            classes="btn btn-primary"
                            clickedHandler={postNewArticleHandler}/>
                </div>
            </div>
            <ErrorBox error={error}/>
        </form>
    </div>);
}

export default articleEdit;