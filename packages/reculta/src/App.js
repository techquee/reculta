import React, { Component } from "react";
import fetch from "unfetch";
import { STATUS,Loading, Container} from "gitstar-components";
import {Link} from 'react-router-dom';
import { Collapse, Navbar,NavbarToggler,NavbarBrand, Button, Nav, Table, UncontrolledDropdown, DropdownToggle, DropdownMenu, Card, CardBody, CardTitle, DropdownItem} from 'reactstrap';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import Avatar from "./Avatar";
import Repositories from "./Repositories";

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
const AUTH_API_URI = process.env.REACT_APP_AUTH_API_URI;
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;

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

class App extends Component {
  state = {
    status: STATUS.INITIAL
  };
  componentDidMount() {
    const storedToken = localStorage.getItem("github_token");
    if (storedToken) {
      this.setState({
        status: STATUS.AUTHENTICATED
      });
      return;
    }
    const code =
      window.location.href.match(/\?code=(.*)/) &&
      window.location.href.match(/\?code=(.*)/)[1];
    if (code) {
      this.setState({ status: STATUS.LOADING });
      fetch(`${AUTH_API_URI}${code}`)
        .then(response => response.json())
        .then(({ token }) => {
          if (token) {
            localStorage.setItem("github_token", token);
          }
          this.setState({
            status: STATUS.FINISHED_LOADING
          });
        });
    }
    this.getRepo();
    this.getUserprofile();
  }
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.logout = this.logout.bind(this);
    this.state = {
      dropdownOpen: false,
      'username':null,
      'id':null,
      'avatar_url':null,
      'followers':null,
       'bio':null,
       'public_repos':null,
       'following':null,
      'repos':[],
      'starred':[]
    };
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  getRepo(){
    fetch('https://api.github.com/users/techquee/repos')
    .then(response => response.json())
    .then(response => {
     this.setState({'repos':response});
      console.log(response);
      return response;
    }) 
  }
  getStarredRepo(){
    fetch('https://api.github.com/users/techquee/starred')
    .then(response => response.json())
    .then(response => {
     this.setState({'starred':response});
      console.log(response);
      return response;
    })
    
  }
  getProfile(){
    fetch('https://api.github.com/users/techquee')
    .then(response => response.json())
    .then(response => {
     this.setState({
       username:response.login,
       id:response.id,
       avatar_url:response.avatar_url,
       followers:response.followers,
       bio:response.bio,
       public_repos:response.public_repos,
       following:response.following
  });
      console.log(response);
      return response;
    })
    
  }

/*async renderProfile(){
  let user = await this.getUserprofile();
  console.log(user);
  this.setState({
    'username':user.login,
    'id':user.id
  })
} 
*/

logout(){
  if(this.props.status === STATUS.AUTHENTICATED){
    this.setState({
      status: STATUS.AUTHENTICATED
    });
    return;
}
}
  render() {      
    return (
      <ApolloProvider client={client}>
        <Container>
          <Navbar color="light" light expand="md">
            <NavbarBrand href="/">Reculta</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
            <Avatar
              style={{
                transform: `scale(${
                  this.state.status === STATUS.AUTHENTICATED ? "1" : "0"
                })`
              }}
            />
            <a
              style={{
                display:
                  this.state.status === STATUS.INITIAL ? "inline" : "none"
              }}
              href={`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=user%20public_repo%20gist&redirect_uri=${REDIRECT_URI}&client_secret=${CLIENT_SECRET}`}
            >
              Login
            </a>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>       
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem onClick={() => this.getProfile()}><Link to="/Profile">Profile</Link></DropdownItem>
                  <DropdownItem onClick={() => this.getRepo()}><Link to="/Repo">my Repositories</Link></DropdownItem>
                  <DropdownItem>my Activities</DropdownItem>
                  <DropdownItem onClick={() => this.getStarredRepo()}>starred Repo</DropdownItem>
                  <DropdownItem disabled>Team</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem onClick= {() => {
              if (this.props.status === STATUS.AUTHENTICATED) {
                this.setState({
                  status: STATUS.INITIAL
                });
              }
            }}>
            Logout
            </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>

        {/*To Display Table of fetched repositories*/}

    <Table bordered>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Full Name</th>
            <th>Id</th>
            <th>Activity</th>
          </tr>
        </thead>
       {this.state.repos.map(function(repo,index) {
        return (
        <tbody>
          <tr>
            <th scope="row" key={index}>{index}</th>
            <td>{repo.name}</td>
            <td>{repo.full_name}</td>
            <td>{repo.id}</td>
            <td><Button outline color="success" >Show Activity</Button>{' '}</td>
          </tr>
        </tbody>     
  )}
)}
</Table>
<Table dark>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Starred</th>
            <th>Id</th>
            <th>Owner</th>
          </tr>
        </thead>
       {this.state.starred.map(function(star,index) {
        return (
        <tbody>
          <tr>
            <th scope="row" key={index}>{index}</th>
            <td>{star.name}</td>
            <td>{star.full_name}</td>
            <td>{star.id}</td>
            <td>{star.owner.login}</td>
          </tr>
        </tbody>     
  )}
)}
</Table>

{/* Section to display Profile of the authenticated user */}
<center>
<div>
      <Card>
      <CardBody>
        <img width="16%" src={this.state.avatar_url} />
        <CardTitle><h3>{this.state.username}</h3></CardTitle>
        <hr width="10%"/>
        {this.state.followers} Followers <br/>
        {this.state.bio} <br/>
        {this.state.public_repos} Repositories <br/> 
        {this.state.following} following <br/>
        {this.state.id} <br/>
        </CardBody>
      </Card>
    </div>
</center>

{/* Random Repositiories to star your favourite one */}
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

export default App;
