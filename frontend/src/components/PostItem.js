import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { votePostTAC } from '../utils/helpers';

class PostItem extends Component {
  upVotePost = () => {
    const { post, votePostTAC } = this.props;
    votePostTAC(post.id, "upVote");
  }

  downVotePost = () => {
    const { post, votePostTAC } = this.props;
    votePostTAC(post.id, "downVote");
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
        <Link className="postData" to={`/${post.category}/${post.id}`}>
          <h3 className="postTitle">{post.title}</h3>
          <p className="postBody">{post.body}</p>
          <footer className="postInfo">
            <span className="postCategory">{post.category}</span>
            <span className="postAuthor">By: {post.author}</span>
            <span className="postTimestamp">{moment(post.timestamp).format('MMMM Do YYYY, h:mm:ss a')}</span>
          </footer>
        </Link>
      </article>
    );
  }
}

export default connect(null, { votePostTAC })(PostItem);
