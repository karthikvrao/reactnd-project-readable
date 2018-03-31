import uuidv4 from 'uuid/v4';

const apiServer = 'http://localhost:3001';

const headers = {
  Accept: 'application/json',
  Authorization: 'something',
};

const contentTypeJson = {
  'Content-Type': 'application/json',
};

// CATEGORIES
// GET Requests
export const getAllCategories = () =>
  fetch(`${apiServer}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories);


// POSTS
// GET Requests
export const getAllPosts = () =>
  fetch(`${apiServer}/posts`, { headers }).then((res) => {
    return res.json();
  });

export const getCategoryPosts = category =>
  fetch(`${apiServer}/${category}/posts`, { headers }).then(res => res.json());

export const getPost = postId =>
  fetch(`${apiServer}/posts/${postId}`, { headers }).then(res => res.json());

// POST Requests
export const createPost = (newPost) => {
  const body = JSON.stringify({
    id: uuidv4(),
    timestamp: Date.now(),
    title: newPost.title,
    body: newPost.body,
    author: newPost.author,
    category: newPost.category,
  });
  return fetch(`${apiServer}/posts`, {
    method: 'POST',
    headers: { ...headers, ...contentTypeJson },
    body,
  }).then(res => res.json());
};

export const votePost = (postId, option) => {
  const body = JSON.stringify({ option });
  return fetch(`${apiServer}/posts/${postId}`, {
    method: 'POST',
    headers: { ...headers, ...contentTypeJson },
    body,
  }).then(res => res.json());
};

// PUT Requests
export const editPost = (post) => {
  const body = JSON.stringify({
    id: post.id,
    title: post.title,
    body: post.body,
  });
  return fetch(`${apiServer}/posts/${post.id}`, {
    method: 'PUT',
    headers: { ...headers, ...contentTypeJson },
    body,
  }).then(res => res.json());
};

// DELETE Requests
export const deletePost = postId =>
  fetch(`${apiServer}/posts/${postId}`, {
    method: 'DELETE',
    headers,
  }).then(res => res.json());


// COMMENTS
// GET Requests
export const getAllPostComments = postId =>
  fetch(`${apiServer}/posts/${postId}/comments`, { headers }).then(res => res.json());

export const getComment = commentId =>
  fetch(`${apiServer}/comments/${commentId}`, { headers }).then(res => res.json());

// POST Requests
export const createPostComment = (newComment) => {
  const body = JSON.stringify({
    id: uuidv4(),
    timestamp: Date.now(),
    body: newComment.body,
    author: newComment.author,
    parentId: newComment.parentId,
  });
  return fetch(`${apiServer}/comments/`, {
    method: 'POST',
    headers: { ...headers, ...contentTypeJson },
    body,
  }).then(res => res.json());
};

export const voteComment = (commentId, option) => {
  const body = JSON.stringify({ option });
  return fetch(`${apiServer}/comments/${commentId}`, {
    method: 'POST',
    headers: { ...headers, ...contentTypeJson },
    body,
  }).then(res => res.json());
};

// PUT Requests
export const editComment = (comment) => {
  const body = JSON.stringify({
    timestamp: Date.now(),
    body: comment.body,
  });
  return fetch(`${apiServer}/comments/${comment.id}`, {
    method: 'PUT',
    headers: { ...headers, ...contentTypeJson },
    body,
  }).then(res => res.json());
};

// DELETE Requests
export const deleteComment = commentId =>
  fetch(`${apiServer}/comments/${commentId}`, {
    method: 'DELETE',
    headers,
  }).then(res => res.json());
