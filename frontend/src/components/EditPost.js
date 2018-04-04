import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { getPostTAC } from '../utils/helpers';
import { editPost } from '../utils/api';
import NoMatch from './NoMatch';

class EditPost extends Component {
  state = {
    editPost: {},
    errors: {
      title: false,
      body: false
    },
    redirectToPath: ''
  };

  componentDidMount() {
    const { match, getPostTAC } = this.props;
    getPostTAC(match.params.post_id);
  }

  componentWillReceiveProps(nextProps) {
    const { posts } = this.props;
    const { posts: nextPosts } = nextProps;

    // Initial loading of post into state
    if (posts !== nextPosts) {
      this.setState({ editPost: { ...Object.values(nextPosts)[0] } });
    }
  }

  handleChangeTitle = event => {
    const value = event.target.value;
    this.setState(prevState => {
      const newState = { ...prevState };
      newState.editPost.title = value;
      newState.errors.title = value === '' ? true : false;
      return newState;
    });
  }

  handleChangeBody = event => {
    const value = event.target.value;
    this.setState(prevState => {
      const newState = { ...prevState };
      newState.editPost.body = value;
      newState.errors.body = value === '' ? true : false;
      return newState;
    });
  }

  handleClickSave = () => {
    editPost(this.state.editPost)
      .then(data => this.setState({ redirectToPath: `/${data.category}/${data.id}` }))
  }


  render() {
    const { editPost, errors, redirectToPath } = this.state;
    const { match } = this.props;


    if (redirectToPath) {
      return <Redirect push to={redirectToPath} />;
    }

    // To avoid crash on 1st render when data is not yet available
    if (Object.keys(editPost).length === 0) {
      return null;
    }

    // Display NoMatch if post is deleted or category in path doesn't match post's category
    if (match.params.category !== editPost.category || editPost.deleted) {
      return <NoMatch />;
    }

    return (
      <article id="createPost">
        <div id="postFormRow1">
          <input id="postTitle" type="text" name="Title" value={editPost.title} onChange={this.handleChangeTitle}
            placeholder="Title" required />
          <Link to={`/${editPost.category}/${editPost.id}`} id="dismissPost" className="a-btn btn-primary">Dismiss</Link>
          <button id="savePost" className="btn-primary"
            disabled={Object.values(editPost).indexOf('') !== -1 || Object.values(errors).indexOf(true) !== -1}
            onClick={this.handleClickSave}>
            Save
          </button>
        </div>
        {errors.title && <p className="error">Title cannot be empty.</p>}
        <div id="postFormRow2">
          <p>By: {editPost.author}</p>
          <label htmlFor="postCategory">
            Category:
            <span name="postCategory" id="postCategory">{editPost.category}</span>
          </label>
          <textarea name="postBody" cols="0" rows="10" value={editPost.body} onChange={this.handleChangeBody} placeholder="Body" required />
          {errors.body && <p className="error">Body cannot be empty.</p>}
        </div>
      </article>
    );
  }
}

const mapStateToProps = ({ posts }) => ({ posts });

export default connect(mapStateToProps, { getPostTAC })(EditPost);
