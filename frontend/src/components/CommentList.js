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
  };

  componentDidMount() {
    const { postId, getPostCommentsTAC } = this.props;
    getPostCommentsTAC(postId);
  }

  toggleAddCommentModal = () => {
    this.setState({ openAddCommentModal: !this.state.openAddCommentModal });
  }

  toggleEditCommentModal = () => {
    this.setState({ openEditCommentModal: !this.state.openEditCommentModal });
  }

  render() {
    const { comments, postId } = this.props;
    const { openAddCommentModal, openEditCommentModal } = this.state;
    const commentList = Object.values(comments).filter(comment => !comment.deleted);

    return (
      <div id="commentList">
        <header id="commentListHeader">
          <p>Comments:</p>
          <span id="commentsCount">{commentList.length}</span>
          <button className="btn-primary" id="addComment" onClick={this.toggleAddCommentModal}>
            Add
          </button>
        </header>
        {commentList === undefined || commentList.length === 0 ?
          <div className="noCommentsFound"><h4>No comments found</h4></div> :
          <div className="commentListBody">
            {commentList.map(comment => <CommentItem comment={comment} key={comment.id}
              onClickEdit={this.toggleEditCommentModal} />)}
          </div>
        }
        <CreateComment isOpen={openAddCommentModal} parentId={postId} closeModal={this.toggleAddCommentModal} />
        <EditComment isOpen={openEditCommentModal} closeModal={this.toggleEditCommentModal} />
      </div>
    );
  }
}

const mapStateToProps = ({ comments }) => ({ comments });

export default connect(mapStateToProps, { getPostCommentsTAC })(CommentList);
