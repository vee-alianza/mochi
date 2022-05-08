import { csrfFetch } from './csrf';

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';
const GET_USER_RATING = 'session/getUserRating';
const UPDATE_USER_RATING = 'session/updateUserRating';

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

const getUserRating = (rating) => {
  return {
    type: GET_USER_RATING,
    payload: rating
  };
};

export const updateUserRating = (rating) => {
  return {
    type: UPDATE_USER_RATING,
    payload: rating
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

export const fetchUserRating = (storyId) => async (dispatch) => {
  const response = await csrfFetch(`/api/session/story/${storyId}/rating`);
  const data = await response.json();
  dispatch(getUserRating(data.rating));
  return response;
};

const initialState = { user: null, currentStoryRating: null };

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
    case GET_USER_RATING:
      newState = Object.assign({}, state);
      newState.currentStoryRating = action.payload;

      return newState;
    case UPDATE_USER_RATING:
      newState = Object.assign({}, state);
      newState.currentStoryRating = action.payload;

      return newState;
    default:
      return state;
  }
};

export default sessionReducer;
