import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchProject, fetchProjectNames } from '../actions';

class Projects extends Component {
  componentDidMount = async () => {
    // await this.props.fetchProjectNames();
  }

  render() {
    if (Array.isArray(this.props.projectNames)) {
      return (
        <div className="projects-list">
          <div className="header">
          <i className="material-icons left">menu</i>

            Projects
            <Link to='/createProject'>
              <span className="create-new add-project text-info fr">
                <i className="material-icons">add_circle_outline</i>
              </span>
            </Link>
          </div>

          {this.props.projectNames.map((project) => {
            return (
              <div
                onClick={() => { this.props.history.push(`/projects/${project._id}`) }}
                key={project._id}
                // projectId={project._id}
                className="project-preview rel">
                <span className="name">
                <i className="material-icons muted left">list_alt</i>
                {project.name}
                </span>
              </div>
            )
          })}

        </div>
      );
    } else {
      return <div></div>;
    }
  }
}

const mapStateToProps = ({ auth, projectNames }) => {
  return { auth, projectNames };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchProjectNames, fetchProject }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Projects);