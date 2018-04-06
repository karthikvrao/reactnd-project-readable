import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import { setEditComment } from '../actions';
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
    const { comment, setEditComment, onClickEdit } = this.props;
    setEditComment(comment);
    onClickEdit();
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