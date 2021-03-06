import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createProject, fetchProjects } from '../actions';

class ProjectNew extends Component {
  constructor() {
    super();

    this.state = {};
  }

  createProject = (e) => {
    e.preventDefault();
    const { newProjectName } = this.state;

    // find project with name equal to the new project name
    const foundProject = this.props.projects.find((project) => {
      return project.name === newProjectName;
    });

    // if no project exists, create a new project and redirect user back to projects view
    // other wise, alert the user that duplicate project names are not allowed
    if (!foundProject) {
      const newProject = { 
        createdBy: this.props.userInfo,
        name: newProjectName,
        organization: this.props.userInfo.organization
      };

      this.props.createProject(newProject, () => {
        this.props.history.push(`/projects/`);
      });
    } else {
      alert("Duplicate project names are not allowed");
    }
  }

  render() {
    return (
      <div>
        <div onClick={this.props.history.goBack}
          className="header rel">
          <i className="material-icons fl">arrow_back_ios</i>
          New Project
        </div>
        <div className="create-new-project wrapper">
          <form onSubmit={this.createProject}
            className="wrapper">
            <input required type="text"
              onChange={e => this.setState({ newProjectName: e.target.value })}
              placeholder="Project name" />
            <button onClick={this.props.history.goBack}
              className="cancel">
              Cancel
            </button>
            <button type="submit" className="action create">
              Create
            </button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ projects, userInfo }) => {
  return { projects, userInfo };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ createProject, fetchProjects }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectNew);
