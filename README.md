# Mobile Task Manager
A task manager built for teams and designed for mobile.

![Image of OverView](https://github.com/roykim79/mobile-task-manager/blob/master/mtm-overview.png)
![Image of Project](https://github.com/roykim79/mobile-task-manager/blob/master/mtm-projectView.png)
![Image of Task](https://github.com/roykim79/mobile-task-manager/blob/master/mtm-taskView.png)

A live example can be seen at https://mobile-task-manager.herokuapp.com/

## Features
* Create projects to store your tasks 
* Create tasks for each project
* Assign tasks to other team members
* Email notifications are sent to the the assigned user upon creation of each task

### Coming soon....
* Groups
* Invitations to join a group
* Labels

## Usage
To run this program locally you will need to provide you own keys inside of config/dev.js
```javascript
module.exports = {
  googleClientID: '[YOUR_GOOGLE_CLIENT_ID]',
  googleClientSecret: '[YOUR_GOOGLE_CLIENT_SECRET]',
  cookieKey: '[RANDOM_COOKIE_KEY]',
  sendGridKey: '[YOUR_SENDGRID_KEY]',
  mongoURI: 'mongodb://localhost:27017/[YOUR_DATABASE_NAME]'
}
```

From both the server and client folders, run ```npm install``` & ```npm start```.
