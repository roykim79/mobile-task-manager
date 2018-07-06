import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createTask, fetchProjectNames } from '../actions';
import ProjectLinks from './ProjectLinks';

class TaskNew extends Component {
  constructor() {
    super()

    this.state = {
      projectSelectVisible: false,
      project: {
        name: "Select Project",
        dateCreated: {
          type: Date,
          default: Date.now
        },
      }
    }
  }

  componentDidMount = () => {
    const{ currentProject, userInfo } = this.props;
    
    this.setState({project: currentProject, assignedTo: userInfo});
  }

  cancelNewTask = () => {
    this.clearInputs();
    this.props.history.goBack();
  }

  // change the value of state.project to be submitted with the form
  changeProject = (project) => {
    this.setState({ project: project });
    this.setState({ projectSelectVisible: !this.state.projectSelectVisible })
  }

  // send the new task to the 
  createTask = (e) => {
    e.preventDefault();
    const { description, project, title, assignedTo } = this.state;

    // create a new task object
    const newTask = { description, project, title, assignedTo }
    
    this.props.createTask(newTask)
    this.clearInputs();
    this.props.history.push(`/projects/${project._id}`);
  }

  clearInputs = () => {
    this.inputTitle.value = "";
    this.inputDescription.value = "";
  }

  // handles the hiding and showing of the project links
  handleProjectLinks = () => {
    if (this.state.projectSelectVisible) {
      return (
        <ProjectLinks
          handleClick={this.changeProject}
          projects={this.props.projectNames}
          currentSelection={this.state.project} />
      )
    } else {
      return <div></div>;
    }
  }

  toggleProjectList = () => {
    this.setState({ projectSelectVisible: !this.state.projectSelectVisible })
  }

  render() {
    return (
      <div className="new-task">
        <form
          onSubmit={this.createTask}
          action="">
          <div className="select select-project-name">
            <div
              onClick={this.toggleProjectList}
              className="project-name text-info">
              {this.state.project.name}
            </div>
            {this.handleProjectLinks()}
          </div>
          <input
            required
            onChange={e => this.setState({ title: e.target.value})}
            ref={el => this.inputTitle = el}
            type="text"
            className="form-control"
            placeholder="Enter a title" />
          <textarea
            required
            onChange={e => {this.setState({ description: e.target.value})}}
            ref={el => this.inputDescription = el}
            type="text"
            className="form-control"
            placeholder="Enter a description" />
          <button
            onClick={this.cancelNewTask}
            className="btn text-danger cancel">
            Cancel
          </button>
          <span className="create-task">
            <button
              type="submit"
              className="btn btn-default">
              Create task
            </button>
          </span>
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({ auth, projectNames, currentProject, userInfo }) => {
  return { auth, projectNames, currentProject, userInfo };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ createTask, fetchProjectNames }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskNew);