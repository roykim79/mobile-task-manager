import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchProjects } from '../actions';

class Projects extends Component {
  constructor() {
    super();

    this.state = {
      menuVisible: false
    }
  }

  componentDidMount = () => {
    if (this.props.userInfo.organization === undefined) {
      this.props.history.push('/createOrganization');
    } else {
      this.props.fetchProjects();
    }
  }

  handleMenu = () => {
    if (this.state.menuVisible) {
      return (
        <ul className="rel menu" id="main-menu">
          <li className="user-info sm muted">
            <span>
              Logged in as {this.props.userInfo.firstName}<br />
              {this.props.userInfo.email}
            </span>
            <img src={this.props.userInfo.photo} />
          </li>
          <li className="logout">
            <Link to='/api/logout'>Logout</Link>
          </li>
        </ul>
      );
    } else {
      return <div></div>;
    }
  }

  renderProjects = () => {
    return (
      <div className="rel">
        {this.props.projects.map((project) => {
          return (
            <div className="project-preview rel" key={project._id}
              onClick={() => this.props.history.push(`/projects/${project._id}`)}>
              <span className="name">
                <i className="material-icons muted mr-8">arrow_forward_ios</i>
                {project.name}
              </span>
            </div>
          );
        })}
      </div>
    );
  }

  render() {
    if (Array.isArray(this.props.projects)) {
      return (
        <div className="projects-list">
          <div className="header rel">
            <i className="material-icons fl"
              onClick={() => this.setState({ menuVisible: !this.state.menuVisible })}>
              menu
            </i>
            Projects
            <Link to='/createProject'>
              <i className="material-icons fr">add_circle_outline</i>
            </Link>
            {this.handleMenu()}
          </div>
          {this.renderProjects()}
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
  return bindActionCreators({ fetchProjects }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Projects);
