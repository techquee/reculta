# reculta
Features of the Project:

- Github OAuth Authentication with:
  - Loaders while the login api is authenticating and fetching files and token
  - styling with reactstrap and css 
  - react routing
  - Login and Logout
  - querying to fetch the users repositories
  - React Apollo to interact with Github GraphQL API
  - display Activities
- Github Api calls using fetch in React to display for **Profile section**:
  - Username
  - No. of followers
  - No. of following
  - Bio
  - No. of public repositories
  - avatar_url aka profile picture of github user
- Github Api calls using fetch in React to display for **Repo section**:
  - name of repositories of authenticated user
  - full name
  - id
  - Activity
- Github Api calls using fetch in React to display for **Starred section**:
  - name of starred repositories of authenticated user
  - full name
  - name of owner
- List of repositories to star them

## To run
After cloning
- cd packages
- cd reculta
- yarn
- npm i react-router-dom (if required)
- yarn start 
- Voila! Open http://localhost:3001/#/

## Issues
fetching on same home-page.

## Fetching the authenticated user repository

![Image](https://raw.githubusercontent.com/techquee/reculta/master/images/image%20(1).png)

## Fetching authenticated user details to display profile

![Image](https://raw.githubusercontent.com/techquee/reculta/master/images/image%20(2).png)

## Fetching starred repository of the authenticated user's list of repositories

![Image](https://raw.githubusercontent.com/techquee/reculta/master/images/image.png)

## Star among the favourite fetched repository using graphql query

![Image](https://raw.githubusercontent.com/techquee/reculta/master/images/image%20(4).png)

## Load More button for pagination

![Image](https://raw.githubusercontent.com/techquee/reculta/master/images/image%20(3).png)
