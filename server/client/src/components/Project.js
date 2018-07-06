import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchProject, fetchTask } from '../actions';
import * as FontAwesome from 'react-icons/lib/fa';
import AlertIcon from 'mdi-react/AlertIcon';
import AlertCircleIcon from 'mdi-react/AlertCircleIcon';

import TaskPreview from './TaskPreview';

class Project extends Component {
  componentDidMount = async () => {
    await this.props.fetchProject(this.props.match.params.projectId);
  }

  render() {
    console.log(this.props)
    const { currentProject } = this.props;

    if (currentProject.tasks) {
      return (
        <div className="project-view">
          <div className="header">
            <div className="header-options wrapper">
              <Link className="back text-info" to='/projects' >
              
                <span><FontAwesome.FaCaretLeft />Projects</span>
              </Link>
              
              {/* <span className="name"></span> */}
              <Link className="create-new-task"
                to={{
                  pathname: '/createTask',
                  state: { project: currentProject }
                }}>
                 <span className="text-info"><FontAwesome.FaPlus /></span>   
              </Link>
            </div>
            <div className="wrapper sub-header">
                <span className="project-name">
                <AlertIcon color="#000" />
                  {currentProject.name}
                </span>
                <span className="text-info actions fr">
                  <FontAwesome.FaEllipsisV />
                  <div className="menu">
                    <div className="action">Delete Project</div>
                  </div>
                </span>
            </div>
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
        </div>
      )
    } else {
      return (
        <div>No Project Component</div>
      );
    }
  }
}

const mapStateToProps = ({ auth, currentProject ,userInfo }) => {
  return { auth, currentProject, userInfo };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchProject, fetchTask }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Project);