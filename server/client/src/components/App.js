import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Landing from './Landing';
import ProjectNew from './ProjectNew';
import TaskNew from './TaskNew';
import Task from './Task';
import Project from './Project';
import OrganizationNew from './OrganizationNew';
import Projects from './Projects';

class App extends Component {
  componentDidMount = async () => {
    await this.props.fetchUser();
    await this.props.fetchUserInfo();


  }
  
  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Route exact path="/" component={Landing} />
            <Route exact path="/createOrganization" component={OrganizationNew} />
            <Route exact path="/createProject" component={ProjectNew} />
            <Route exact path="/projects" component={Projects} />
            <Route path="/createTask" component={TaskNew} />
            <Route exact path="/projects/:projectId" component={Project} />
            <Route path="/projects/:projectId/tasks/:taskId" component={Task} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
};

const mapStateToProps = ({ auth, currentProject, userInfo }) => {
  return { auth, currentProject, userInfo };
}

export default connect(mapStateToProps, actions)(App);