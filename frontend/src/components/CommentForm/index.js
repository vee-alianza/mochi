import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { createComment, postComment, deleteComment } from "../../store/comments";
import "./comments.css"

const CommentForm = ({ story }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState([]);
  const comments = useSelector(state => Object.values(state.comments));
  const sessionUser = useSelector(state => state.session.user);
  const history = useHistory();
  console.log(comments, "-----CommentForm component-----")

  if (!sessionUser) {
    history.push("/home")
  }

  useEffect(() => {
    dispatch(createComment());
  }, [dispatch]);


  // const handleDelete = (commentId) => {
  //   dispatch(deleteStory(commentId));
  // };

  const handleDelete = async (e, id) => {
    e.preventDefault();
    await dispatch(deleteComment(id))
  };

  const newerComment = async (e) => {
    e.preventDefault();
    const comment = {
      userId: sessionUser.id,
      storyId: id,
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
      history.push(`/stories/${id}`)
    };
  };

  return (
    <>
      <div className="comment__container">
        <h4>COMMENT BOX</h4>
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
