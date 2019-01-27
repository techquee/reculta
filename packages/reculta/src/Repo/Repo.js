import React, { Component } from 'react';
import Repositories from "../Repositories";
import { ApolloProvider } from "react-apollo";
import { STATUS, Loading, Container } from "gitstar-components";
import ApolloClient from "apollo-boost";

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

class Repo extends Component {
  state = {
    status: STATUS.INITIAL
  };
    render(){
      
        return (
      <ApolloProvider client={client}>
        <Container>
            <Loading
            status={this.state.status}
            callback={() => {
              if (this.props.status !== STATUS.AUTHENTICATED) {
                this.setState({
                  status: STATUS.AUTHENTICATED
                });
              }
            }}
          />
          {this.state.status === STATUS.AUTHENTICATED && <Repositories />}
        </Container>
    </ApolloProvider>
        );
    }
}

export default Repo;