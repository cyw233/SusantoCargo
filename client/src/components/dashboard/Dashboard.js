import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getCurrentProfile, deleteAccount } from "../../actions/profileActions";
import Spinner from "../common/Spinner";
import { getCurrentShippings } from "../../actions/shippingActions";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentShippings();
  }

  onDeleteClick(e) {
    this.props.deleteAccount();
  }

  render() {
    const { user } = this.props.auth;
    const { shippings, loading } = this.props.shipping;
    // const { profile, loading } = this.props.profile;

    let displayShippings;
    if (shippings === null || loading) {
      displayShippings = (
        <tr>
          <td>
            <Spinner />
          </td>
        </tr>
      );
    } else {
      let myShippings;
      if (user.id === "5ba1cc421adfe0b2ccf506b5" || user.id === "5ba24066db305ac17c41551d") {
        myShippings = shippings.slice();
      } else {
        myShippings = shippings.filter(
          shipping => shipping.user === user.id
        );
      }

      if (myShippings.length === 0) {
        displayShippings = (
          <tr>
            <td>No shippings</td>
          </tr>
        );
      } else {
        // displayShippings = myShippings.map(myShipping => (
        //   <p key={myShipping._id}>number is: {myShipping.number}  </p>
        // ))
        displayShippings = myShippings.map(myShipping => (
          <tr key={myShipping._id}>
            <td>{myShipping.number}</td>
            <td>{myShipping.origin}</td>
            <td>{myShipping.destination}</td>
            <td>{myShipping.shipmentinformation}</td>
            <td>
              {myShipping.message.length > 10 ? myShipping.message.slice(0, 10) + "..." : myShipping.message}
            </td>
            <td>
              <Link
                to={`/view-status/${myShipping._id}`}
                className="btn btn-info btn-sm"
              >
                View Status
              </Link>
            </td>
          </tr>
        ));
      }
    }

    let dashboardContent;
    if (user.id === "5ba1cc421adfe0b2ccf506b5" || user.id === "5ba24066db305ac17c41551d") {
      dashboardContent = (
        <div className="mb-5 pb-4">
          <p className="lead text-muted">Welcome {user.name}</p>
          <div className="bg-light rounded border border-secondary p-2">
            <h4 className="mt-10 mb-4">All Shipping Bookings</h4>
            <table className="table">
              <thead>
                <tr>
                  <th>Number</th>
                  <th>From</th>
                  <th>To</th>
                  <th>Period</th>
                  <th>Message</th>
                </tr>
                {displayShippings}
              </thead>
            </table>
          </div>
        </div>
      );
    } else {
      dashboardContent = (
        <div className="mb-5 pb-4">
          <p className="lead text-muted">Welcome {user.name}</p>
          <Link to="/update-info" className="btn btn-dark">
            <i className="fas fa-user-circle text-info mr-1" /> Personal Infomation
          </Link>
          {"  "}
          <Link to="/reset-password" className="btn btn-danger">
            <i className="fas fa-key" /> Reset Password
          </Link>
          <hr
            style={{
              height: "1px",
              border: "0",
              backgroundImage:
                "linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0))"
            }}
          />
          <div className="mb-4">
            <Link to="/add-shipping" className="btn btn-lg btn-info">
              Book a Shipping
            </Link>
          </div>
          <div className="bg-light rounded border border-secondary p-2">
            <h4 className="mt-10 mb-4">My Shipping Bookings</h4>
            <table className="table">
              <thead>
                <tr>
                  <th>Number</th>
                  <th>From</th>
                  <th>To</th>
                  <th>Period</th>
                  <th>Message</th>
                </tr>
                {displayShippings}
              </thead>
            </table>
          </div>
        </div>
      );
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
  { deleteAccount, getCurrentShippings }
)(Dashboard);
