import { csrfFetch } from './csrf';

const CREATE_STORY = "story/create";
const VIEW_STORY = "story/view"
const UPDATE_STORY = "story/edit"
const REMOVE_STORY = "stories/remove"
const SET_STORIES = "stories/set";


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

// export const addStory = (story) => {
//   return {
//     type: ADD_STORY,
//     payload: story
//   }
// }

// export const setStories = (stories) => {
//   return {
//     type: SET_STORIES,
//     payload: stories
//   }
// }


// Thunks (Async Actions)
// Thunk middleware = dispatch
export const getStories = () => async dispatch => {
  const response = await csrfFetch('/api/stories');
  if (response.ok) {
    const stories = await response.json();
    dispatch(setStory(stories));
  }
};

export const readStory = (id) => async dispatch => {
  const response = await csrfFetch(`/api/stories/${id}`);
  if (response.ok) {
    const stories = await response.json();
    // console.log(stories);
    dispatch(viewStory(stories));
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
  const stories = await response.json();
  dispatch(updateStory(stories));
  return (stories);
}

export const deleteStory = (story) => async dispatch => {
  const response = await csrfFetch(`/api/stories/edit/${story.id}`, {
    method: 'DELETE',
    body: JSON.stringify(story)
  })
  const stories = await response.json();
  dispatch(removeStory(stories));
  return (response);
}

// Reducer
// normalizing state happens in Reducer
const initialState = {};

const storyReducer = (stories = initialState, action) => {
  //newStories = newState
  let newStories;
  switch (action.type) {
    case SET_STORIES:
      const stories = action.payload;
      return stories.reduce((newStories, story) => {
        return {
          ...newStories,
          [story.id]: story
        }
      }, {});

    // const newStories = {};
    // for (const story of storiesPayload) {
    //   newStories[story.id] = story;
    // }
    // return newStories;
    case VIEW_STORY:
      newStories = {};
      newStories[action.story.id] = action.story;
      return newStories
    case UPDATE_STORY:
      newStories = Object.assign({}, stories);
      newStories[action.story.id] = action.story;
      return newStories
    case REMOVE_STORY:
      newStories = Object.assign({}, stories);
      delete newStories[action.story.id];
      return newStories;
    default:
      return stories;
  }
};

export default storyReducer;

// const storyReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case SET_STORIES:
//       // const storiesPayload = action.payload;
//       // const newStories = {};
//       // for (const story of storiesPayload) {
//       //   newStories[story.id] = story;
//       // }
//       const newState = Object.assign({}, state);
//       action.payload.forEach((story) => {
//         newState[story.id] = story
//       })
//       console.log(newState, "==========")

//       return newState;
//     case ADD_STORY:
//       return
//     default:
//       return state;
//   }
// };
