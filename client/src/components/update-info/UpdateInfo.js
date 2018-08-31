import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
// import { createProfile, getCurrentProfile } from "../../actions/profileActions";
import { updateInfo } from "../../actions/authActions";


class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      home: "",
      contact: "",
      email: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    // this.props.getCurrentProfile();
    const user = this.props.auth.user;
      
    // Set component state
    this.setState({
      name: user.name,
      home: user.home,
      contact: user.contact,
      email: user.email
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    
  }

  onSubmit(e) {
    e.preventDefault();

    const userData = {
      id: this.props.auth.user.id,
      name: this.state.name,
      home: this.state.home,
      contact: this.state.contact,
      email: this.state.email
    };
    this.props.updateInfo(userData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Update My Information</h1>
              <small className="d-block pb-3">All information is required</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="Name"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                  error={errors.name}
                  info="A unique handle for your profile URL. Your full name, company name, nickname"
                />

                <TextFieldGroup
                  placeholder="Home Address"
                  name="home"
                  value={this.state.home}
                  onChange={this.onChange}
                  error={errors.home}
                  info="Your home"
                />

                <TextFieldGroup
                  placeholder="Contact Number"
                  name="contact"
                  value={this.state.contact}
                  onChange={this.onChange}
                  error={errors.contact}
                  info="Could be your own contact or a company one"
                />

                <TextFieldGroup
                  placeholder="Email Address"
                  name="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  error={errors.email}
                  info="City or city & state suggested (eg. Boston, MA)"
                />

                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateProfile.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
  errors: state.errors
});

// Because we use "this.props.history", we need to use "withRouter()"
export default connect(mapStateToProps, { updateInfo })(withRouter(CreateProfile));
