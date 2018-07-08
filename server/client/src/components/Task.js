import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { deleteTask, fetchTask, fetchUsers, updateTask } from '../actions';

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
      userSelectVisible: false
    }
  }

  componentDidMount = async () => {
    await this.props.fetchTask(this.props.match.params.taskId);
    await this.props.fetchUsers();
    this.setState({ ...this.props.task });
    console.log(this.state)
  }

  deleteTask = () => {
    const { project, _id } = this.state;
    this.props.deleteTask(_id)
    this.props.history.push(`/projects/${project._id}`);
  }

  handleStatusCaret = () => {
    if (this.state.statusSelectVisible) {
      return 'arrow_drop_up';
    } else {
      return 'arrow_drop_down';
    }
  }

  handleUsersCaret = () => {
    if (this.state.userSelectVisible) {
      return 'arrow_drop_up';
    } else {
      return 'arrow_drop_down';
    }
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

  handleUserLinks = () => {
    if (this.state.userSelectVisible) {
      return (
        <ul className="menu">
          {this.props.users.map((user, i) => {
            return (
              <li className={"status " + (user === this.state.assingedTo ? "active" : "normal")}
                onClick={() => { this.updateUser(user) }}
                key={i} >
                {user.firstName} {user.lastName}
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

  toggleUserList = () => {
    this.setState({ userSelectVisible: !this.state.userSelectVisible })
  }

  updateStatus = async (status) => {
    await this.setState({ status: status });
    this.setState({ statusSelectVisible: !this.state.statusSelectVisible })
    this.updateTask();
  }

  updateTask = () => {
    const { title, description, status, _id, assignedTo } = this.state;
    const updatedTask = { title, description, status, assignedTo };

    axios.put(`/api/tasks/${_id}`, updatedTask);
  }

  updateUser = async (user) => {
    await this.setState({ assignedTo: user });
    this.setState({ userSelectVisible: !this.state.userSelectVisible })
    this.updateTask();
  }

  render() {
    return (
      <div className="task">

        <div className="header">
          <Link to={`/projects/${this.state.project._id}`} >
            <i className="material-icons left">arrow_back_ios</i>
            {this.state.project.name}
          </Link>
          <span className="project-name">
          </span>
          <span className="actions">
            <i className="material-icons right"
              onClick={this.deleteTask}>delete_outline</i>
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
            <span className="user-select">
              <span className="task-assignee abs action" title="Assign to"
                onClick={this.toggleUserList}>
                {this.state.assignedTo.firstName} {this.state.assignedTo.lastName}
                <i className="material-icons drop-down">{this.handleUsersCaret()}</i>
              </span>
              <div className="select">
                {this.handleUserLinks()}
              </div>
            </span>

            <span className="task-status action"
              onClick={this.toggleStatusList}
              title="Update status">
              {this.state.status}
              <i className="material-icons drop-down">{this.handleStatusCaret()}</i>
            </span>
            <div className="select status-select">
              {this.handleStatusLinks()}
            </div>

          </div>
          <div className="section-label mt-1">Description</div>
          <div className="task-description bpb-1">
            <textarea className="form-control" name="" rows="5"
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

const mapStateToProps = ({ currentProject, projects, task, users }) => {
  return { currentProject, projects, task, users };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ deleteTask, fetchTask, fetchUsers, updateTask }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Task);