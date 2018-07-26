import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createTask } from '../actions';

class TaskNew extends Component {
  constructor() {
    super()

    this.state = {
      project: {
        name: "Select Project"
      }
    }
  }

  componentDidMount = () => {
    const { location, userInfo } = this.props;

    this.setState({ assignedTo: userInfo, project: location.state.project });
  }

  // create a new task and redirect user back to project view
  createTask = (e) => {
    e.preventDefault();
    const { description, project, title, assignedTo } = this.state;
    const newTask = { description, project, title, assignedTo }

    this.props.createTask(newTask, () => {
      this.props.history.push(`/projects/${project._id}`);
    });
  }

  render() {
    return (
      <div className="new-task">
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
            <div className="project-name">
              {this.state.project.name}
            </div>
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

const mapStateToProps = ({ auth, currentProject, userInfo }) => {
  return { auth, currentProject, userInfo };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ createTask }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskNew);
