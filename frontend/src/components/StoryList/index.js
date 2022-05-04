import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getStories } from "../../store/stories";
// import StoryFormPage from "./StoryFormPage"
import "./StoryList.css"

const StoryList = () => {
  const dispatch = useDispatch();

  const allStories = useSelector(state => state.stories.allStories);
  console.log(allStories, "eeewwwww")

  useEffect(() => {
    dispatch(getStories());
  }, [dispatch]);

  return (
    <>
      <form>
        <h4>TACO 'bout it</h4>
        {allStories &&
          allStories.map((story) => {
            return (
              <div className="story__container">
                <div>
                  {story.title}
                </div>
                <div>
                  {story.category}
                </div>
                <div>
                  {story.timeframe}
                </div>
                <div>
                  {story.story}
                </div>
                <div>
                  {story.ingredients}
                </div>
                <div>
                  {story.instructions}
                </div>
              </div>
            )
          })
        }
      </form>
    </>
  );
};

export default StoryList;
