import React, { Component } from 'react';
import { connect } from 'react-redux';
import PostList from './PostList';
import { getCategoryPostsTAC } from '../actions/postActions';
import NoMatch from './NoMatch';

class CategoryPosts extends Component {
  componentDidMount() {
    const { match } = this.props;
    this.props.getCategoryPostsTAC(match.params.category);
  }

  componentDidUpdate(prevProps) {
    const { match } = this.props;
    const { match: prevMatch } = prevProps;
    if (prevMatch.params.category !== match.params.category) {
      this.props.getCategoryPostsTAC(match.params.category);
    }
  }
  render() {
    const { match, posts, categories } = this.props;
    const postList = Object.values(posts).filter(post => !post.deleted);

    // Display NoMatch for non-existent category
    if (categories.paths && match.params.category &&
      categories.paths.indexOf(match.params.category) === -1) {
      return <NoMatch />;
    }

    return (
      <PostList category={match.params.category} postList={postList} />
    );
  }
}

const mapStateToProps = ({ posts, categories }) => ({ posts, categories });

export default connect(mapStateToProps, { getCategoryPostsTAC })(CategoryPosts);
