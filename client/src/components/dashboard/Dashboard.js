import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getCurrentProfile, deleteAccount } from "../../actions/profileActions";
import Spinner from "../common/Spinner";
import ProfileActions from "./ProfileActions";
import Experience from "./Experience";
import Education from "./Education";
import { getCurrentShippings } from "../../actions/shippingActions";

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

    let displayShippings;
    if (shippings === null || loading) {
      displayShippings = <Spinner />;
    } else {
      const myShippings = shippings.filter(
        shipping => shipping.user === user.id
      );
      if (myShippings.length === 0) {
        displayShippings = (
          <p>No shippings</p>
        );
      } else {
        // displayShippings = myShippings.map(myShipping => (
        //   <p key={myShipping._id}>number is: {myShipping.number}  </p>
        // ))
        displayShippings = myShippings.map(myShipping => (
          <table key={myShipping._id} className="table">
            <thead>
              <tr>
                <th>Number</th>
                <th>From</th>
                <th>To</th>
                <th>Period</th>
                <th>Message</th>
              </tr>
              <tr>
                <td>{myShipping.number}</td>
                <td>{myShipping.origin}</td>
                <td>{myShipping.destination}</td>
                <td>{myShipping.shipmentinformation}</td>
                <td>{myShipping.message.slice(0, 10) + "..."}</td>
                <td>
                  <Link
                    to={`/view-status/${myShipping._id}`}
                    className="btn btn-info btn-sm"
                  >
                    View Status
                  </Link>
                </td>
              </tr>
            </thead>
          </table>
        ));
      }
    }

    let dashboardContent;
    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      // If the profile is not null, check if the user's profile is empty
      if (Object.keys(profile).length > 0) {
        // DISPLAY PROFILE
        dashboardContent = (
          <div>
            <p className="lead text-muted">
              Welcome{" "}
              <Link to={`/profile/${profile.handle}`}> {user.name}</Link>
            </p>
            <ProfileActions />
            <Experience experience={profile.experience} />
            <Education education={profile.education} />
            <div style={{ marginBottom: "60px" }} />
            <button
              onClick={this.onDeleteClick.bind(this)}
              className="btn btn-danger"
            >
              Delete My Account
            </button>
          </div>
        );
      } else {
        // User is login but has no profile
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome {user.name}</p>
            <Link to="/update-info" className="btn btn-light">
              <i className="fas fa-user-circle text-info mr-1" /> Update My
              Personal Info
            </Link>
            <hr />
            <div className="mb-4">
              <Link to="/add-shipping" className="btn btn-lg btn-info">
                Add a Shipping
              </Link>
            </div>
            <div className="bg-light rounded border border-secondary p-2">
              <h4 className="mt-10 mb-4">My Shipping Bookings</h4>
              {displayShippings}
            </div>
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

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth,
  shipping: state.shipping
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteAccount, getCurrentShippings }
)(Dashboard);
