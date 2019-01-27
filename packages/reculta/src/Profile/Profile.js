import React, { Component } from 'react';
import { Card,CardText, CardBody,
  CardTitle, CardSubtitle } from 'reactstrap';

  class Profile extends Component {
    constructor(props) {
        super(props);  
        this.state = {
          dropdownOpen: false,
          'username':null,
          'id':null,
          'avatar_url':null,
          'followers':null,
           'bio':null,
           'public_repos':null,
           'following':null
        };
      }

    componentDidMount(){
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
     
  render(){
  return (
    <div>
      <Card>
      <CardBody>
        <img width="30%" src={this.state.avatar_url} />
        <CardTitle>username: {this.state.username}</CardTitle>
        <CardSubtitle>followers: {this.state.followers}</CardSubtitle>
        Bio: {this.state.bio}
        <CardText>public_repos: {this.state.public_repos}<br/></CardText>
        Following: {this.state.following}<br/>
        Id: {this.state.id}<br/>
        </CardBody>
      </Card>
    </div>
  );
};
}
export default Profile;