import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import PostForm from '../posts/PostForm'; // Form we can type in and submit
import Spinner from '../common/Spinner';
import RequestForm from './RequestForm';

class Shippings extends Component {
  componentDidMount() {
  }

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
              {/* <PostForm /> */}
              <RequestForm />
              {/* {postContent} */}
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
