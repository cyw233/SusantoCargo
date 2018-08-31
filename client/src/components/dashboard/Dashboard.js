import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCurrentProfile, deleteAccount } from '../../actions/profileActions';
import Spinner from '../common/Spinner';
import ProfileActions from './ProfileActions';
import Experience from './Experience';
import Education from './Education';
import { getCurrentShippings } from '../../actions/shippingActions';

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
    this.props.getCurrentShippings();
  }

  onDeleteClick(e) {
    this.props.deleteAccount();
  }

  render() {
    const { user } = this.props.auth;
    const { shippings } = this.props.shipping;
    const { profile, loading } = this.props.profile;



    const myShippings = shippings.filter(shipping => shipping.user === user.id);
    // let myShippings = [];
    // shippings.map(shipping => (
    //   shipping.user === user.id ? myShippings.push(shipping) : console.log("1")
    // ))

    let displayShippings;
    if (myShippings.length === 0) {
      displayShippings = <p>No shippings</p>
    } else {
      displayShippings = myShippings.map(myShipping => (
        <p>number is: {myShipping.number}  </p>
      ))
    }

    let dashboardContent;
    if (profile === null || loading) {
      dashboardContent = <Spinner />
    } else {
      // If the profile is not null, check if the user's profile is empty
      if (Object.keys(profile).length > 0) {
        // DISPLAY PROFILE
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome <Link to={`/profile/${profile.handle}`}> { user.name }</Link></p>
            <ProfileActions />
            <Experience experience={profile.experience} />
            <Education education={profile.education} />
            <div style={{ marginBottom: '60px' }} />
            <button onClick={this.onDeleteClick.bind(this)} className="btn btn-danger">Delete My Account</button>
          </div>
        );
      } else {
        // User is login but has no profile
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome { user.name }</p>
            <Link to="/update-info" className="btn btn-light">
              <i className="fas fa-user-circle text-info mr-1" /> Update My Personal Info
            </Link>
            <p></p>
            <Link to="/add-shipping" className="btn btn-lg btn-info">
              Add a Shipping
            </Link>
            {displayShippings}
          </div>
        );
      }
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// Dashboard.propTypes = {
//   getCurrentProfile: PropTypes.func.isRequired,
//   deleteAccount: PropTypes.func.isRequired,
//   auth: PropTypes.object.isRequired,
//   profile: PropTypes.object.isRequired
// };

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
  shipping: state.shipping
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount, getCurrentShippings})(Dashboard);
