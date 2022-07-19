import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { postComment, deleteComment, likeComment, unlikeComment } from "../../store/comments";
import "./comments.css"
import ReactStars from "react-stars";
import { fetchCurrentStoryData } from "../../store/session";
import { rateStory } from "../../store/stories";
import { FcLike, FcLikePlaceholder } from 'react-icons/fc';

const CommentForm = ({ story }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user);
  const comments = useSelector(state => state.stories.currentStory?.Comments);
  const currentUserRating = useSelector(state => state.session.currentStoryRating);
  const currentUserCommentLikes = useSelector(state => state.session.currentStoryCommentLikes);
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState([]);
  const [userRating, setUserRating] = useState(0);
  // console.log(comments, "-----CommentForm component-----")

  // if (!sessionUser) {
  //   history.push("/home")
  // }

  // useEffect(() => {
  //   dispatch(createComment());
  // }, [dispatch]);

  useEffect(() => {
    if (!currentUserRating) {
      dispatch(fetchCurrentStoryData(story.id));
    } else {
      setUserRating(Number(currentUserRating));
    }
  }, [dispatch, currentUserRating, story.id]);

  const handleDelete = async (e, id) => {
    e.preventDefault();
    await dispatch(deleteComment(id))
  };

  const newerComment = async (e) => {
    e.preventDefault();
    const comment = {
      userId: sessionUser.id,
      storyId: story.id,
      content
    };

    let newestComment = await dispatch(postComment(comment))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });

    setContent("");

    if (errors.length && newestComment) {
      history.push(`/stories/view/${story.id}`)
    };
  };

  const handleRating = (userRating) => {
    dispatch(rateStory(story.id, userRating));
  };

  const handleLike = (commentId) => {
    if (currentUserCommentLikes && currentUserCommentLikes.includes(commentId)) {

      return (
        <button
          onClick={() => dispatch(unlikeComment(commentId))}
        >
          <FcLike />
        </button>
      )
    }

    return (
      <button
        onClick={() => dispatch(likeComment(commentId))}
      >

        <FcLikePlaceholder />
      </button>
    )
  };

  return (
    <>
      <div className="comment__container">
        <h4>COMMENT BOX</h4>
        <label>
          <input
            type="text"
            placeholder='Penne for your thoughts'
            required
            onChange={(e) => setContent(e.target.value)}
            value={content}
            className="comment__input__box"
          >
          </input>
        </label>
        <button
          type="submit"
          className="new__comment"
        >Submit
        </button>
        {story.userId !== sessionUser.id && currentUserRating &&
          <ReactStars
            size={36}
            value={userRating}
            onChange={handleRating}
          />
        }
        <div className="comment__box">
          <div className="comments__list">
            {comments?.map((comment) => {
              return (
                <div key={comment.id}>
                  <div className="comment__header">
                    <div className="commentbox__align__right" >
                      <img src={comment.User.profileImage} className="comment__profile__image" alt="" />
                    </div>
                    <div className="commentbox__align__right">
                      {comment.User.username}
                    </div>
                    <div className="commentbox__align__right">
                      {new Date(comment.createdAt).toDateString()}
                    </div>
                  </div>
                  <div className="comment__post">
                    {comment.content}
                  </div>
                  {
                    sessionUser.id === comment.userId && (
                      <button className="btn__delete" onClick={(e) => handleDelete(e, comment.id)}> <i className="fa-solid fa-trash-can"></i>Delete</button>
                    )
                  }
                  {
                    sessionUser.id !== comment.userId &&
                    handleLike(comment.id)
                  }
                  <div className="comment__post__like">
                    {`Likes: ${comment.likes}`}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <form onSubmit={newerComment} className="comment__form">
          <ul className="errors__message">
            {errors.map(error => {
              return (
                <li key={error}>{error}</li>
              )
            })}
          </ul>
        </form>
      </div>
    </>
  )
};

export default CommentForm;
