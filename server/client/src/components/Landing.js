import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';
import { fetchUser } from '../actions';

class Landing extends Component {
  componentDidMount = async () => {
    await this.props.fetchUser();

    // if the user is logged in, redirect to /tasks
    if (this.props.auth) {
      this.props.history.push('/projects');
    }
  }

  submitLogin = async () => {
    let res = await axios.get('/auth/google');

    if (res) {
      this.props.history.push('/projects');
    }
  }

  render() {
    return (
      <div className="landing cnt">
        <div className="header">
        </div>
        <h1 className="landing-title">Task Manager</h1>
        <a className="login" href="/auth/google">Google login</a>
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