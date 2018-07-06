import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createProject, fetchProjectNames } from '../actions';

class MainMenu extends Component {
  constructor() {
    super()

    this.state = {}
  }
  
  createProject = (e) => {
    e.preventDefault();
    const projectName = { name: this.state.newProjectName };

    this.props.createProject(projectName);
    this.inputNewProject.value = "";
    this.props.history.push('/projects');
  }

  render() {
    return (
      <div className="create-new-project wrapper">
        <form
          onSubmit={this.createProject}
          className="wrapper">
          <label htmlFor="new-project">Add project</label>
          <input
            required
            onChange={(e) => { this.setState({ newProjectName: e.target.value }) }}
            ref={el => this.inputNewProject = el}
            className="form-control" type="text" />
          <button
            onClick={() => this.props.history.push('/projects')}
            className="btn cancel">
            Cancel
          </button>
          <button type="submit" className="btn btn-default">
            Add
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({ projects }) => {
  return { projects };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ createProject, fetchProjectNames }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MainMenu);