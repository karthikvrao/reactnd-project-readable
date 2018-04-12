import {
  getAllPosts, getCategoryPosts, getPost,
  votePost, deletePost,
} from '../utils/api';
import { GET_POSTS, GET_POST, UPDATE_POST } from './actionTypes';

export const getPosts = posts => ({ type: GET_POSTS, posts });
export const getSinglePost = post => ({ type: GET_POST, post });
export const updateSinglePost = post => ({ type: UPDATE_POST, post });

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
