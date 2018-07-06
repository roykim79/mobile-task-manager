import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchUser } from '../actions';

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
      <div>
        <h1 className="landing-title">Trello Mobile</h1>
        <a href="/auth/google">Login with Google</a>
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