import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchProject, fetchTask } from '../actions';

class Header extends Component {
  render() {
    const { email, photo, firstName, lastName } = this.props.userInfo;
    return (
      <header className="wrapper">
        <img className="profile-image fr"
          src={photo}
          alt={`Image of ${firstName} ${lastName}`} />
          <div className="user-menu">Logout</div>
      </header>
    );
  }
}

const mapStateToProps = ({ auth, currentProject, userInfo }) => {
  return { auth, currentProject, userInfo };
}

// const mapDispatchToProps = (dispatch) => {
//   return bindActionCreators({ fetchProject, fetchTask }, dispatch);
// }

export default connect(mapStateToProps)(Header);