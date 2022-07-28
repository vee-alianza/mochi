import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import ReactStars from 'react-stars';
import { useHistory } from "react-router-dom";
import { getStories, deleteStory } from "../../store/stories";
import { FiClock } from "react-icons/fi";
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
        <h4>LATEST RECIPES</h4>
        {allStories &&
          allStories.map((story) => {
            return (
              <div
                key={story.id}
                className="story__subcontainer"
                onClick={() => history.push(`/stories/view/${story.id}`)}
              >
                <div className="story__box" >
                  <img src={story.User.profileImage} alt="" />
                  <div id="username">
                    <p >{`${story.User.username}`}</p>
                  </div>
                  {user && story.userId === user.id &&
                    <>
                      <button
                        type="button"
                        className="btn__delete__homepage"
                        onClick={() => handleDelete(story.id)}
                      >
                        <i className="fa-solid fa-trash-can"></i>
                      </button>
                      <EditFormModal storyId={story.id} />
                    </>
                  }
                </div>
                <div className="story__box recipe-title-cook-time">
                  <div className="story__box recipe-title">
                    {/* <p>Title: {story.title}</p> */}
                    <p>{story.title}</p>
                    <div className="story__box recipe-cook-time">
                      <p> <FiClock size={20} />
                        &nbsp;&nbsp;
                        {story.timeframe}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="story__box recipe">
                  {/* <p> Story: </p> */}
                  {story.recipe}
                  <div className="story__box recipe-image">
                    <img src={story.image} alt="" />
                  </div>
                </div>
                <div className="story__box recipe-cuisine">
                  {/* <p>Cuisine: {story.Category.title}</p> */}
                  <p>{story.Category.title}</p>
                </div>
                <div className="story__box recipe-stars">
                  <ReactStars
                    edit={false}
                    value={Number(story.rating)}
                    size={28}
                    color2={'#00D8D8'}
                  />
                  <div className="story__box recipe-rating">
                    <p>Rating: {story.rating}</p>
                  </div>
                </div>
              </div>
            )
          })
        };
      </div>
    </>
  );
};

export default StoryList;
