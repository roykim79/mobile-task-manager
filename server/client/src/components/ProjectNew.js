import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createProject, fetchProjects } from '../actions';

class MainMenu extends Component {
  constructor() {
    super();

    this.state = {};
  }

  createProject = async (e) => {
    e.preventDefault();
    const { newProjectName } = this.state;
    // check if project name already exists
    const foundProject = this.props.projects.find((project) => {
      return project.name === newProjectName;
    });

    if (!foundProject) {
      const projectName = { name: newProjectName };

      const res = await this.props.createProject(projectName);
      const newProjectId = res.payload.data._id;
      
      this.inputNewProject.value = "";
      this.props.history.push(`/projects/${newProjectId}`);
    } else {
      alert("Duplicate project names are not allowed");
    }
  }

  render() {
    return (
      <div>
        <div className="header rel">
          <Link to='/projects' >
            <i className="material-icons fl">arrow_back_ios</i>
          </Link>
          New Project
        </div>
        <div className="create-new-project wrapper">
          <form
            onSubmit={this.createProject}
            className="wrapper">
            <input required type="text"
              onChange={(e) => { this.setState({ newProjectName: e.target.value }) }}
              ref={el => this.inputNewProject = el}
              placeholder="Project name" />
            <button
              onClick={() => this.props.history.push('/projects')}
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

const mapStateToProps = ({ projects }) => {
  return { projects };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ createProject, fetchProjects }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MainMenu);
