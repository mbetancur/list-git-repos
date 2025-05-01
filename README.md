HelloBuild-GitHub Repos App @author: @mbetancur

A simple application that demonstrates GitHub OAuth integration and user authentication. This is a basic integration to Github with OAuth, first create an account then provide both Client Id and Client Secret from your github app (see steps below for more info), then authorize the connection and finally fetch the repos of the user.

Useful links to setup a Github app and test this project
1. https://docs.github.com/en/apps/creating-github-apps/registering-a-github-app/registering-a-github-app
2. In essence in order to test just need to create a GithubApp.
Check image.png, to implement the same values in order to test fluently.

Github-API used:
https://docs.github.com/en/rest/repos/repos?apiVersion=2022-11-28#list-repositories-for-the-authenticated-user--code-samples

Setup

## Backend
```bash
cd backend
npm install
npm start
```

## Frontend
```bash
cd frontend
npm install
npm run dev
```

Features
- User authentication (signup/login) w/ API and fake DB
- GitHub OAuth integration for authentication
- Repository listing under access token gained
- Protected routes under simple login service

Tech Stack
- Backend: Node.js, Express, TypeScript
- Frontend: React, TypeScript, Context-api
- Authentication: GitHub OAuth 

# Comments: 
backend/src/types layer is pretending to act as database. Saving data in memory for demonstration purposes only