import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { voteCommentTAC, deleteCommentTAC } from '../utils/helpers';

class CommentItem extends Component {
  upVoteComment = () => {
    const { comment, voteCommentTAC } = this.props;
    voteCommentTAC(comment.id, "upVote");
  }

  downVoteComment = () => {
    const { comment, voteCommentTAC } = this.props;
    voteCommentTAC(comment.id, "downVote");
  }

  handleClickEditComment = () => {
    const { comment } = this.props;
    this.props.onClickEdit(comment);
  }

  handleClickDeleteComment = () => {
    const { comment, deleteCommentTAC } = this.props;
    deleteCommentTAC(comment.id);
  }

  render() {
    const { comment } = this.props;

    return (
      <article className="comment">
        <pre className="commentBody">{comment.body}</pre>
        <div className="commentInfo">
          <p className="commentVotes">
            <i className="material-icons" onClick={this.downVoteComment}>arrow_drop_down</i>
            <span className="commentVoteScore">{comment.voteScore}</span>
            <i className="material-icons" onClick={this.upVoteComment}>arrow_drop_up</i>
          </p>
          <span className="commentAuthor">{comment.author}</span>
          <span>{moment(comment.timestamp).format('MMMM Do YYYY, h:mm:ss a')}</span>
          <div>
            <span id="editComment" onClick={this.handleClickEditComment}>
              Edit
          </span>
            <span id="deleteComment" onClick={this.handleClickDeleteComment}>
              Delete
          </span>
          </div>
        </div>
      </article>
    );
  }
}

export default connect(null, { voteCommentTAC, deleteCommentTAC })(CommentItem);