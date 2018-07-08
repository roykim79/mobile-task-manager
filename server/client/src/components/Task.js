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
      return 'expand_less';
    } else {
      return 'expand_more';
    }
  }

  handleUsersCaret = () => {
    if (this.state.userSelectVisible) {
      return 'expand_less';
    } else {
      return 'expand_more';
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
    this.toggleStatusList();
    // this.setState({ statusSelectVisible: !this.state.statusSelectVisible })
    this.updateTask();
  }

  updateTask = () => {
    const { title, description, status, _id, assignedTo } = this.state;
    const updatedTask = { title, description, status, assignedTo };

    axios.put(`/api/tasks/${_id}`, updatedTask);
  }

  updateUser = async (user) => {
    await this.setState({ assignedTo: user });
    this.toggleUserList();
    // this.setState({ userSelectVisible: !this.state.userSelectVisible })
    this.updateTask();
  }

  render() {
    return (
      <div className="task">
        <div className="header">
          <Link to={`/projects/${this.state.project._id}`} >
            <i className="material-icons fl">arrow_back_ios</i>
            <span className="ml-20">
              {this.state.project.name}
            </span>
          </Link>
          <span className="project-name">
          </span>
          <i className="material-icons fr"
            onClick={this.deleteTask}>delete</i>
        </div>

        <div className="task-body border">
          <div className="task-title">
            <div className="section-label wrapper">Title</div>
            <div className="wrapper-thin">
              <input type="text"
                onBlur={this.updateTask}
                onChange={e => this.setState({ title: e.target.value })}
                value={this.state.title} />
            </div>
          </div>

          <div className="task-details">
            <div className="section-label wrapper">Details</div>
            <div className="task-assignee-status rel wrapper">
              <div className="user-select fl">

                <div className="task-assignee action" title="Assign to"
                  onClick={this.toggleUserList}>
                  <span>
                    {this.state.assignedTo.firstName} {this.state.assignedTo.lastName}
                  </span>
                  <i className="material-icons expand-more">{this.handleUsersCaret()}</i>
                </div>

                <div className="select">
                  {this.handleUserLinks()}
                </div>

              </div>

              <div className="status-select fr">

                <div className="task-status action"
                  onClick={this.toggleStatusList}
                  title="Update status">
                  <span>
                    {this.state.status}
                  </span>
                  <i className="material-icons expand-more">{this.handleStatusCaret()}</i>
                </div>

                <div className="select">
                  {this.handleStatusLinks()}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-1 btb">
            <div className="section-label wrapper">Description</div>
            <div className="task-description wrapper-thin">
              <textarea className="form-control" name="" rows="10"
                onBlur={this.updateTask}
                onChange={e => this.setState({ description: e.target.value })}
                value={this.state.description}>
              </textarea>
            </div>
          </div>

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