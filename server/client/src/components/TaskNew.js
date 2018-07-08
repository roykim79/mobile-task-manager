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
    const { location, userInfo, fetchProjects } = this.props;

    fetchProjects();

    this.setState({ assignedTo: userInfo, project: location.state.project }, () => {
      console.log(this.props);
    })
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

    // send the task to the server, clear the inputs and send user back to the current project's page
    this.props.createTask(newTask)
    this.clearInputs();
    this.props.history.push(`/projects/${project._id}`);
  }

  clearInputs = () => {
    this.inputTitle.value = "";
    this.inputDescription.value = "";
  }

  handleCaret = () => {
    if (this.state.projectSelectVisible) {
      return "arrow_drop_up";
    } else {
      return 'arrow_drop_down'
    }
  }

  // handles the hiding and showing of the project links
  handleProjectLinks = () => {
    if (this.state.projectSelectVisible) {
      return (
        <ProjectLinks
          handleClick={this.changeProject}
          projects={this.props.projects}
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
        <div className="header">
          <Link to={`/projects/${this.state.project._id}`} >
            <i className="material-icons left">arrow_back_ios</i>
          </Link>
          <span>
            New Task
          </span>
          {/* <span className="actions">
            <i className="material-icons action right"
              onClick={this.handleDeleteClick}>delete_outline</i>
          </span> */}
        </div>
        <form className="wrapper"
          onSubmit={this.createTask}
          action="">
          <div className="select select-project-name">
            <div className="project-name action"
              onClick={this.toggleProjectList}>
              {this.state.project.name}
              <i className="material-icons drop-down">{this.handleCaret()}</i>
            </div>
            {this.handleProjectLinks()}
          </div>
          <input required type="text"
            onChange={e => this.setState({ title: e.target.value })}
            ref={el => this.inputTitle = el}
            placeholder="Enter a title" />
          <textarea required type="text" rows="3"
            onChange={e => { this.setState({ description: e.target.value }) }}
            ref={el => this.inputDescription = el}
            placeholder="Enter a description" >
          </textarea>
          <button className="cancel"
            onClick={this.cancelNewTask}>
            Cancel
          </button>
          <span className="create-task">
            <button type="submit" className="action">
              Create task
            </button>
          </span>
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({ auth, projects, userInfo }) => {
  return { auth, projects, userInfo };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ createTask, fetchProjects }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskNew);