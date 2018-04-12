import React, { Component } from 'react';
import { connect } from 'react-redux';
import PostList from './PostList';
import { getAllPostsTAC } from '../actions/postActions';

class AllPosts extends Component {
  componentDidMount() {
    this.props.getAllPostsTAC();
  }

  render() {
    const { posts } = this.props;
    const postList = Object.values(posts).filter(post => !post.deleted);

    return (
      <PostList category="" postList={postList} />
    );
  }
}

const mapStateToProps = ({ posts }) => ({ posts });

export default connect(mapStateToProps, { getAllPostsTAC })(AllPosts);
