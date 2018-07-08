import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { deleteProject, fetchProject, fetchTask } from '../actions';

import TaskPreview from './TaskPreview';

class Project extends Component {
  constructor() {
    super()

    this.state = {
      currentProject: {
        name: "Project Name",
        dateCreated: {
          type: Date,
          default: Date.now
        }
      }
    }
  }
  componentDidMount = async () => {
    const { projectId } = this.props.match.params;
    let currentProject = await axios.get(`/api/projects/${projectId}`)
    await this.props.fetchProject(this.props.match.params.projectId);

    this.setState({ currentProject: currentProject.data })
    console.log(this.state)
  }

  handleDeleteClick = () => {
    this.props.deleteProject(this.props.match.params.projectId)
    this.props.history.push('/projects');
  }

  renderTasks = () => {
    const { currentTasks } = this.props;

    if (currentTasks.length > 0) {
      return (
        <ul className="project-tasks">
          {currentTasks.map((task) => {
            return (
              <Link to={`/projects/${task.project}/tasks/${task._id}`} key={task._id}>
                <TaskPreview {...task} project={this.state.currentProject} />
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
    const { currentProject } = this.state;

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
            <i className="material-icons right"
              onClick={this.handleDeleteClick}>delete_outline</i>
          </span>
        </div>
        {this.renderTasks()}
        <Link to={{
          pathname: '/createTask',
          state: { project: currentProject }
        }}>
          <i className="material-icons create-new br">add_circle</i>
        </Link>
      </div>
    )
  }
}

const mapStateToProps = ({ auth, currentProject, currentTasks, userInfo }) => {
  return { auth, currentProject, currentTasks, userInfo };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ deleteProject, fetchProject, fetchTask }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Project);