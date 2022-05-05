import { csrfFetch } from './csrf';

const GET_COMMENT = "comment/create";
const ADD_COMMENT = "comment/add";
const REMOVE_COMMENT = "comment/remove";

const getComment = (comments) => {
    return {
        type: GET_COMMENT,
        payload: comments
    };
};

const addComment = (comment) => {
    return {
        type: ADD_COMMENT,
        payload: comment
    };
};

const removeComment = (id) => {
    return {
        type: REMOVE_COMMENT,
        payload: id
    };
};


export const createComment = () => async dispatch => {
    console.log("------createComment thunk------")
    const response = await csrfFetch('/api/comments');
    console.log("INFILTRATED BACKEND")

    if (response.ok) {
        const comments = await response.json();
        dispatch(getComment(comments))
        return comments;
    }
};

export const postComment = (comment) => async dispatch => {
    console.log("------postComment thunk------")
    const response = await csrfFetch('/api/comments/new', {
        method: 'POST',
        body: JSON.stringify(comment)
    });
    if (response.ok) {
        const newComment = await response.json();
        dispatch(addComment(newComment));
        return (newComment);
    } else {
        const error = await response.json();
        Promise.reject(error.errors);
    }
};

export const deleteComment = (commentId) => async dispatch => {
    const response = await csrfFetch(`/api/comments/${commentId}`, {
        method: 'DELETE',
    })
    console.log(response, "------deleteComment thunk------");
    if (response.ok) {
        // const remove = await response.json();
        // dispatch(removeComment(remove));
        dispatch(removeComment(commentId));
    }
    return (response);
};

const initialState = {};

const commentReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_COMMENT:
            newState = { ...state };
            action.payload.comments.forEach(comment => {
                newState[comment.id] = comment;
            });
            console.log(action, "------get comment-----")
            return newState;
        case ADD_COMMENT:
            newState = {
                ...state,
                [action.payload.id]: action.payload,
            };
            return newState;
        case REMOVE_COMMENT:
            newState = { ...state };
            console.log(action.payload, "------remove comment-----")
            delete newState[action.payload];
            return newState;
        default:
            return state
    }
}

export default commentReducer;
