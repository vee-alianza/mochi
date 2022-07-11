import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import ReactStars from 'react-stars';
import { useHistory } from "react-router-dom";
import { getStories, deleteStory } from "../../store/stories";
import EditFormModal from "../EditFormModal";
import "./StoryList.css"


const StoryList = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const history = useHistory();
  const allStories = useSelector(state => state.stories.allStories);

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
              <div
                key={story.id}
                className="story__subcontainer"
                onClick={() => history.push(`/stories/view/${story.id}`)}
              >
                <div className="story__box" id="profile__username">
                  <img src={story.User.profileImage} alt="" />
                  <div>
                    <p id="username">{`${story.User.username}`}</p>
                  </div>
                </div>
                <div className="story__box">
                  <p>Title: {story.title}</p>
                </div>
                <div>
                  <p>Rating: {story.rating}</p>
                  <ReactStars
                    edit={false}
                    value={Number(story.rating)}
                  />
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
            )
          })
        };
      </div>
    </>
  );
};

export default StoryList;
