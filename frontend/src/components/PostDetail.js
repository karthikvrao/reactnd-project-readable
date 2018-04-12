import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import CommentList from './CommentList';
import { deletePost } from '../utils/api';
import { getPostTAC, getPostCommentsTAC, votePostTAC, formatDate } from '../utils/helpers';
import NoMatch from './NoMatch';

class PostDetail extends Component {
  state = {
    redirectOnDelete: false
  };

  componentDidMount() {
    const { match, getPostTAC } = this.props;
    getPostTAC(match.params.post_id);
  }

  upVotePost = () => {
    const { posts, votePostTAC } = this.props;
    votePostTAC(Object.values(posts)[0].id, "upVote");
  }

  downVotePost = () => {
    const { posts, votePostTAC } = this.props;
    votePostTAC(Object.values(posts)[0].id, "downVote");
  }

  handleClickDelete = () => {
    const { posts } = this.props;
    deletePost(Object.values(posts)[0].id).then(this.setState({ redirectOnDelete: true }));
  }

  render() {
    const { redirectOnDelete } = this.state;
    const { match, posts } = this.props;
    const post = posts[match.params.post_id];

    if (redirectOnDelete) {
      return <Redirect push to="/" />;
    }

    // To avoid crash on 1st render when data is not yet available
    if (!post) {
      return null;
    }

    // Display NoMatch if post is deleted or categpry in path doesn't match post's category
    if (match.params.category !== post.category || post.deleted) {
      return <NoMatch />;
    }

    return (
      <article id="postDetail">
        <header id="postHeader">
          <div className="row1">
            <h3 className="postTitle">{post.title}</h3>
            <Link to={`/${post.category}/${post.id}/edit`} className="a-btn btn-primary" id="editPost">
              Edit
            </Link>
            <button className="btn-danger" id="deletePost" onClick={this.handleClickDelete}>
              Delete
            </button>
          </div>
          <p className="row2">
            <span className="postAuthor">By: {post.author}</span>
            <span>{formatDate(post.timestamp)}</span>
          </p>
          <p className="row3">
            <span className="postCategory">{post.category}</span>
            <i className="material-icons" onClick={this.downVotePost}>arrow_drop_down</i>
            <span className="voteScore">{post.voteScore}</span>
            <i className="material-icons" onClick={this.upVotePost}>arrow_drop_up</i>
          </p>
        </header>
        <section id="postBody">
          <pre>{post.body}</pre>
        </section>
        <footer>
          <CommentList postId={post.id} />
        </footer>
      </article>
    );
  }
}

const mapStateToProps = ({ posts }) => ({ posts });

export default connect(mapStateToProps, { getPostTAC, getPostCommentsTAC, votePostTAC })(PostDetail);
