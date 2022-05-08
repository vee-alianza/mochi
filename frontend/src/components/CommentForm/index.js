import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { createComment, postComment, deleteComment } from "../../store/comments";
import "./comments.css"
import ReactStars from "react-stars";
import { fetchUserRating } from "../../store/session";
import { rateStory } from "../../store/stories";

const CommentForm = ({ story }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const comments = useSelector(state => Object.values(state.comments));
  const sessionUser = useSelector(state => state.session.user);
  const currentUserRating = useSelector(state => state.session.currentStoryRating);
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState([]);
  const [userRating, setUserRating] = useState(0);
  // console.log(comments, "-----CommentForm component-----")

  // if (!sessionUser) {
  //   history.push("/home")
  // }

  useEffect(() => {
    dispatch(createComment());
  }, [dispatch]);

  useEffect(() => {
    if (!currentUserRating) {
      dispatch(fetchUserRating(story.id));
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
      })
    // await dispatch(createComment());

    if (errors.length && newestComment) {
      history.push(`/stories/${story.id}`)
    };
  };

  const handleRating = (userRating) => {
    dispatch(rateStory(story.id, userRating));
  };

  return (
    <>
      <div className="comment__container">
        <h4>COMMENT BOX</h4>
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
              if (story.id === comment.storyId) {
                return (
                  <div key={comment.id}>
                    <li className="comment__post">
                      {comment.content}
                    </li>
                    {sessionUser.id === comment.userId && (
                      <button className="btn__delete" onClick={(e) => handleDelete(e, comment.id)}>Delete</button>
                    )}
                  </div>
                )
              }
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
          <label>
            <input
              type="text"
              placeholder='Leave a comment...'
              onChange={(e) => setContent(e.target.value)}
              value={content}
              className="comment__input__box"
            >
            </input>
          </label>
          <button type="submit" className="new__comment">Submit</button>
        </form>
      </div>
    </>
  )
};

export default CommentForm;
