import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { readStory, deleteStory } from "../../store/stories";
import EditFormModal from "../EditFormModal";
import CommentForm from "../CommentForm";
import "./StoryView.css"
import StoryCard from "./StoryCard";

const StoryView = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(state => state.session.user);
  const story = useSelector(state => state.stories.currentStory);
  const storyRating = useSelector(state => state.stories.currentStory?.rating);

  useEffect(() => {
    dispatch(readStory(id));
  }, [id, dispatch]);

  const handleDelete = (storyId) => {
    dispatch(deleteStory(storyId));
    history.push("/home");
  };

  return (
    <>
      {story &&
        <div className="story__container">
          <div className="story__details">
            <StoryCard story={story} storyRating={storyRating} />
            {user && story.userId === user.id &&
              <>
                <button
                  type="button"
                  className="btn__delete__story"
                  onClick={() => handleDelete(story.id)}
                >
                  <i className="fa-solid fa-trash-can"></i>
                </button>
                <div className="btn__edit__modal__story">
                  <EditFormModal storyId={story.id} />
                </div>
              </>
            }
          </div>
          <div className="story__comments">
            {user &&
              <CommentForm story={story} />
            }
          </div>
        </div>}
    </>
  );
};


export default StoryView;
