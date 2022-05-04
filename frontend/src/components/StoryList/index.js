import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { getStories, deleteStory } from "../../store/stories";
import EditFormModal from "../EditFormModal";
import "./StoryList.css"
import CommentForm from "../CommentForm";

const StoryList = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const history = useHistory();
  const allStories = useSelector(state => state.stories.allStories);
  console.log(allStories, "eeewwwww")

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
                <div>
                  {story.title}
                </div>
                <div>
                  {story.Category.title}
                </div>
                <div>
                  {story.timeframe}
                </div>
                <div>
                  {story.recipe}
                </div>
                <div>
                  {story.ingredients}
                </div>
                <div>
                  {story.instructions}
                </div>
                <div>
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

{/* <button className="delete__btn" onClick={() => {
  dispatch(deleteStory(story))
  history.push("/stories");
}}
>
  Delete
</button>
<CommentForm story={story} /> */}
