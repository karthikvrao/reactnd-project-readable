import {
  getCategories, getPosts, getSinglePost, getComments,
  getSingleComment, updateSinglePost, updateSingleComment,
} from '../actions';
import {
  getAllCategories, getAllPosts, getCategoryPosts, getPost,
  getAllPostComments, getComment, votePost, voteComment,
  createPostComment, editComment, deleteComment, deletePost,
} from './api';


// Convert array to object with given field's value as key
export const arrToObj = (arr, field) => {
  const newObj = {};
  arr.forEach((item) => {
    newObj[item[field]] = item;
  });
  return newObj;
};


// TACs for Categories
// Thunk action creator to get all categories
export const getCategoriesTAC = () => dispatch =>
  getAllCategories().then(data => dispatch(getCategories(data)));


// TACs for Posts
// Thunk action creator to get all posts
export const getAllPostsTAC = () => dispatch =>
  getAllPosts().then(data => dispatch(getPosts(data)));

// Thunk action creator to get posts of a category
export const getCategoryPostsTAC = category => dispatch =>
  getCategoryPosts(category).then(data => dispatch(getPosts(data)));

// Thunk action creator to get a post with a given Id
export const getPostTAC = postId => dispatch =>
  getPost(postId).then(data => dispatch(getSinglePost(data)));

// Thunk action creator to vote for a post with a given Id and vote option
export const votePostTAC = (postId, option) => dispatch =>
  votePost(postId, option).then(data => dispatch(updateSinglePost(data)));

// Thunk action creator to delete a post with a given Id
export const deletePostTAC = postId => dispatch =>
  deletePost(postId).then(data => dispatch(updateSinglePost(data)));


// TACs for Comments
// Thunk action creator to get all comments of a post with a given Id
export const getPostCommentsTAC = postId => dispatch =>
  getAllPostComments(postId).then(data => dispatch(getComments(data)));

// Thunk action creator to get a comment with a given Id
export const getCommentTAC = commentId => dispatch =>
  getComment(commentId).then(data => dispatch(getSingleComment(data)));

// Thunk action creator to vote for a comment with a given Id and vote option
export const voteCommentTAC = (commentId, option) => dispatch =>
  voteComment(commentId, option).then(data => dispatch(updateSingleComment(data)));

// Thunk action creator to create a new comment
export const createCommentTAC = newComment => dispatch =>
  createPostComment(newComment).then(data => dispatch(updateSingleComment(data)));

export const editCommentTAC = comment => dispatch =>
  editComment(comment).then(data => dispatch(updateSingleComment(data)));

// Thunk action creator to delete a comment with a given Id
export const deleteCommentTAC = commentId => dispatch =>
  deleteComment(commentId).then(data => dispatch(updateSingleComment(data)));
