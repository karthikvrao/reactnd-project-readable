import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createCommentTAC } from '../utils/helpers';
import GenericModal from './GenericModal';


class CreateComment extends Component {
  state = {
    newComment: {
      author: '',
      body: '',
      parentId: '',
    },
    errors: {
      author: false,
      body: false
    }
  };

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {

      this.setState(prevState => {
        const newState = { ...prevState };
        newState.newComment.parentId = nextProps.parentId;
        return newState;
      });
    }
  }

  handleChangeAuthor = event => {
    const value = event.target.value;
    this.setState(prevState => {
      const newState = { ...prevState };
      newState.newComment.author = value;
      newState.errors.author = value === '' ? true : false;
      return newState;
    });
  }

  handleChangeBody = event => {
    const value = event.target.value;
    this.setState(prevState => {
      const newState = { ...prevState };
      newState.newComment.body = value;
      newState.errors.body = value === '' ? true : false;
      return newState;
    });
  }

  handleClickDismiss = () => {
    this.setState(prevState => {
      const newState = { ...prevState };
      newState.newComment = {
        author: '',
        body: '',
        parentId: '',
      };
      newState.errors = {
        author: false,
        body: false
      }
      return newState;
    });
    this.props.closeModal();
  }

  shouldDisableSave = () => {
    const { newComment, errors } = this.state;
    return Object.values(newComment).indexOf('') !== -1 || Object.values(errors).indexOf(true) !== -1;
  }

  handleClickSave = event => {
    const { createCommentTAC } = this.props;
    const { newComment } = this.state;
    createCommentTAC(newComment).then(this.handleClickDismiss());
  }

  render() {
    const { isOpen } = this.props;
    const { newComment, errors } = this.state;

    return (
      <GenericModal isOpen={isOpen}
        onRequestClose={this.handleClickDismiss}>
        <article id="commentModal">
          <h3>Add Comment</h3>
          <textarea name="commentBody" id="commentBody" cols="0" rows="10"
            value={newComment.body} onChange={this.handleChangeBody} placeholder="Body" />
          {errors.body && <p className="error">Body cannot be empty.</p>}
          <input type="text" name="commentAuthor"
            value={newComment.author} onChange={this.handleChangeAuthor} placeholder="Author" />
          {errors.author && <p className="error">Author cannot be empty.</p>}
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

export default connect(null, { createCommentTAC })(CreateComment);