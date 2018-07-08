import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUser } from '../actions';
import GoogleButton from 'react-google-button'

class Landing extends Component {
  componentDidMount = async () => {
    await this.props.fetchUser();

    // if the user is logged in, redirect to /tasks
    if (this.props.auth) {
      this.props.history.push('/projects');
    }
  }

  render() {
    return (
      <div className="landing cnt">
        <div className="header">
        </div>
        <h1 className="landing-title">Task Manager</h1>
        <GoogleButton className="google-button"
          onClick={() => { this.props.history.push('/auth/google') }}
        />
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchUser }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Landing);