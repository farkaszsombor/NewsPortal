import React, {Component} from 'react';
import axios from 'axios';

import ArticleEdit from '../../components/Article/ArticleEdit/ArticleEdit';

export class ArticlesPage extends Component {

    state = {
        categories: [],
        newArticle: {
            id: 0,
            title: '',
            description: '',
            createdDateTime: '',
            category: {
                id: 0,
                name: ''
            }
        },
        error: null
    }

    componentDidMount() {
        axios.get('https://localhost:44330/api/categories')
            .then(result => {
                this.setState({
                    categories: result.data,
                    newArticle: {
                        ...this.state.newArticle,
                        category: {
                            id: result.data[0].id,
                            name: result.data[0].name
                        }
                    }
                });
            })
            .catch(error => console.log( error))
        
        const queryParams = new URLSearchParams(window.location.search);
        const editMode = queryParams.get('edit') || false;
        const articleId = queryParams.get('id');
        if(editMode) {
            axios.get(`https://localhost:44330/api/articles/${articleId}`)
            .then(result => {
                this.setState({
                    newArticle: {
                        id: result.data.id,
                        title: result.data.title,
                        description: result.data.description,
                        createdDateTime: result.data.createdDateTime,
                        category: {
                            id: result.data.category.id,
                            name: result.data.category.name
                        }
                    }
                });
            })
            .catch(error => console.log( error))
        }
    }

    titleChangedHandler = (event) => {
        this.setState({
            newArticle: {
                ...this.state.newArticle,
                title: event.target.value
            }
        });
    }

    descriptionChangedHandler = (event) => {
        this.setState({
            newArticle: {
                ...this.state.newArticle, 
                description: event.target.value
            }
        });
    }

    categoryChangedHandler = (event) => {
        this.setState({
            newArticle: {
                ...this.state.newArticle,
                category: {
                    id: +event.target.value,
                    name: this.state.categories.find(x => x.id === +event.target.value).name
                }
            }
        });
    }

    postNewArticleHandler = () => {

        if(this.state.newArticle.title === '') {
            this.setState({
                ...this.state,
                error: 'Article Title cannot be empty.'
            })
            return;
        }
        if(this.state.newArticle.description === '') {
            this.setState({
                ...this.state,
                error: 'Write something about the article please :) .'
            });
            return;
        }
        if(this.state.newArticle.category.name === '') {
            this.setState({
                ...this.state,
                error: 'Article Category cannot be empty.'
            });
            return;
        }

        const article = {
            id: this.state.newArticle.id,
            title: this.state.newArticle.title,
            description: this.state.newArticle.description,
            createdDateTime: this.state.newArticle.createdDateTime,
            category: {
                id: this.state.newArticle.category.id,
                name: this.state.newArticle.category.name,
            }
        };

        const queryParams = new URLSearchParams(window.location.search);
        const editMode = queryParams.get('edit') || false;
        if(editMode) {
            axios.put('https://localhost:44330/api/articles', article)
            .then(result => {
                this.props.history.push('/');
            }).catch(error => {
                console.log(error);
            });
        } else {
            axios.post('https://localhost:44330/api/articles', article)
            .then(result => {
                this.props.history.push('/');
            }).catch(error => {
                console.log(error);
            });
        }

    }

    render() {
        return <div>
            <ArticleEdit categories={this.state.categories}
                newArticle={this.state.newArticle}
                titleChangedHandler={this.titleChangedHandler}
                descriptionChangedHandler={this.descriptionChangedHandler}
                categoryChangedHandler={this.categoryChangedHandler}
                postNewArticleHandler={this.postNewArticleHandler}
                error={this.state.error}/>
        </div>
    }
}

export default ArticlesPage;