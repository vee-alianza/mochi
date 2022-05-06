import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { getStories, readStory, deleteStory } from "../../store/stories";
import EditFormModal from "../EditFormModal";
import CommentForm from "../CommentForm";
import "./StoryView.css"

const StoryView = () => {
  const { id } = useParams();
  console.log(useParams());
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const history = useHistory();
  const story = useSelector(state => state.stories.currentStory);

  // console.log(allStories, "STORY VIEW")

  useEffect(() => {
    dispatch(readStory(id));

    // console.log("////////////")
  }, [id]);

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
              <p>Title: {story.title}</p>
            </div>
            <div className="story__box">
              <p>Category: {story.Category.title} </p>
            </div>
            <div className="story__box">
              <p>Time: {story.timeframe}</p>
            </div>
            <div className="story__box">
              <p> Story: </p>
              {story.recipe}
            </div>
            <div className="story__box">
              <p>Ingredients:</p>
              {story.ingredients}
            </div>
            <div className="story__box">
              <p>Instructions:</p>
              {story.instructions}
            </div>
            <div className="story__box">
              <p>Image</p>
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
          <CommentForm story={story} />
        </div>}
    </>
  );
};


export default StoryView;
