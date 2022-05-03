import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getStories } from "../../store/stories";
// import * as storyActions from "../../store/stories";


function StoryList() {
  const stories = useSelector(state => state.stories);
  console.log("stories", stories);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStories());
  }, [dispatch]);

  const storyElements = Object.values(stories).map(story => {
    return (
      <li>{story.title}</li>
    )
  })


  return (
    <ul>
      {storyElements}
    </ul>
  )
}


export default StoryList;
