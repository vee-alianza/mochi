import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import ReactStars from "react-stars";
import { useParams } from "react-router-dom";
import { readStory, deleteStory } from "../../store/stories";
import EditFormModal from "../EditFormModal";
import CommentForm from "../CommentForm";
import "./StoryView.css"

const StoryView = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const story = useSelector(state => state.stories.currentStory);
  const storyRating = useSelector(state => state.stories.currentStory?.rating);

  useEffect(() => {
    dispatch(readStory(id));
  }, [id, dispatch]);

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
            <div>
              <p>Rating: {story.rating}</p>
              <ReactStars
                value={Number(storyRating)}
                size={24}
                edit={false}
              />
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
              <img src={story.image} alt="" />
            </div>
            {user && story.userId === user.id &&
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
          {user &&
            <CommentForm story={story} />
          }
        </div>}
    </>
  );
};


export default StoryView;
