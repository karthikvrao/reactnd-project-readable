import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { votePostTAC, deletePostTAC } from '../actions/postActions';
import { formatDate } from '../utils/helpers';

class PostItem extends Component {
  upVotePost = () => {
    const { post } = this.props;
    this.props.votePostTAC(post.id, "upVote");
  }

  downVotePost = () => {
    const { post } = this.props;
    this.props.votePostTAC(post.id, "downVote");
  }

  handleClickDeletePost = () => {
    const { post } = this.props;
    this.props.deletePostTAC(post.id);
  }

  render() {
    const {
      post: { id, category, title, body, voteScore, author, timestamp, commentCount, deleted }
    } = this.props;

    return (
      <article className="post">
        <aside className="postStats">
          <p>Votes {deleted ? ':deleted:' : ''}</p>
          <p className="postVotes">
            <i className="material-icons" onClick={this.downVotePost}>arrow_drop_down</i>
            <span className="voteScore">{voteScore}</span>
            <i className="material-icons" onClick={this.upVotePost}>arrow_drop_up</i>
          </p>
          <p>Comments</p>
          <span>{commentCount}</span>
        </aside>
        <div className="postData">
          <h3 className="postTitle"><Link className="postDetail" to={`/${category}/${id}`}>{title}</Link></h3>
          <p className="postBody">{body}</p>
          <footer className="postInfo">
            <span className="postCategory">{category}</span>
            <span className="postAuthor">By: {author}</span>
            <span className="postTimestamp">{formatDate(timestamp)}</span>
            <div>
              <span className="editPost">
                <Link to={`/${category}/${id}/edit`}>Edit</Link>
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
