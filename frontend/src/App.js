import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import Home from './containers/Home/Home';
import Article from './containers/Article/Article';
import Category from './containers/Category/Category';

export class App extends Component{
  
  render() {
    return <div>
      <Layout>
        <Switch>
          <Route path="/article" component={Article}/>
          <Route path="/category" component={Category}/>
          <Route path="/" component={Home}/>
        </Switch>
      </Layout>
    </div>
  }
}

export default App;
