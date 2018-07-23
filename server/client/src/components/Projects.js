import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchProjects, fetchProjectTasks, setCurrentProject } from '../actions';

class Projects extends Component {
  constructor() {
    super();

    this.state = {
      menuVisible: false
    }
  }
  componentDidMount = () => {
    this.props.fetchProjects();
  }

  handleProjectClick = async (project) => {
    await this.props.fetchProjectTasks(project._id);
    await this.props.setCurrentProject(project._id);
    this.props.history.push(`/projects/${project._id}`);
  }

  render() {
    if (Array.isArray(this.props.projects)) {
      return (
        <div className="projects-list">
          <div className="header rel">
            <i className="material-icons fl"
              onClick={e => this.setState({ menuVisible: !this.state.menuVisible })}>
              menu
            </i>
            Projects
            <Link to='/createProject'>
              <i className="material-icons fr">add_circle_outline</i>
            </Link>

            <ul className={"rel menu " + (this.state.menuVisible ? 'visible' : '')} id="main-menu">
              <li className="user-info sm muted">
                <span>
                  Logged in as {this.props.userInfo.firstName}<br />
                  {this.props.userInfo.email}
                </span>
                <img src={this.props.userInfo.photo} alt="" />
              </li>
              <li className="logout">
                <Link to='/api/logout'>Logout</Link>
              </li>
            </ul>
          </div>

          <div className="rel">
            {this.props.projects.map((project) => {
              return (
                <div
                  onClick={() => this.handleProjectClick(project)}
                  key={project._id}
                  className="project-preview rel">
                  <span className="name">
                    <i className="material-icons muted mr-8">arrow_forward_ios</i>
                    {project.name}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      );
    } else {
      return <div>Opps, something went wrong</div>;
    }
  }
}

const mapStateToProps = ({ auth, projects, userInfo }) => {
  return { auth, projects, userInfo };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchProjects, fetchProjectTasks, setCurrentProject }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Projects);
