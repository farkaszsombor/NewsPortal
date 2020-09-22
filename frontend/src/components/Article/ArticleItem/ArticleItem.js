import React from 'react';
import { Link } from 'react-router-dom';

import Button from '../../UI/Button/Button';

const articleItem = ({article, articleDeleteHandler}) => {
    return <div className="card">
        <div className="card-body">
            <div className="row">
                <div className="col-md-6">
                    <h5 className="card-title">{article.title}</h5>
                </div>
                <div className="col-md-6">
                    <p className="text-right">{article.createdDateTime} </p>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <p>Category: {article.category.name} </p>
                </div>
            </div>
            <div className="row">
                <div className="col-md-10">
                    <p className="card-text">{article.description}</p>
                </div>
                <div className="col-md-2 d-flex justify-content-end align-items-end">
                    <Link to={`/article?id=${article.id}&edit=true`} className="btn btn-warning m-1"> Edit </Link>
                    <Button type="button"
                            label="Delete"
                            classes="btn btn-danger m-1"
                            clickedHandler={() => articleDeleteHandler(article.id)}/>
                </div>
            </div>
        </div>
    </div>
};

export default articleItem;