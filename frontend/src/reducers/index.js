import { combineReducers } from 'redux';
import {
  sortByOptions, CHANGE_SORT_BY, GET_CATEGORIES,
  GET_POSTS, GET_POST, GET_COMMENTS, GET_COMMENT,
  UPDATE_POST, UPDATE_COMMENT, SET_EDIT_COMMENT,
} from '../actions/actionTypes';
import { arrToObj } from '../utils/helpers';


const chosenSortBy = (state = sortByOptions.DATE_NEW_TO_OLD, action) => {
  const { chosenSortBy: chosenSortByOption } = action;
  switch (action.type) {
    case CHANGE_SORT_BY:
      return chosenSortByOption;
    default:
      return state;
  }
};

const categories = (state = {}, action) => {
  const { categories: categoryList } = action;
  switch (action.type) {
    case GET_CATEGORIES:
      return {
        byPath: arrToObj(categoryList, 'path'),
        names: categoryList.map(cat => cat.name),
        paths: categoryList.map(cat => cat.path),
      };
    default:
      return state;
  }
};

const posts = (state = {}, action) => {
  const { posts: postList, post } = action;
  switch (action.type) {
    case GET_POSTS:
      return arrToObj(postList, 'id');
    case GET_POST:
      return { [post.id]: post };
    case UPDATE_POST:
      return { ...state, [post.id]: post };
    default:
      return state;
  }
};

const comments = (state = {}, action) => {
  const { comments: commentList, comment } = action;
  switch (action.type) {
    case GET_COMMENTS:
      return arrToObj(commentList, 'id');
    case GET_COMMENT:
      return { [comment.id]: comment };
    case UPDATE_COMMENT:
      return { ...state, [comment.id]: comment };
    default:
      return state;
  }
};

const editComment = (state = {}, action) => {
  const { comment } = action;
  switch (action.type) {
    case SET_EDIT_COMMENT:
      return comment;
    default:
      return state;
  }
}

export default combineReducers({
  chosenSortBy, categories, posts, comments, editComment,
});
