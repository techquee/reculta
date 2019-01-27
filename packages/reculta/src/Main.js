import React, { Component } from 'react'
import App from './App';
import Profile from './Profile/Profile';
import Repo from './Repo/Repo';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

const client = new ApolloClient({
  uri: "https://api.github.com/graphql",
  request: operation => {
    const token = localStorage.getItem("github_token");
    if (token) {
      operation.setContext({
        headers: {
          authorization: `Bearer ${token}`
        }
      });
    }
  }
});

class Main extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
      <Router>
          <div>
        <Route path='/' component={App} />
        <Route path='/Profile' component={Profile} />
        <Route path='/Repo' component={Repo} />
        </div>
      </Router>
      </ApolloProvider>
    )
  }
}

export default Main;