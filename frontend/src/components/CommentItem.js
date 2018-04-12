import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { voteCommentTAC, deleteCommentTAC, setEditComment } from '../actions/commentActions';
import { formatDate } from '../utils/helpers';

class CommentItem extends Component {
  upVoteComment = () => {
    const { comment } = this.props;
    this.props.voteCommentTAC(comment.id, "upVote");
  }

  downVoteComment = () => {
    const { comment } = this.props;
    this.props.voteCommentTAC(comment.id, "downVote");
  }

  handleClickEditComment = () => {
    const { comment, setEditComment, onClickEdit } = this.props;
    setEditComment(comment);
    onClickEdit();
  }

  handleClickDeleteComment = () => {
    const { comment } = this.props;
    this.props.deleteCommentTAC(comment.id);
  }

  render() {
    const { comment: { body, voteScore, author, timestamp } } = this.props;

    return (
      <article className="comment">
        <pre className="commentBody">{body}</pre>
        <div className="commentInfo">
          <p className="commentVotes">
            <i className="material-icons" onClick={this.downVoteComment}>arrow_drop_down</i>
            <span className="commentVoteScore">{voteScore}</span>
            <i className="material-icons" onClick={this.upVoteComment}>arrow_drop_up</i>
          </p>
          <span className="commentAuthor">{author}</span>
          <span>{formatDate(timestamp)}</span>
          <div>
            <span className="editComment" onClick={this.handleClickEditComment}>
              Edit
            </span>
            <span className="deleteComment" onClick={this.handleClickDeleteComment}>
              Delete
            </span>
          </div>
        </div>
      </article>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({
    voteCommentTAC,
    deleteCommentTAC,
    setEditComment
  }, dispatch)
});

export default connect(null, mapDispatchToProps)(CommentItem);
