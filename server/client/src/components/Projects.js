import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { fetchProjects } from '../actions';

class Projects extends Component {
  constructor() {
    super()

    this.state = {
      menuVisible: false
    }
  }
  componentDidMount = () => {
    this.props.fetchProjects();
    console.log(this.props)
  }

  handleProjectClick = (project) => {
    this.props.history.push(`/projects/${project._id}`)
  }

  render() {
    if (Array.isArray(this.props.projects)) {
      return (
        <div className="projects-list">
          <div className="header">
            <i className="material-icons left"
              onClick={e => this.setState({ menuVisible: !this.state.menuVisible })}>menu</i>
            Projects
            <Link to='/createProject'>
              <span className="create-new add-project text-info fr">
                <i className="material-icons">add_circle_outline</i>
              </span>
            </Link>
          </div>

          <div className="rel">
            <div className="abs">
              {this.props.projects.map((project) => {
                return (
                  <div
                    onClick={() => this.handleProjectClick(project)}
                    key={project._id}
                    className="project-preview rel">
                    <span className="name">
                      <i className="material-icons muted left">list_alt</i>
                      {project.name}
                    </span>
                  </div>
                )
              })}
            </div>
            <div className={"mask " + (this.state.menuVisible ? 'visible' : '')}></div>
            <ul className={"menu " + (this.state.menuVisible ? 'visible' : '')} id="main-menu">
              <li className="user-info sm muted rel">
                <span>
                  Logged in as {this.props.userInfo.firstName}<br />
                  {this.props.userInfo.email}
                </span>
                <img src={this.props.userInfo.photo} alt="" />
              </li>
              <li>
                <Link to='/api/logout'>Logout</Link>
              </li>
            </ul>
          </div>

        </div>
      );
    } else {
      return <div></div>;
    }
  }
}

const mapStateToProps = ({ auth, projects, userInfo }) => {
  return { auth, projects, userInfo };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchProjects }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Projects);