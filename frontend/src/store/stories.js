import { csrfFetch } from './csrf';

const CREATE_STORY = "story/create";
const VIEW_STORY = "story/view";
const UPDATE_STORY = "story/edit";
const REMOVE_STORY = "stories/remove";
const SET_STORIES = "stories/set";
const GET_CATEGORIES = "categories/get";
const CLEAR_CATEGORY = "category/clear";


// Actions
// export to use globally to components (to trigger actions)
const createStory = (story) => {
  return {
    type: CREATE_STORY,
    payload: story
  };
};
const viewStory = (story) => {
  return {
    type: VIEW_STORY,
    payload: story
  };
};
const updateStory = (story) => {
  return {
    type: UPDATE_STORY,
    payload: story
  };
};
const removeStory = (id) => {
  return {
    type: REMOVE_STORY,
    payload: id
  };
};
const setStory = (stories) => {
  return {
    type: SET_STORIES,
    payload: stories
  };
};

const allCategories = (categories) => {
  return {
    type: GET_CATEGORIES,
    payload: categories
  };
};

export const clearCategory = () => {
  return {
    type: CLEAR_CATEGORY,
  }
}

// Thunks (Async Actions)
// Thunk middleware = dispatch
export const getStories = () => async dispatch => {
  // console.log("------getStories thunk------")
  const response = await csrfFetch('/api/stories');
  // console.log("INFILTRATED BACKEND")
  if (response.ok) {
    const data = await response.json();
    dispatch(setStory(data.stories));
  }
};

export const readStory = (id) => async dispatch => {
  const response = await csrfFetch(`/api/stories/${id}`);
  if (response.ok) {
    const data = await response.json();
    // console.log(data);
    dispatch(viewStory(data.story));
  }
}

export const newStory = (story) => async dispatch => {
  const response = await csrfFetch('/api/stories/new', {
    method: 'POST',
    body: JSON.stringify(story)
  })
  const stories = await response.json();
  dispatch(createStory(stories));
  return (stories);
}

export const editStory = (story, id) => async dispatch => {
  const response = await csrfFetch(`/api/stories/edit/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(story)
  })
  const data = await response.json();
  dispatch(updateStory(data.result));
}

export const deleteStory = (storyId) => async dispatch => {
  const response = await csrfFetch(`/api/stories/${storyId}`, {
    method: 'DELETE',
  })
  // console.log(response, "------deleteStory thunk------");
  if (response.ok) {
    dispatch(removeStory(storyId));
  }
  // const stories = await response.json();
  // dispatch(removeStory(stories));
  return (response);
};

export const getCategories = (categories) => async dispatch => {
  if (categories) {
    const response = await csrfFetch(`/api/stories/category/${categories}`);
    if (response.ok) {
      const data = await response.json();
      dispatch(allCategories(data.categoriesList));
    }
    return (response);
  }
};


// Reducer
// normalizing state happens in Reducer
const initialState = {
  allStories: null,
  categories: null,
  currentStory: null,
};

const storyReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_STORIES:
      newState = { ...state };
      // console.log(action.payload, "--------setStories storyReducer-------")
      newState.allStories = action.payload;
      return newState;
    case VIEW_STORY:
      newState = Object.assign({}, state);
      newState.currentStory = action.payload;
      return newState;
    case UPDATE_STORY:
      newState = Object.assign({}, state);

      if (state.allStories) {
        newState.allStories = state.allStories.map((story) => {
          if (story.id === action.payload.id) {
            return action.payload;
          } else {
            return story;
          }
        });
      }

      if (state.currentStory) {
        newState.currentStory = action.payload;
      }

      return newState;
    case REMOVE_STORY:
      newState = Object.assign({}, state);
      newState.allStories = state.allStories.filter(story => {
        return story.id !== action.payload;
      });
      return newState;
    case GET_CATEGORIES:
      newState = Object.assign({}, state);
      newState.categories = action.payload;
      return newState;
    case CLEAR_CATEGORY:
      newState = Object.assign({}, state);
      newState.categories = null;
      return newState;

    default:
      return state;
  }
};

export default storyReducer;
