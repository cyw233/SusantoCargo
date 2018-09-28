import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import SelectListGroup from "../common/SelectListGroup";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { editAck } from "../../actions/shippingActions";
import Spinner from "../common/Spinner";
import $ from "jquery";

class Ack extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "",
      pickuptime: "",
      cost: 0,
      hbl: "",
      errors: {},
      message: "",
      disabled: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.shipping.shipping.ack) {
      const { ack } = this.props.shipping.shipping;
      const cost = this.props.shipping.shipping.number * 35;
      
      // Set component state
      this.setState({
        status: ack.status,
        pickuptime: ack.pickuptime,
        cost: cost,
        hbl: ack.hbl,
        message: ack.message,
      });
    }

  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const reqData = {
      editor: this.props.auth.user.id,
      user: this.props.shipping.shipping.user,
      shipping: this.props.shipping.shipping._id,
      number: this.props.shipping.shipping.number,
      destination: this.props.shipping.shipping.destination,
      origin: this.props.shipping.shipping.origin,
      shipmentinformation: this.props.shipping.shipping.shipmentinformation,
      shippingmessage: this.props.shipping.shipping.message,
      date: this.props.shipping.shipping.date,
      status: this.state.status,
      pickuptime: this.state.pickuptime,
      cost: this.state.cost,
      hbl: this.state.hbl,
      ackmessage: this.state.message
    };

    this.props.editAck(reqData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { shipping, loading } = this.props.shipping;
    const { errors } = this.state;

    // Select options for status
    const options = [
      { label: "To Be Approved", value: "To Be Approved" },
      { label: "Request Accepted", value: "Request Accepted" },
      { label: "Pick-up Scheduled", value: "Pick-up Scheduled" },
      { label: "To be Shipped", value: "To be Shipped" },
      { label: "Shipped", value: "Shipped" },
      { label: "Arrived at Destination", value: "Arrived at Destination" },
      { label: "Delivered", value: "Delivered" },
      { label: "Delivery Delayed", value: "Delivery Delayed" },
    ];

    return (
      <div className="request-form">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to={`/view-status/${shipping._id}`} className="btn btn-info">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Edit the Ack</h1>
              <form onSubmit={this.onSubmit}>
                <h6>Status</h6>
                <SelectListGroup
                  name="status"
                  value={this.state.status}
                  onChange={this.onChange}
                  options={options}
                  error={errors.status}
                />
                <h6>Pick-up Time</h6>
                <TextFieldGroup
                  placeholder="DD/MM/YY"
                  name="pickuptime"
                  value={this.state.pickuptime}
                  onChange={this.onChange}
                  error={errors.pickuptime}
                />
                <h6>Cost</h6>
                <TextFieldGroup
                  type="number"
                  placeholder="Cost"
                  name="cost"
                  value={this.state.cost}
                  onChange={this.onChange}
                  error={errors.cost}
                  disabled
                />
                <h6>HBL Number</h6>
                <TextFieldGroup
                  placeholder="HBL Number"
                  name="hbl"
                  value={this.state.hbl}
                  onChange={this.onChange}  
                  error={errors.hbl}
                />
                <h6>Message (Optional)</h6>
                <TextAreaFieldGroup
                  placeholder="Message (Optional)"
                  name="message"
                  value={this.state.message}
                  onChange={this.onChange}
                  error={errors.message}
                  info="Leave a message here if you want"
                />
                {/* <input type="submit" className="btn btn-info btn-block mt-4" /> */}
                <input type="submit" className="btn btn-info btn-block mt-4" data-toggle="modal" data-target="#sendingModal" />

                {/* <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#sendingModal">
                  Launch demo modal
                </button> */}

                <div className="modal fade" id="sendingModal" tabIndex="-1" role="dialog" aria-labelledby="sendingModalLabel" aria-hidden="true">
                  <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="sendingModalLabel">Sending email to the customer...Please wait</h5>
                        <button type="button" className="close text-white" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div className="modal-body">
                        <Spinner />
                      </div>
                      {/* <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary">Save changes</button>
                      </div> */}
                    </div>
                  </div>
                </div>



              </form>
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
  { editAck }
)(withRouter(Ack));
