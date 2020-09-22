import React, {Component} from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import ArticleList from '../../components/Article/ArticleList/ArticleList';
import Pagination from '../../components/UI/Pagination/Pagination';
import SearchBox from '../../components/UI/SearchBox/SearchBox';

export class HomePage extends Component {
    state = {
        articles: [],
        paginationParams: {
            pageIndex: 0,
            pageSize: 0,
            count: 0,
        },
        search: ''
    }

    componentDidMount() {
        const queryParams = new URLSearchParams(window.location.search);
        const page = queryParams.get('page') || 1;
        this.getArticles(page, this.state.search);
    }

    componentDidUpdate(prevProps) {
        if (this.props.location.search !== prevProps.location.search) {
            const queryParams = new URLSearchParams(window.location.search);
            const page = queryParams.get('page') || 1;
            this.getArticles(page, this.state.search);
        }
    }

   getArticles = (page, search) => {
    axios.get(`https://localhost:44330/api/articles?pageIndex=${page}&search=${search}`)
    .then(result => {
        this.setState({
            articles: result.data.data,
            paginationParams: {
                pageIndex: result.data.pageIndex,
                pageSize: result.data.pageSize,
                count: result.data.count,
            }
        });
    })
    .catch(error => console.log( error))
   }

    searchBoxValueChanged = (event) => {
        const page = 1;
        const search = event.target.value;
        this.getArticles(page, search);
        this.setState({
            ...this.state,
            search
        });
        this.props.history.push({search: '?page=1'})
    }

    articleDeleteHandler = (articleId) => {
        axios.delete(`https://localhost:44330/api/articles/${articleId}`)
            .then(result => {
                const articles = this.state.articles;
                const updatedArticles = articles.filter(x => x.id !== articleId);
                this.setState({
                    articles: updatedArticles
                })
            })
            .catch(error => console.log( error))
    }

    render() {
        return <div>
            <SearchBox searchBoxValueChanged={this.searchBoxValueChanged}/>
            <ArticleList articles={this.state.articles} articleDeleteHandler={this.articleDeleteHandler}/>
            <Pagination paginationParams={this.state.paginationParams}/>
        </div>
    }
}

export default withRouter(HomePage);