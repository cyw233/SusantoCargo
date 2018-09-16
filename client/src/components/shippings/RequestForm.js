import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import SelectListGroup from "../common/SelectListGroup";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addShipping } from "../../actions/shippingActions";

class RequestForm extends Component {
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

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const reqData = {
      number: this.state.number,
      destination: this.state.destination,
      origin: this.state.origin,
      message: this.state.message,
      shipmentinformation: this.state.shipmentinformation
    };
    console.log(reqData);

    this.props.addShipping(reqData, this.props.history);
    // this.props.addExperience(reqData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    // Select options for status
    const options = [
      { label: "Departure from Melbourne - Arrival in Jakarta", value: 0 },
      { label: "07/08/2018 - 17/08/2018", value: "07/08/2018 - 17/08/2018" },
      { label: "14/09/2018 - 23/09/2018", value: "14/09/2018 - 23/09/2018" },
      { label: "27/09/2018 - 05/10/2018", value: "27/09/2018 - 05/10/2018" },
      { label: "10/10/2018 - 20/10/2018", value: "10/10/2018 - 20/10/2018" },
    ];

    return (
      <div className="request-form" style={{paddingBottom: '100px'}}>
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-info">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Add a Shipping</h1>
              <p className="lead text-center">
                Add your shipping details below
              </p>
              {/* <small className="d-block pb-3 mb-10">
                * All information is required except for Message
              </small> */}
              <form onSubmit={this.onSubmit}>
                <h6>Number of Boxes</h6>
                <TextFieldGroup
                  type="number"
                  placeholder="Number"
                  name="number"
                  value={this.state.number}
                  onChange={this.onChange}
                  error={errors.number}
                />
                <h6>Destination Address in Jakarta</h6>
                <TextFieldGroup
                  placeholder="Destination"
                  name="destination"
                  value={this.state.destination}
                  onChange={this.onChange}
                  error={errors.destination}
                />
                <h6>Pickup Address in Melbourne</h6>
                <TextFieldGroup
                  placeholder="Pickup Address"
                  name="origin"
                  value={this.state.origin}
                  onChange={this.onChange}
                  error={errors.origin}
                />
                <h6>You can choose a shipment period below</h6>
                <SelectListGroup
                  name="shipmentinformation"
                  value={this.state.shipmentinformation}
                  onChange={this.onChange}
                  options={options}
                  error={errors.shipmentinformation}
                />
                {/* <h6>Departure Date from Melbourne</h6>
                <TextFieldGroup
                  name="departure"
                  type="date"
                  value={this.state.departure}
                  onChange={this.onChange}
                  error={errors.departure}
                />
                <h6>Estimated Arrival Date in Jakarta</h6>
                <TextFieldGroup
                  name="arrival"
                  type="date"
                  value={this.state.arrival}
                  onChange={this.onChange}
                  error={errors.arrival}
                /> */}
                <h6>Message (Optional)</h6>
                <TextAreaFieldGroup
                  placeholder="Message (Optional)"
                  name="message"
                  value={this.state.message}
                  onChange={this.onChange}
                  error={errors.message}
                  info="Leave a message to the shipper here if you want"
                />
                <input type="submit" className="btn btn-info btn-block mt-4" />
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
  shipping: state.shipping,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addShipping }
)(withRouter(RequestForm));
