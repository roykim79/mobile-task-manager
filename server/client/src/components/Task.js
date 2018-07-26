import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// import axios from 'axios';
import { deleteTask, fetchTask, fetchUsers, updateTask } from '../actions';

class Task extends Component {
  constructor(props) {
    super(props)

    this.state = {
      assignedTo: {
        firstName: "",
        lastName: ""
      },
      project: {
        name: "",
        _id: "001"
      },
      status: "Not Started",
      statuses: ['Not started', 'In progress', 'Completed'],
      visibleMenu: ""
    }
  }

  componentDidMount = async () => {
    await this.props.fetchTask(this.props.match.params.taskId);
    await this.props.fetchUsers();
    this.setState({ ...this.props.task });
  }

  deleteTask = () => {
    const { project, _id } = this.state;
    this.props.deleteTask(_id);
    this.props.history.push(`/projects/${project._id}`);
  }

  handleBackClick = async () => {
    const { title, description, status, _id, assignedTo } = this.state;
    const updatedTask = { title, description, status, assignedTo };

    await this.props.updateTask(_id, updatedTask);
    this.props.history.push(`/projects/${this.state.project._id}`);
  }

  handleBodyClick = (e) => {
    if (!e.target.classList.contains('toggles')) {
      this.setState({ visibleMenu: '' })
    }
  }

  handleCaret = (menuName) => {
    if (this.state.visibleMenu === menuName) {
      return 'expand_less';
    } else {
      return 'expand_more';
    }
  }

  renderOptionsLinks = () => {
    if (this.state.visibleMenu === 'options') {
      return (
        <ul className="menu fr">
          <li className="toggles" onClick={this.deleteTask} >
            <i className="material-icons">delete</i>
            Delete Task
          </li>
        </ul>
      )
    } else {
      return <div></div>;
    }
  }

  handleStatusLinks = () => {
    if (this.state.visibleMenu === 'status') {
      return (
        <ul className="menu">
          {this.state.statuses.map((status, i) => {
            return (
              <li className={`status toggles ${status === this.state.status ? "active" : "normal"}`}
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
    if (this.state.visibleMenu === 'user') {
      return (
        <ul className="menu">
          {this.props.users.map((user, i) => {
            return (
              <li className={`status toggles ${user === this.state.assingedTo ? "active" : "normal"}`}
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

  toggleVisibleList = (menuName) => {
    if (this.state.visibleMenu === menuName) {
      this.setState({ visibleMenu: '' });
    } else {
      this.setState({ visibleMenu: menuName });
    }
  }

  updateStatus = (status) => {
    this.setState({ status: status });
    this.toggleVisibleList('status');
  }

  updateUser = (user) => {
    this.setState({ assignedTo: user });
    this.toggleVisibleList('user');
  }

  render() {
    return (
      <div className="task"
        onClick={this.handleBodyClick}>
        <div className="header">
          <span onClick={this.handleBackClick} >
            <i className="material-icons fl">arrow_back_ios</i>
            <span className="ml-20">
              {this.state.project.name}
            </span>
          </span>
          <span className="project-name">
          </span>
          <i className="material-icons toggles action fr"
            onClick={() => this.toggleVisibleList('options')}>
            more_vert
          </i>
        </div>
        {this.renderOptionsLinks()}
        <div className="task-body border">
          <div className="task-title">
            <div className="section-label wrapper">Title</div>
            <div className="wrapper-thin">
              <input type="text"
                onChange={e => this.setState({ title: e.target.value })}
                value={this.state.title} />
            </div>
          </div>
          <div className="task-details">
            <div className="section-label wrapper">Details</div>
            <div className="task-assignee-status rel wrapper">
              <div className="user-select fl">
                <div className="task-assignee toggles action" title="Assign to"
                  onClick={() => this.toggleVisibleList('user')}>
                  <span className="toggles">
                    {this.state.assignedTo.firstName} {this.state.assignedTo.lastName}
                  </span>
                  <i className="material-icons toggles expand-more">{this.handleCaret('user')}</i>
                </div>
                <div className="select">
                  {this.handleUserLinks()}
                </div>
              </div>
              <div className="status-select toggles fr">
                <div className="task-status action"
                  onClick={() => this.toggleVisibleList('status')}
                  title="Update status">
                  <span className="toggles">
                    {this.state.status}
                  </span>
                  <i className="material-icons toggles expand-more">{this.handleCaret('status')}</i>
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
                onChange={e => this.setState({ description: e.target.value })}
                value={this.state.description}>
              </textarea>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ currentProject, projects, task, users }) => {
  return { currentProject, projects, task, users };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ deleteTask, fetchTask, fetchUsers, updateTask }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Task);