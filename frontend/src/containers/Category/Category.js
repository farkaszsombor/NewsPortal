import React, {Component} from 'react';
import axios from 'axios';

import CategoryList from '../../components/CategoryList/CategoryList';
import CategoryAdd from '../../components/CategoryAdd/CategoryAdd'
export class CategoryPage extends Component {

    state = {
        newCategory: {
            name: '',
            createdDateTime: ''
        },
        categories: [],
        error: null
    }

    componentDidMount() {
        axios.get('https://localhost:44330/api/categories')
            .then(result => {
                this.setState({categories: result.data});
            })
            .catch(error => console.log( error))
    }

    editCategoryHandler = (categoryId) => {
        const categoryIndex = this.state.categories.findIndex((category) => {
            return category.id === categoryId;
        });
        const category = {
            ...this.state.categories[categoryIndex],
        };
        axios.put('https://localhost:44330/api/categories', category)
            .then(() => {
            })
            .catch(error => {
                console.log(error);
            })
    }

    deleteCategoryHandler = (categoryId) => {
        axios.delete(`https://localhost:44330/api/categories/${categoryId}`, {
            headers: {
                'Accept': 'application/json'
            },
        })
            .then((result) => {
                const categories = [...this.state.categories];
                const updatedCategories = categories.filter(category => category.id !== categoryId);
                this.setState({categories: updatedCategories});
            })
            .catch(error => {
                console.log(error);
            })
    }

    changeCategoryHandler = (event, categoryId) => {
        const categoryIndex = this.state.categories.findIndex((category) => {
            return category.id === categoryId;
        });
        const category = {
            ...this.state.categories[categoryIndex],
        };
        category.name = event.target.value;
        const categories = [...this.state.categories];
        categories[categoryIndex] = category;

        this.setState((prevState, props) => {
            return {
              categories: categories,
            };
          });
    }

    addCategoryInputChangeHandler = (event) => {
        const category = {
            name: event.target.value
        }
        this.setState((prevState, props) => {
            return {
                newCategory: category
            }
        })        
    }

    addCategoryHandler = () => {
        const category = this.state.newCategory;
        if(category.name === '') {
            this.setState({
                ...this.state,
                error: 'Empty category name provided.'
            });
            return;
        } else { 
            this.setState({
                ...this.state,
                error: null
            });
        }
        axios.post('https://localhost:44330/api/categories', category)
            .then(result => {
                const category = result.data;
                const categories = [...this.state.categories];
                const updatedCategories = [...categories, {...category}];
                this.setState({
                    newCategory: {
                        name: ''
                    },
                    categories: updatedCategories
                });
            }).catch(error => {
                console.log(error);
            });
    }

    render() {
        return <div>
            <CategoryList categories={this.state.categories} categoryEditHandler={this.editCategoryHandler} categoryChangeHandler={this.changeCategoryHandler} deleteCategoryHandler={this.deleteCategoryHandler}/>
            <hr/>
            <CategoryAdd error={this.state.error} newCategory={this.state.newCategory.name} categoryAddHandler={this.addCategoryHandler} newCategoryChangeHandler={this.addCategoryInputChangeHandler}/>
        </div>
    }
}

export default CategoryPage;