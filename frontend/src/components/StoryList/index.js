import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { getStories, deleteStory } from "../../store/stories";
import EditFormModal from "../EditFormModal";
import "./StoryList.css"


const StoryList = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const history = useHistory();
  const allStories = useSelector(state => state.stories.allStories);
  console.log(allStories, "-----StoryList component-----")

  useEffect(() => {
    dispatch(getStories());
  }, [dispatch]);

  const handleDelete = (storyId) => {
    dispatch(deleteStory(storyId));
  };

  return (
    <>
      <div className="story__container">
        <h4>TACO 'bout it</h4>
        {allStories &&
          allStories.map((story) => {
            return (
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
            )
          })
        };
      </div>
    </>
  );
};

export default StoryList;
