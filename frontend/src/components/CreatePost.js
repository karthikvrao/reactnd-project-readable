import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { createPost } from '../utils/api';

class CreatePost extends Component {
  state = {
    newPost: {
      title: '',
      author: '',
      category: '',
      body: ''
    },
    errors: {
      title: false,
      author: false,
      category: false,
      body: false
    },
    redirectToPath: ''
  };

  handleChangeTitle = event => {
    const value = event.target.value;
    this.setState(prevState => {
      const newState = { ...prevState };
      newState.newPost.title = value;
      newState.errors.title = value === '' ? true : false;
      return newState;
    });
  }

  handleChangeAuthor = event => {
    const value = event.target.value;
    this.setState(prevState => {
      const newState = { ...prevState };
      newState.newPost.author = value;
      newState.errors.author = value === '' ? true : false;
      return newState;
    });
  }

  handleChangeCategory = event => {
    const value = event.target.value;
    this.setState(prevState => {
      const newState = { ...prevState };
      newState.newPost.category = value;
      newState.errors.category = value === '' ? true : false;
      return newState;
    });
  }

  handleChangeBody = event => {
    const value = event.target.value;
    this.setState(prevState => {
      const newState = { ...prevState };
      newState.newPost.body = value;
      newState.errors.body = value === '' ? true : false;
      return newState;
    });
  }

  handleClickSave = () => {
    createPost(this.state.newPost)
      .then(data => this.setState({ redirectToPath: `/${data.category}/${data.id}` }))
  }

  render() {
    const { categoryNames } = this.props;
    const { newPost, errors, redirectToPath } = this.state;

    if (redirectToPath) {
      return <Redirect to={redirectToPath} />;
    }

    if (categoryNames === undefined || categoryNames.length === 0) {
      return null;
    }

    return (
      <article id="createPost">
        <div id="postFormRow1">
          <input id="postTitle" type="text" name="Title" value={newPost.title} onChange={this.handleChangeTitle}
            placeholder="Title" />
          <Link to="/" id="dismissPost" className="a-btn btn-primary">Dismiss</Link>
          <button id="savePost" className="btn-primary"
            disabled={Object.values(newPost).indexOf('') !== -1 || Object.values(errors).indexOf(true) !== -1}
            onClick={this.handleClickSave}>
            Save
          </button>
        </div>
        {errors.title && <p className="error">Title cannot be empty.</p>}
        <div id="postFormRow2">
          <input type="text" name="Author" value={newPost.author} onChange={this.handleChangeAuthor} placeholder="Author" />
          {errors.author && <p className="error">Author cannot be empty.</p>}
          <label htmlFor="postCategory">
            Category:
              <select name="postCategory" value={newPost.category} onChange={this.handleChangeCategory}>
              <option value="">---</option>
              {categoryNames.map((category, index) => <option value={category} key={index}>{category}</option>)}
            </select>
          </label>
          {errors.category && <p className="error">A category must be selected.</p>}
          <textarea name="postBody" cols="0" rows="10" value={newPost.body} onChange={this.handleChangeBody} placeholder="Body" />
          {errors.body && <p className="error">Body cannot be empty.</p>}
        </div>
      </article>
    );
  }
}

const mapStateToProps = ({ categories }) => ({ categoryNames: categories.names });

export default connect(mapStateToProps)(CreatePost);
