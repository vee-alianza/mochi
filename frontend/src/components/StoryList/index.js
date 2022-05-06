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
  // console.log(allStories, "-----StoryList component-----")

  useEffect(() => {
    dispatch(getStories());
  }, [dispatch]);

  const handleDelete = (storyId) => {
    dispatch(deleteStory(storyId));
  };

  return (
    <>
      <div className="story__container">
        <h4>RECIPE BOX</h4>
        {allStories &&
          allStories.map((story) => {
            return (
              <div className="story__subcontainer">
                <div className="story__box">
                  <p>Title: {story.title}</p>
                </div>
                <div className="story__box">
                  <p>Category: {story.Category.title}</p>
                </div>
                <div className="story__box">
                  <p>Time: {story.timeframe}</p>
                </div>
                <div className="story__box">
                  <p> Story: </p>
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
