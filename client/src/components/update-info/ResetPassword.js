import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { resetPassword } from "../../actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup";

class ResetPassword extends Component {
  constructor() {
    super();
    this.state = {
      password: "",
      password2: "",
      errors: {}
    };

    // if we do not use arrow functions on "onChange()" and "onSubmit()", we need to bind(this)
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {
    // check if the received props is "errors", if so, set the local state "errors" to that "errors"
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    // [e.target.name]: if it is the "name" field, it is "name"; if it is the "email" field, it is "email"
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault(); // since it is a form, we need to prevent its defualt action

    const resetUser = {
      id: this.props.auth.user.id,
      name: this.props.auth.user.name,
      home: this.props.auth.user.home,
      contact: this.props.auth.user.contact,
      email: this.props.auth.user.email,
      password: this.state.password,
      password2: this.state.password2
    };

    console.log(resetUser);
    this.props.resetPassword(resetUser, this.props.history);
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-info">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Reset Password</h1>
              <form noValidate onSubmit={this.onSubmit}>
                <label>New Password</label>
                <TextFieldGroup
                  type="password"
                  placeholder=" New Password"
                  name="password"
                  value={this.state.password}
                  onChange={this.onChange}
                  error={errors.password}
                />

                <label>Confirm New Password</label>
                <TextFieldGroup
                  type="password"
                  placeholder="Confirm Password"
                  name="password2"
                  value={this.state.password2}
                  onChange={this.onChange}
                  error={errors.password2}
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

// Register.propTypes = {
//   registerUser: PropTypes.func.isRequired,
//   auth: PropTypes.object.isRequired,
//   errors: PropTypes.object.isRequired
// };

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

// Because we use "this.props.history", we need to use "withRouter()" 
export default connect(mapStateToProps, { resetPassword })(withRouter(ResetPassword));
