import { csrfFetch } from './csrf';

const SET_STORIES = "stories/get";
const ADD_STORY = "stories/add";

// Actions
// export to use globally to components (to trigger actions)
export const setStories = (stories) => {
  return {
    type: SET_STORIES,
    payload: stories
  }
}

export const addStory = (story) => {
  return {
    type: ADD_STORY,
    payload: story
  }
}

// Thunks (Async Actions)
// Thunk middleware = dispatch
export const getStories = () => async dispatch => {
  const response = await csrfFetch('/api/stories');
  if (!response.ok) {
    throw response;
  }
  const stories = await response.json();
  dispatch(setStories(stories));
};

const initialState = {};

// Reducer
// normalizing state happens in Reducer
const storyReducer = (stories = initialState, action) => {
  switch (action.type) {
    case SET_STORIES:
      const storiesPayload = action.payload;
      // return stories.reduce((newStories, story) => {
      //   return {
      //     ...newStories,
      //     [story.id]: story
      //   }
      // }, {});

      const newStories = {};
      for (const story of storiesPayload) {
        newStories[story.id] = story;
      }
      return newStories;
    case ADD_STORY:
      return
    default:
      return stories;
  }
};

export default storyReducer;
