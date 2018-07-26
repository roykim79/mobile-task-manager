import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { deleteProject, fetchProjectTasks, fetchTask, setCurrentProject } from '../actions';

import TaskPreview from './TaskPreview';

class Project extends Component {
  constructor() {
    super();

    this.state = {
      optionsMenuVisible: false
    }
  }

  componentDidMount = () => {
    const { projectId } = this.props.match.params;

    this.props.fetchProjectTasks(projectId);
    this.props.setCurrentProject(projectId);
  }

  handleDeleteClick = () => {
    const { projectId } = this.props.match.params;

    this.props.deleteProject(projectId);
    this.props.history.push('/projects');
  }

  handleOptionsLinks = () => {
    if (this.state.optionsMenuVisible) {
      return (
        <ul className="menu fr">
          <li className="toggles" onClick={this.handleDeleteClick} >
            <i className="material-icons">delete</i>
            Delete Project
          </li>
        </ul>
      )
    } else {
      return <div></div>;
    }
  }

  renderTasks = () => {
    const { currentTasks } = this.props;

    if (currentTasks.length > 0) {
      return (
        <ul className="project-tasks">
          {currentTasks.map((task) => {
            return (
              <Link to={`/projects/${task.project}/tasks/${task._id}`} key={task._id}>
                <TaskPreview {...task} />
              </Link>
            );
          })}
        </ul>
      );
    } else {
      return (
        <div className="no-tasks muted">
          <div>
            <i className="material-icons">folder_open</i>
          </div>
          <div>
            <span>No tasks found</span>
          </div>
        </div>
      );
    }
  }

  render() {
    const { currentProject } = this.props;

    return (
      <div className="project-view rel">
        <div className="header">
          <Link to='/projects' >
            <i className="material-icons fl">arrow_back_ios</i>
          </Link>
          <span className="project-name">
            {currentProject.name}
          </span>
          <i className="material-icons fr"
            onClick={() => this.setState({ optionsMenuVisible: !this.state.optionsMenuVisible })}>
            more_vert
          </i>
        </div>
        {this.handleOptionsLinks()}
        {this.renderTasks()}
        <Link to={{
          pathname: '/createTask',
          state: { project: currentProject }
        }}>
          <i className="material-icons create-new br">add_circle</i>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = ({ auth, currentProject, currentTasks, userInfo }) => {
  return { auth, currentProject, currentTasks, userInfo };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ deleteProject, fetchProjectTasks, fetchTask, setCurrentProject }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Project);
