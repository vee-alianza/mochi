import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { getStories, deleteStory } from "../../store/stories";
import EditFormModal from "../EditFormModal";
import CommentForm from "../CommentForm";
import "./StoryView.css"

const StoryView = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const history = useHistory();
  const allStories = useSelector(state => state.stories.allStories);
  const [story, setStory] = useState(null);
  if (allStories !== null) {

  }
  console.log(allStories, "STORY VIEW")

  useEffect(() => {
    dispatch(getStories());
    if (allStories) {
      setStory(allStories.find(story => story.id === id));
    }
    console.log("////////////")
  }, []);

  const handleDelete = (storyId) => {
    dispatch(deleteStory(storyId));
  };

  return (
    <>
      {story &&
        <div className="story__container">
          <h4>VIEW STORY</h4>
          <div className="story__subcontainer">
            <div className="story__box">
              {story.title}
            </div>
            <div className="story__box">
              {story.Category.title}
            </div>
            <div className="story__box">
              {story.timeframe}
            </div>
            <div className="story__box">
              <p> Recipe: </p>
              {story.recipe}
            </div>
            <div className="story__box">
              {story.ingredients}
            </div>
            <div className="story__box">
              {story.instructions}
            </div>
            <div className="story__box">
              {story.image}
            </div>
            {story.userId === user.id &&
              <>
                <button
                  type="button"
                  onClick={() => handleDelete(story.id)}
                >
                  Delete
                </button>
                <EditFormModal storyId={story.id} />
              </>
            }
          </div>
        </div>}
    </>
  );
};


export default StoryView;
