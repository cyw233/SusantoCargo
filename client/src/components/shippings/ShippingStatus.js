import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "../common/Spinner";
// import PropTypes from "prop-types";
import { getOneShipping, createAck } from "../../actions/shippingActions";
import $ from "jquery";

class ShippingStatus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: "",
      destination: "",
      origin: "",
      message: "",
      errors: {},
      shipmentinformation: "",
      disabled: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  componentDidMount() {
    this.props.getOneShipping(this.props.match.params.shippingId);
  }

  onCreateAckClick(id) {
    this.props.createAck(id);
  }

  render() {
    $(".close").click()
    const { shipping, loading } = this.props.shipping;
    const { user } = this.props.auth;
    const { ack } = this.props.shipping.shipping;
    
    let ca;
    let shippingStatus;
    if (user.id === "5ba1cc421adfe0b2ccf506b5") {
      if (!shipping.acked) {
        if (ack === undefined || loading) {
          ca = <Spinner />
        } else {
          ca = (
            <div className="form-row text-center mt-5">
              <div className="col-12">
                <button onClick={this.onCreateAckClick.bind(this, shipping._id)} className="btn btn-primary btn-lg">Create Ack</button>
              </div>
            </div>
          );
        } 
      } else {
        if (ack === undefined || loading) {
          shippingStatus = <Spinner />
        } else {
          shippingStatus = (
            <div className="container">
              <div className="row">
                <div className="col-sm-12">
                  <table className="table table-bordered">
                    <tbody>
                      <tr>
                        <th scope="row">Status</th>
                        <td>{ack.status}</td>
                      </tr>
                      <tr>
                        <th scope="row">Pickup Time</th>
                        <td>{ack.pickuptime}</td>
                      </tr>
                      <tr>
                        <th scope="row">Cost</th>
                        <td>
                          {"$" + shipping.number * 35 + " "}
                          <small className="d-inline">
                            (*$35 for each box)
                          </small>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">HBL Number</th>
                        <td>{ack.hbl}</td>
                      </tr>
                      <tr>
                        <th scope="row">Message</th>
                        <td>{ack.message}</td>
                      </tr>
                    </tbody>
                  </table>
                  <Link to={`/edit-ack/${this.props.shipping.shipping._id}`} className="btn btn-info mb-4">
                    Edit Ack
                  </Link>
                </div>
              </div>
            </div>
          );
        }
      }
    } else {
      if (shipping.acked) {
        if (ack === undefined || loading) {
          shippingStatus = <Spinner />
        } else {
          shippingStatus = (
            <div className="container">
              <div className="row">
                <div className="col-sm-12">
                  <table className="table table-bordered">
                    <tbody>
                      <tr>
                        <th scope="row">Status</th>
                        <td>{ack.status}</td>
                      </tr>
                      <tr>
                        <th scope="row">Pickup Time</th>
                        <td>{ack.pickuptime}</td>
                      </tr>
                      <tr>
                        <th scope="row">Cost</th>
                        <td>
                          {"$" + shipping.number * 35 + " "}
                          <small className="d-inline">
                            (*$35 for each box)
                          </small>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">HBL Number</th>
                        <td>{ack.hbl}</td>
                      </tr>
                      <tr>
                        <th scope="row">Message</th>
                        <td>{ack.message}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          );
        }
      } else {
        if (ack === undefined || loading) {
          shippingStatus = <Spinner />
        } else {
          shippingStatus = <p className="text-center">Sorry, the shipper has not created an Ack to your shipping yet</p>
        }
      }
    }
      

    // let shippingStatus;
    // if (ack == undefined || loading) {
    //   shippingStatus = <Spinner />
    // } else {
    //   shippingStatus = (
    //     <div className="container">
    //       <div className="row">
    //         <div className="col-sm-12">
    //           <table className="table table-bordered">
    //             <tbody>
    //               <tr>
    //                 <th scope="row">Status</th>
    //                 <td>{ack.status}</td>
    //               </tr>
    //               <tr>
    //                 <th scope="row">Pickup Time</th>
    //                 <td>{ack.pickuptime}</td>
    //               </tr>
    //               <tr>
    //                 <th scope="row">Cost</th>
    //                 <td>
    //                   {"$" + shipping.number * 35 + " "}
    //                   <small className="d-inline">
    //                     (*$35 for each box)
    //                   </small>
    //                 </td>
    //               </tr>
    //               <tr>
    //                 <th scope="row">HBL Number</th>
    //                 <td>{ack.hbl}</td>
    //               </tr>
    //               <tr>
    //                 <th scope="row">Message</th>
    //                 <td>{ack.message}</td>
    //               </tr>
    //             </tbody>
    //           </table>
    //         </div>
    //       </div>
    //     </div>
    //   );
    // }
    

    let shippingInfo;
    // let shippingStatus;
    if (shipping == null || loading) {
      shippingInfo = <Spinner />;
    } else {
      shippingInfo = (
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <table className="table table-bordered">
                <tbody>
                  <tr>
                    <th scope="row">Number</th>
                    <td>{shipping.number}</td>
                  </tr>
                  <tr>
                    <th scope="row">From</th>
                    <td>{shipping.origin}</td>
                  </tr>
                  <tr>
                    <th scope="row">To</th>
                    <td>{shipping.destination}</td>
                  </tr>
                  <tr>
                    <th scope="row">Period</th>
                    <td>{shipping.shipmentinformation}</td>
                  </tr>
                  <tr>
                    <th scope="row">Message</th>
                    <td>{shipping.message}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );
      
    }

    return (
      <div className="shipping-status pb-5">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-info mb-4">
                Go Back
              </Link>
              <h3 className="text-center">Shipping Information</h3>
              {shippingInfo}
              <hr style={{height: '1px', border: '0', backgroundImage: 'linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0))'}} />
              <h3 className="text-center">Shipping Ack</h3>
              {ca}
              {shippingStatus}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// AddExperience.propTypes = {
//   addExperience: PropTypes.func.isRequired,
//   profile: PropTypes.object.isRequired,
//   errors: PropTypes.object.isRequired
// };

const mapStateToProps = state => ({
  auth: state.auth,
  shipping: state.shipping,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getOneShipping, createAck }
)(withRouter(ShippingStatus));
