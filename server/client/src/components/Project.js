import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchProject, fetchTask } from '../actions';

import TaskPreview from './TaskPreview';

class Project extends Component {
  componentDidMount = async () => {
    await this.props.fetchProject(this.props.match.params.projectId);
  }

  render() {
    const { currentProject } = this.props;

    if (currentProject.tasks) {
      return (
        <div className="project-view rel">
          <div className="header">
            <Link to='/projects' >
              <i className="material-icons left">arrow_back_ios</i>
            </Link>
            <span className="project-name">
              {currentProject.name}
            </span>
            <span className="actions">
              <i className="material-icons action right">delete_outline</i>
            </span>
          </div>
          <ul className="project-tasks">
            {currentProject.tasks.map((task) => {
              return (
                <Link to={`/projects/${task.project}/tasks/${task._id}`} key={task._id}>
                  <TaskPreview {...task} assignee={this.props.userInfo} />
                </Link>
              );
            })}
          </ul>
          <Link to={{
            pathname: '/createTask',
            state: { project: currentProject }
          }}>
            <i className="material-icons create-new br">add_circle</i>
          </Link>
        </div>
      )
    } else {
      return (
        <div>No Project Component</div>
      );
    }
  }
}

const mapStateToProps = ({ auth, currentProject, userInfo }) => {
  return { auth, currentProject, userInfo };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchProject, fetchTask }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Project);