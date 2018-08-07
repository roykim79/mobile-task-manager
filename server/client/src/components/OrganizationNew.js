import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchUserInfo } from '../actions';

class OrganizationNew extends Component {
  constructor() {
    super();

    this.state = {};
  }

  componentDidMount = async () => {
    await this.props.fetchUserInfo();

    this.setState({createdBy: this.props.userInfo})
  }

  createOrganization = () => {
    //////////////////////////////////////////
  }

  render() {
    return (
      <div>
        <div className="header wrapper">
          NewOrg
        </div>
        <form className="wrapper" onSubmit={this.createOrganization}>
          <input required type="text" 
            onChange={(e) => this.setState({newOrgName: e.target.value})}
            placeholder="Organization Name"/>
        </form>
      </div>
    );
  }
}


const mapStateToProps = ({ userInfo }) => {
  return { userInfo };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchUserInfo }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(OrganizationNew);