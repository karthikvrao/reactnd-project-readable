import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setEditComment, editCommentTAC } from '../actions/commentActions';
import GenericModal from './GenericModal';

class EditComment extends Component {
  state = {
    editComment: {},
    errors: {
      body: false
    }
  };

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.setState({ editComment: { ...nextProps.editComment } });
    }
  }

  handleChangeBody = event => {
    const value = event.target.value;
    this.setState(prevState => {
      const newState = { ...prevState };
      newState.editComment.body = value;
      newState.errors.body = value === '' ? true : false;
      return newState;
    });
  }

  handleClickDismiss = () => {
    const { setEditComment, closeModal } = this.props;
    this.setState(prevState => {
      const newState = { ...prevState };
      newState.editComment = {};
      newState.errors = {
        body: false
      }
      return newState;
    });
    setEditComment({});
    closeModal();
  }

  shouldDisableSave = () => {
    const { editComment, errors } = this.state;
    return Object.values(editComment).indexOf('') !== -1 || Object.values(errors).indexOf(true) !== -1;
  }

  handleClickSave = event => {
    const { editComment } = this.state;
    this.props.editCommentTAC(editComment).then(this.handleClickDismiss());
  }

  render() {
    const { isOpen } = this.props;
    const { editComment, errors } = this.state;

    // To avoid crash on 1st render when data is not yet available
    if (Object.keys(editComment).length === 0) {
      return null;
    }

    return (
      <GenericModal isOpen={isOpen}
        onRequestClose={this.handleClickDismiss}>
        <article id="commentModal">
          <h3>Edit Comment</h3>
          <textarea name="commentBody" id="commentBody" cols="0" rows="10"
            value={editComment.body} onChange={this.handleChangeBody} placeholder="Body" />
          {errors.body && <p className="error">Body cannot be empty.</p>}
          <p id="commentAuthor">By: {editComment.author}</p>
          <div id="commentActions">
            <button className="btn-primary" id="dismissComment"
              onClick={this.handleClickDismiss}>
              Dismiss
            </button>
            <button className="btn-primary" id="saveComment"
              disabled={this.shouldDisableSave()}
              onClick={this.handleClickSave}>
              Save
            </button>
          </div>
        </article>
      </GenericModal>
    );
  }
}

const mapStateToProps = ({ editComment }) => ({ editComment });

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({
    editCommentTAC,
    setEditComment
  }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(EditComment);
