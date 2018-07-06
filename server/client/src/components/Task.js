import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import * as FontAwesome from 'react-icons/lib/fa';
import { deleteTask, fetchProjectNames, fetchTask, updateTask } from '../actions';

class Task extends Component {
  constructor(props) {
    super(props)

    this.state = {
      assignedTo: {
        firstName: "John",
        lastName: "Doe"
      },
      inputDescriptionVisible: false,
      inputTitleVisible: false,
      project: {
        name: "Default",
        _id: "101"
      },
      projectSelectVisible: false,
      status: "Not Started",
      statuses: ['Not started', 'In progress', 'Completed'],
      statusSelectVisible: false,
      task: { title: "", description: "" }
    }
  }

  componentDidMount = () => {
    this.props.fetchTask(this.props.match.params.taskId)
      .then(() => {
        this.setState({ ...this.props.task });
      })
      console.log("state: ", this.state)
      console.log("props: ", this.props)
  }

  deleteTask = () => {
    const { project, _id } = this.state;
    this.props.deleteTask(project._id, _id)
    this.props.history.push(`/projects/${project._id}`);
  }

  handleStatusLinks = () => {
    if (this.state.statusSelectVisible) {
      return (
        <ul className="menu">
          {this.state.statuses.map((status, i) => {
            return (
              <li className={"status " + (status === this.state.status ? "active" : "normal")}
                onClick={() => { this.updateStatus(status) }}
                key={i} >
                {status}
              </li>
            );
          })}
        </ul>
      )
    } else {
      return <div></div>;
    }
  }

  toggleStatusList = () => {
    this.setState({ statusSelectVisible: !this.state.statusSelectVisible })
  }

  updateStatus = async (status) => {
    await this.setState({ status: status });
    this.setState({ statusSelectVisible: !this.state.statusSelectVisible })
    this.updateTask();
  }

  updateTask = () => {
    const { title, description, status, _id } = this.state;
    const updatedTask = { title, description, status };

    axios.put(`/api/tasks/${_id}`, updatedTask);
  }

  render() {
    return (
      <div className="task">
        <div className="task-header header-options">
          <Link className="back text-info" to={`/projects/${this.state.project._id}`} >
          <FontAwesome.FaCaretLeft />{this.state.project.name}
          </Link>
          <span className="text-info fr"
            onClick={this.deleteTask}>
              <FontAwesome.FaTrash />
            </span>
        </div>
        <div className="task-body wrapper">
          <div className="task-details">

          </div>
          <div className="task-title">
            <input type="text"
              onBlur={this.updateTask}
              onChange={e => this.setState({ title: e.target.value })}
              value={this.state.title} />
          </div>
          <div className="task-assignee-status bpb-1">
            <span className="task-assignee text-muted" title="Assign to">
              {this.state.assignedTo.firstName} {this.state.assignedTo.lastName}
            </span>
            <span className="task-status text-info"
              onClick={this.toggleStatusList}
              title="Update status">
              {this.state.status}
            </span>
            <div className="select status-select">
              {this.handleStatusLinks()}
            </div>
          </div>
          <div className="section-label mt-1">Description</div>
          <div className="task-description bpb-1">
            <textarea className="form-control" name="" id=""
              onBlur={this.updateTask}
              onChange={e => this.setState({ description: e.target.value })}
              value={this.state.description}>
            </textarea>
          </div>
          {/* <div className="section-label">Activity</div>
          <ul className="task-activity">
            <li className="task-activity-item">
              [John Doe created new task Buy Groceries in list Features]<br />
              <span className="task-timestamp text-muted sm">[Jun 23 9:05am]</span>
            </li>
            <li className="task-activity-item">
              [John Doe created new task Buy Groceries in list Features]<br />
              <span className="task-timestamp text-muted sm">[Jun 23 9:05am]</span>
            </li>
          </ul> */}
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ currentProject, projects, task }) => {
  return { currentProject, projects, task };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ deleteTask, fetchProjectNames, fetchTask, updateTask }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Task);