import React, { Component } from 'react';
// import PropTypes from "prop-types";
import { connect } from "react-redux";
import RequestForm from './RequestForm';

class Shippings extends Component {

  render() {
    // const { posts, loading } = this.props.post;

    // let postContent;
    // if (posts === null || loading) {
    //   postContent = <Spinner />
    // } else {
    //   postContent = <PostFeed posts={posts} />
    // }
    

    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <RequestForm />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

// Posts.propTypes = {
//   getPosts: PropTypes.func.isRequired,
//   post: PropTypes.object.isRequired
// }

const mapStateToProps = (state) => ({
  auth: state.auth,
  shipping: state.shipping
})

export default connect(mapStateToProps, {})(Shippings);
