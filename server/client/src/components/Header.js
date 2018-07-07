import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { photo, firstName, lastName } = this.props.userInfo;
    if (this.props.userInfo) {

      return (
        <header className="wrapper">
          <img className="profile-image fr slide-from-right-short"
            src={photo}
            alt={`${firstName} ${lastName}`} />
            <div className="user-menu">Logout</div>
        </header>
      );
    } else {
      return <div></div>;
    }
  }
}

const mapStateToProps = ({ auth, currentProject, userInfo }) => {
  return { auth, currentProject, userInfo };
}

// const mapDispatchToProps = (dispatch) => {
//   return bindActionCreators({ fetchProject, fetchTask }, dispatch);
// }

export default connect(mapStateToProps)(Header);