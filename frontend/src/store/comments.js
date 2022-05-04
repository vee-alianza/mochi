import { csrfFetch } from './csrf';

const GET_COMMENT = "comment/create";
const ADD_COMMENT = "comment/add";
const REMOVE_COMMENT = "comment/add";

const getComment = (comment) => {
    return {
        type: GET_COMMENT,
        payload: comment
    };
};

const addComment = (comment) => {
    return {
        type: ADD_COMMENT,
        payload: comment
    };
};

const removeComment = (comment) => {
    return {
        type: REMOVE_COMMENT,
        payload: comment
    };
};


export const createComment = () => async dispatch => {
    const response = await csrfFetch('/api/comments');
    if (response.ok) {
        const comments = await response.json();
        dispatch(getComment(comments))
        return comments;
    }
}

export const postComment = (comment) => async dispatch => {
    const response = await csrfFetch('/api/comments/new', {
        method: 'POST',
        body: JSON.stringify(comment)
    });
    if (response.ok) {
        const newComment = await response.json();
        dispatch(addComment(newComment));
        return (newComment);
    }
}

export const deleteComment = (commentId) => async dispatch => {
    const response = await csrfFetch(`/api/stories/${commentId}`, {
        method: 'DELETE',
    })
    console.log(response, "hitting deleteComment thunk");
    if (response.ok) {
        dispatch(removeComment(commentId));
    }
    return (response);
}

const initialState = {};

const commentReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_COMMENT:
            newState = { ...state };
            action.comments.forEach(comment => {
                newState[comment.id] = comment;
            });
            return newState;
        case ADD_COMMENT:
            newState = {
                ...state,
                [action.comment.id]: action.comment,
            };
            return newState;
        case REMOVE_COMMENT:
            newState = { ...state };
            delete newState[action.comment.id];
            return newState;
        default:
            return state
    }
}

export default commentReducer;
