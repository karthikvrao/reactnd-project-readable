import {
  getAllPostComments, getComment, voteComment,
  createPostComment, editComment, deleteComment,
} from '../utils/api';
import { GET_COMMENTS, GET_COMMENT, UPDATE_COMMENT, SET_EDIT_COMMENT } from './actionTypes';

export const getComments = comments => ({ type: GET_COMMENTS, comments });
export const getSingleComment = comment => ({ type: GET_COMMENT, comment });
export const updateSingleComment = comment => ({ type: UPDATE_COMMENT, comment });
export const setEditComment = comment => ({ type: SET_EDIT_COMMENT, comment });

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
