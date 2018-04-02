import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPostCommentsTAC } from '../utils/helpers';
import CommentItem from './CommentItem';
import CreateComment from './CreateComment';
import EditComment from './EditComment';


class CommentList extends Component {
  state = {
    openAddCommentModal: false,
    openEditCommentModal: false,
    editComment: {}
  };

  componentDidMount() {
    const { postId, getPostCommentsTAC } = this.props;
    getPostCommentsTAC(postId);
  }

  openAddCommentModal = () => {
    this.setState({ openAddCommentModal: true });
  }

  closeAddCommentModal = () => {
    this.setState({ openAddCommentModal: false });
  }

  openEditCommentModal = (editComment) => {
    this.setState({ openEditCommentModal: true, editComment });
  }

  closeEditCommentModal = () => {
    this.setState({ openEditCommentModal: false });
  }

  render() {
    const { comments, postId } = this.props;
    const { editComment } = this.state;
    const commentList = Object.values(comments).filter(comment => !comment.deleted);

    return (
      <div id="commentList">
        <header id="commentListHeader">
          <p>Comments:</p>
          <span id="commentsCount">{commentList.length}</span>
          <button className="btn-primary" id="addComment" onClick={this.openAddCommentModal}>
            Add
          </button>
        </header>
        {commentList === undefined || commentList.length === 0 ?
          <div className="noCommentsFound"><h4>No comments found</h4></div> :
          <div className="commentListBody">
            {commentList.map(comment => <CommentItem comment={comment} key={comment.id}
              onClickEdit={editComment => this.openEditCommentModal(editComment)} />)}
          </div>
        }
        <CreateComment isOpen={this.state.openAddCommentModal} parentId={postId} closeModal={this.closeAddCommentModal} />
        <EditComment isOpen={this.state.openEditCommentModal} editComment={editComment} closeModal={this.closeEditCommentModal} />
      </div>
    );
  }
}

const mapStateToProps = ({ comments }) => ({ comments });

export default connect(mapStateToProps, { getPostCommentsTAC })(CommentList);
