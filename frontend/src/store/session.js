import { csrfFetch } from './csrf';

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';
const GET_CURRENT_STORY_DATA = 'session/getCurrentStoryData';
const UPDATE_USER_RATING = 'session/updateUserRating';
const ADD_USER_COMMENT_LIKE = 'session/addUserCommentLike';
const REMOVE_USER_COMMENT_LIKE = 'session/removeUserCommentLike';
const UPDATE_USER_BOOKMARK = 'session/updateUserBookmark';

const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
};

const removeUser = () => {
  return {
    type: REMOVE_USER,
  };
};

const getCurrentStoryData = (data) => {
  return {
    type: GET_CURRENT_STORY_DATA,
    payload: data
  };
};

export const updateUserRating = (rating) => {
  return {
    type: UPDATE_USER_RATING,
    payload: rating
  };
};

export const addUserCommentLike = (commentId) => {
  return {
    type: ADD_USER_COMMENT_LIKE,
    payload: commentId
  };
};

export const removeUserCommentLike = (commentId) => {
  return {
    type: REMOVE_USER_COMMENT_LIKE,
    payload: commentId
  };
};

export const updateUserBookmark = (isBookmarked) => {
  return {
    type: UPDATE_USER_BOOKMARK,
    payload: isBookmarked
  };
};

export const login = (user) => async (dispatch) => {
  const { credential, password } = user;
  const response = await csrfFetch('/api/session', {
    method: 'POST',
    body: JSON.stringify({
      credential,
      password,
    }),
  });
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};

export const demoLogin = () => async (dispatch) => {
  const response = await csrfFetch('/api/session/demo-login', {
    method: 'POST'
  });
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};

export const restoreUser = () => async dispatch => {
  const response = await csrfFetch('/api/session');
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};

export const signup = (user) => async (dispatch) => {
  const { username, email, password } = user;
  const response = await csrfFetch("/api/users", {
    method: "POST",
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  });
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};

export const logout = () => async (dispatch) => {
  const response = await csrfFetch('/api/session', {
    method: 'DELETE',
  });
  dispatch(removeUser());
  return response;
};

export const fetchCurrentStoryData = (storyId) => async (dispatch) => {
  const response = await csrfFetch(`/api/session/story/${storyId}`);
  const data = await response.json();
  dispatch(getCurrentStoryData(data));
  return response;
};

const initialState = {
  user: null,
  currentStoryRating: null,
  currentStoryCommentLikes: null,
  currentStoryBookmarked: false
};

const sessionReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_USER:
      newState = Object.assign({}, state);
      newState.user = action.payload;
      return newState;
    case REMOVE_USER:
      newState = Object.assign({}, state);
      newState.user = null;
      return newState;
    case GET_CURRENT_STORY_DATA:
      newState = Object.assign({}, state);
      newState.currentStoryRating = action.payload.rating;
      newState.currentStoryCommentLikes = action.payload.userCommentLikes.map((obj) => obj.commentId);
      newState.currentStoryBookmarked = action.payload.isBookmarked;
      return newState;
    case UPDATE_USER_RATING:
      newState = Object.assign({}, state);
      newState.currentStoryRating = action.payload;
      return newState;
    case ADD_USER_COMMENT_LIKE:
      newState = Object.assign({}, state);
      newState.currentStoryCommentLikes = [...state.currentStoryCommentLikes, action.payload];
      return newState;
    case REMOVE_USER_COMMENT_LIKE:
      newState = Object.assign({}, state);
      newState.currentStoryCommentLikes = state.currentStoryCommentLikes.filter((commentId) => commentId !== action.payload);
      return newState;
    case UPDATE_USER_BOOKMARK:
      newState = Object.assign({}, state);
      newState.currentStoryBookmarked = action.payload;
      return newState;
    default:
      return state;
  }
};

export default sessionReducer;
