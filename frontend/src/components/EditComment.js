import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editCommentTAC } from '../utils/helpers';
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
    this.setState(prevState => {
      const newState = { ...prevState };
      newState.editComment = {};
      newState.errors = {
        body: false
      }
      return newState;
    });
    this.props.closeModal();
  }

  handleClickSave = event => {
    const { editCommentTAC } = this.props;
    const { editComment } = this.state;
    editCommentTAC(editComment).then(this.handleClickDismiss());
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
          <h3>Comment</h3>
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
              disabled={Object.values(editComment).indexOf('') !== -1 || Object.values(errors).indexOf(true) !== -1}
              onClick={this.handleClickSave}>
              Save
            </button>
          </div>
        </article>
      </GenericModal>
    );
  }
}

export default connect(null, { editCommentTAC })(EditComment);