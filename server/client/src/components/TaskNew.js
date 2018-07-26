import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createTask, fetchProjects } from '../actions';
import ProjectLinks from './ProjectLinks';

class TaskNew extends Component {
  constructor() {
    super()

    this.state = {
      projectSelectVisible: false,
      project: {
        name: "Select Project"
      }
    }
  }

  componentDidMount = () => {
    const { location, userInfo } = this.props;

    this.setState({ assignedTo: userInfo, project: location.state.project });
  }

  // change the value of state.project to be submitted with the form
  changeProject = (project) => {
    this.setState({ project: project });
    this.setState({ projectSelectVisible: !this.state.projectSelectVisible });
  }

  // send the new task to the
  createTask = (e) => {
    e.preventDefault();
    const { description, project, title, assignedTo } = this.state;
    const newTask = { description, project, title, assignedTo }

    // send the task to the server, clear the inputs and send user back to the current project's page
    this.props.createTask(newTask, () => {
      this.props.history.push(`/projects/${project._id}`);
    });
  }

  handleBodyClick = () => {
    if (this.state.projectSelectVisible) {
      this.setState({ projectSelectVisible: false });
    }
  }

  handleCaret = () => {
    if (this.state.projectSelectVisible) {
      return "expand_less";
    } else {
      return 'expand_more';
    }
  }

  // handles the hiding and showing of the project links
  renderProjectLinks = () => {
    if (this.state.projectSelectVisible) {
      return (
        <ProjectLinks
          handleClick={this.changeProject}
          projects={this.props.projects}
          currentSelection={this.props.currentProject} />
      );
    } else {
      return <div></div>;
    }
  }

  toggleProjectList = () => {
    this.setState({ projectSelectVisible: !this.state.projectSelectVisible });
  }

  render() {
    return (
      <div className="new-task"
        onClick={this.handleBodyClick}>
        <div className="header">
          <i className="material-icons fl"
            onClick={this.props.history.goBack}>
            arrow_back_ios
          </i>
          <span>
            New Task
          </span>
        </div>
        <form className="wrapper"
          onSubmit={this.createTask}>
          <div className="select select-project-name mb-8">
            <div className="project-name action"
              onClick={this.toggleProjectList}>
              {this.state.project.name}
              <i className="material-icons expand-more">{this.handleCaret()}</i>
            </div>
            {this.renderProjectLinks()}
          </div>
          <input required type="text"
            onChange={e => this.setState({ title: e.target.value })}
            placeholder="Enter a title" />
          <textarea required type="text" rows="3"
            onChange={e => this.setState({ description: e.target.value })}
            placeholder="Enter a description" >
          </textarea>
          <button className="cancel"
            onClick={this.props.history.goBack}>
            Cancel
          </button>
          <span className="create-task">
            <button type="submit" className="action create">
              Create task
            </button>
          </span>
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({ auth, currentProject, projects, userInfo }) => {
  return { auth, currentProject, projects, userInfo };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ createTask }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskNew);
