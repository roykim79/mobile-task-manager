import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
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
          <div >
            <h2 className="header">
              Projects
            <Link to='/createProject'>
              <span className="add-project text-info sm fr">
                + Project
              </span>
            </Link>
            </h2>
          </div>

          {this.props.projectNames.map((project) => {
            return (
              <div
                onClick={() => { this.props.history.push(`/projects/${project._id}`) }}
                key={project._id}
                // projectId={project._id}
                className="project-preview">
                <span className="name">{project.name}</span>
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