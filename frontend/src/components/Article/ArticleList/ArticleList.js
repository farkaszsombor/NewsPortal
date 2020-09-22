import React from 'react';

import ArticleItem from '../ArticleItem/ArticleItem';

const articleList = ({articles, articleDeleteHandler}) => {

    const renderedArticles = articles.map(article => {
        return <ArticleItem key={article.id} article={article} articleDeleteHandler={articleDeleteHandler}/>
    })

    return <div className="row">
        <div className="col-12">
            {renderedArticles}
        </div>
    </div>
};

export default articleList;