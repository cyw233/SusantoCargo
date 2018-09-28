import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
// import { createProfile, getCurrentProfile } from "../../actions/profileActions";
import { updateInfo } from "../../actions/authActions";
import $ from 'jquery';


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
    
    $('.close').click()
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
              <Link to="/dashboard" className="btn btn-info mb-2">
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
                  info="Please enter your name"
                />

                <TextFieldGroup
                  placeholder="Home Address"
                  name="home"
                  value={this.state.home}
                  onChange={this.onChange}
                  error={errors.home}
                  info="Please enter your home address"
                />

                <TextFieldGroup
                  placeholder="Contact Number"
                  name="contact"
                  value={this.state.contact}
                  onChange={this.onChange}
                  error={errors.contact}
                  info="Please enter your contact number"
                />

                <TextFieldGroup
                  placeholder="Email Address"
                  name="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  error={errors.email}
                  info="Please enter your email address"
                />

                {/* <input
                  type="submit"
                  value="Update"
                  className="btn btn-info btn-block mt-4"
                /> */}
                <button type="button" className="btn btn-info btn-block mt-4" data-toggle="modal" data-target="#exampleModal">
                  Update
                </button>
                <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div className="modal-dialog" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Attention</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div className="modal-body">
                        You will be logged out. Are you sure to continue?
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                        <button type="submit" value="Update" className="btn btn-primary">Continue</button>
                      </div>
                    </div>
                  </div>
                </div>
                <small className="d-block pb-3">* Once update, you will be logged out!</small>
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
