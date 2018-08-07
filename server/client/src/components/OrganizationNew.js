import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createOrganization, fetchUserInfo } from '../actions';

class OrganizationNew extends Component {
  constructor() {
    super();

    this.state = {};
  }

  componentDidMount = async () => {
    await this.props.fetchUserInfo();

    this.setState({createdBy: this.props.userInfo})
  }

  handleFormSubmit = (e) => {
    e.preventDefault();
    const { newOrgName } = this.state;
    const { createOrganization, userInfo } = this.props;

    const newOrg = {
      name: newOrgName,
      createdBy: userInfo
    };

    createOrganization(newOrg, () => {
      this.props.history.push(`/projects/`);
    })
  }

  render() {
    return (
      <div>
        <div className="header wrapper">
          NewOrg
        </div>
        <form className="wrapper" onSubmit={this.handleFormSubmit}>
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
  return bindActionCreators({ createOrganization, fetchUserInfo }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(OrganizationNew);