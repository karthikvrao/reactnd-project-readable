import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { votePostTAC, deletePostTAC, formatDate } from '../utils/helpers';

class PostItem extends Component {
  upVotePost = () => {
    const { post, votePostTAC } = this.props;
    votePostTAC(post.id, "upVote");
  }

  downVotePost = () => {
    const { post, votePostTAC } = this.props;
    votePostTAC(post.id, "downVote");
  }

  handleClickDeletePost = () => {
    const { post, deletePostTAC } = this.props;
    deletePostTAC(post.id);
  }

  render() {
    const { post } = this.props;
    return (
      <article className="post">
        <aside className="postStats">
          <p>Votes {post.deleted ? ':deleted:' : ''}</p>
          <p className="postVotes">
            <i className="material-icons" onClick={this.downVotePost}>arrow_drop_down</i>
            <span className="voteScore">{post.voteScore}</span>
            <i className="material-icons" onClick={this.upVotePost}>arrow_drop_up</i>
          </p>
          <p>Comments</p>
          <span>{post.commentCount}</span>
        </aside>
        <div className="postData">
          <h3 className="postTitle"><Link className="postDetail" to={`/${post.category}/${post.id}`}>{post.title}</Link></h3>
          <p className="postBody">{post.body}</p>
          <footer className="postInfo">
            <span className="postCategory">{post.category}</span>
            <span className="postAuthor">By: {post.author}</span>
            <span className="postTimestamp">{formatDate(post.timestamp)}</span>
            <div>
              <span className="editPost">
                <Link to={`/${post.category}/${post.id}/edit`}>Edit</Link>
              </span>
              <span className="deletePost" onClick={this.handleClickDeletePost}>
                Delete
              </span>
            </div>
          </footer>
        </div>
      </article>
    );
  }
}

export default connect(null, { votePostTAC, deletePostTAC })(PostItem);
