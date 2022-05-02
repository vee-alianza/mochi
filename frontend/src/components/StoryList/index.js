import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getStories } from "../../store/stories";


function StoryList() {
  const stories = useSelector(state => state.stories);
  console.log(stories);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStories());
  }, [dispatch]);

  const renderStories = () => {
    return Object.values(stories).map(story => {
      return (
        <li>{story.title}</li>
      )
    })
  }

  return (
    <ul>

    </ul>
  )
}

export default StoryList;
