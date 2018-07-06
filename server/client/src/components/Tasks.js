import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchTasks } from '../actions';
import _ from 'lodash';

import MainMenu from './MainMenu';

class Tasks extends Component {
  constructor() {
    super()

    this.state = {
      menuVisible: false,
      currentSelection: {}
    }
  }

  componentDidMount = async () => {
    await this.props.fetchTasks();
  }

  handleMenu = () => {
    if (this.state.menuVisible) {
      return (
        <MainMenu />
      )
    } else {
      return <div></div>;
    }
  }

  toggleMenu = () => {
    this.setState({ menuVisible: !this.state.menuVisible });
  }

  renderTasks = () => {
    if (Array.isArray(this.props.tasks)) {
      return (
        _.map(this.props.tasks, (task) => {
          return (
            <div 
              onClick={(e) => {this.props.history.push(`/tasks/${task._id}`)}}
              key={task._id} 
              className="task-preview">
              <div className="task-details">
                <span className="project-name text-muted">{task.project.name}</span>
                {/* <span className="task-label red">label</span> */}
              </div>
              <div className="task-title">{task.title}<span className="task-id">#101</span></div>
              <div className="task-description-preview">{task.description}</div>
              <div className="task-assignee-status text-muted sm">
                <span className="task-assignee">[aUSER_NAME]</span>
                <span className="task-status">{task.status}</span>
              </div>
            </div>
          )
        })
      );
    } else {
      return <div></div>;
    }
  }

  render() {
    return (
      <div>
        {this.handleMenu()}
        <div className="view" id="project-tasks">

          <div className="project-header wrapper">
            <span
              onClick={this.toggleMenu}
              className="glyphicon glyphicon-menu-hamburger">
              [iMENU]
            </span>

            <h2 className="project-name">[aSELECTED]</h2>
            <span className="glyphicon glyphicon-plus">[iNEW]</span>
          </div>
          {/* <div className="task-preview">
            <div className="task-details">
              <span className="task-name">Features</span>
              <span className="task-label red">label</span>
            </div>

            <div className="task-title">Buy Groceries <span className="task-id">#101</span></div>
            <div className="task-description-preview">Buy fruits, vegetables, crackers, milk. Buy fruits, vegetables, crackers, milk, Buy fruits, vegetables, crackers, milk </div>

          </div> */}
          <ul className="wrapper">
            {this.renderTasks()}
          </ul>


        </div>

      </div>
    );
  }
}

const mapStateToProps = ({ auth, tasks }) => {
  return { auth, tasks };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchTasks }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Tasks);