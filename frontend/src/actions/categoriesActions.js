import { getAllCategories } from '../utils/api';
import { GET_CATEGORIES } from './actionTypes';

export const getCategories = categories => ({ type: GET_CATEGORIES, categories });

// Thunk action creator to get all categories
export const getCategoriesTAC = () => dispatch =>
  getAllCategories().then(data => dispatch(getCategories(data)));
