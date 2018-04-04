// SORTBY
export const sortByOptions = {
  DATE_NEW_TO_OLD: 'DATE_NEW_TO_OLD',
  DATE_OLD_TO_NEW: 'DATE_OLD_TO_NEW',
  VOTE_LOW_TO_HIGH: 'VOTE_LOW_TO_HIGH',
  VOTE_HIGH_TO_LOW: 'VOTE_HIGH_TO_LOW',
};
export const sortByOptionTexts = {
  DATE_NEW_TO_OLD: 'Newest to oldest',
  DATE_OLD_TO_NEW: 'Oldest to newest',
  VOTE_LOW_TO_HIGH: 'Lowest to highest votes',
  VOTE_HIGH_TO_LOW: 'Highest to lowest votes',
};
export const CHANGE_SORT_BY = 'CHANGE_SORT_BY';

export const changeSortBy = chosenSortBy => ({ type: CHANGE_SORT_BY, chosenSortBy });

// CATEGORIES
export const GET_CATEGORIES = 'GET_CATEGORIES';

export const getCategories = categories => ({ type: GET_CATEGORIES, categories });

// POSTS
export const GET_POSTS = 'GET_POSTS';
export const GET_POST = 'GET_POST';
export const UPDATE_POST = 'UPDATE_POST';

export const getPosts = posts => ({ type: GET_POSTS, posts });
export const getSinglePost = post => ({ type: GET_POST, post });
export const updateSinglePost = post => ({ type: UPDATE_POST, post });


// COMMENTS
export const GET_COMMENTS = 'GET_COMMENTS';
export const GET_COMMENT = 'GET_COMMENT';
export const UPDATE_COMMENT = 'UPDATE_COMMENT';

export const getComments = comments => ({ type: GET_COMMENTS, comments });
export const getSingleComment = comment => ({ type: GET_COMMENT, comment });
export const updateSingleComment = comment => ({ type: UPDATE_COMMENT, comment });
