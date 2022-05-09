import { csrfFetch } from './csrf';
import { addUserCommentLike, removeUserCommentLike } from './session';
import { likeStoryComment, unlikeStoryComment, addStoryComment, removeStoryComment } from './stories';

const GET_COMMENT = "comment/create";

const getComment = (comments) => {
    return {
        type: GET_COMMENT,
        payload: comments
    };
};


export const createComment = () => async dispatch => {
    // console.log("------createComment thunk------")
    const response = await csrfFetch('/api/comments');
    // console.log("INFILTRATED BACKEND")

    if (response.ok) {
        const comments = await response.json();
        dispatch(getComment(comments))
        return comments;
    }
};

export const postComment = (comment) => async dispatch => {
    // console.log("------postComment thunk------")
    const response = await csrfFetch('/api/comments/new', {
        method: 'POST',
        body: JSON.stringify(comment)
    });
    if (response.ok) {
        const data = await response.json();
        console.log(data);
        dispatch(addStoryComment(data.newComment));
    } else {
        const error = await response.json();
        Promise.reject(error.errors);
    }
    return response;
};

export const deleteComment = (commentId) => async dispatch => {
    const response = await csrfFetch(`/api/comments/${commentId}`, {
        method: 'DELETE'
    });
    // console.log(response, "------deleteComment thunk------");
    if (response.ok) {
        // const remove = await response.json();
        // dispatch(removeComment(remove));
        dispatch(removeStoryComment(commentId));
    }
    return (response);
};

export const likeComment = (commentId) => async dispatch => {
    const response = await csrfFetch(`/api/comments/${commentId}/like`, {
        method: 'POST'
    });
    if (response.ok) {
        dispatch(addUserCommentLike(commentId));
        dispatch(likeStoryComment(commentId));
    }
};

export const unlikeComment = (commentId) => async dispatch => {
    const response = await csrfFetch(`/api/comments/${commentId}/like`, {
        method: 'DELETE'
    });
    if (response.ok) {
        dispatch(removeUserCommentLike(commentId));
        dispatch(unlikeStoryComment(commentId));
    }
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
            // console.log(action, "------get comment-----")
            return newState;
        default:
            return state
    }
}

export default commentReducer;
