import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getStories, readStory, editStory, deleteStory } from "../../store/stories";
import "./StoryForm.css"

const StoryForm = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [timeframe, setTimeframe] = useState("");
  const [story, setStory] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [errors, setErrors] = useState([]);
  const history = useHistory();

  // const stories = useSelector(state => state.stories);
  // console.log("stories", stories);
  // const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(readStory(story.id));
  }, [dispatch, id, story.id]);

  useEffect(() => {
    const errors = [];
    if (title.length < 50) {
      errors.push("Title must be 5 or more characters")
    }
    if (category.length < 50) {
      errors.push("Please enter category")
    }
    if (timeframe.length < 50) {
      errors.push("Please enter timeframe")
    }
    if (story.length < 50) {
      errors.push("Need story")
    }
    if (ingredients.length < 50) {
      errors.push("Write ingredients")
    }
    if (instructions.length < 50) {
      errors.push("Write instructions")
    }
    setErrors(errors);
  }, [title, category, timeframe, story, ingredients, instructions]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const storyBox = {
      title,
      category,
      timeframe,
      story,
      ingredients,
      instructions
    };

    let newStory = await dispatch(editStory(storyBox, story.id));
    setTitle("");
    setCategory("");
    setTimeframe("");
    setStory("");
    setIngredients("");
    setInstructions("");
  }

  // const storyElements = Object.values(stories).map(story => {
  //     return (
  //         <li>{story.title}</li>
  //     )
  // })

  return (
    <>
      <div className="recipe__container">
        <div className="recipe__form">
          {/* <ul>
            {storyElements}
          </ul> */}
          <form onSubmit={handleSubmit}>
            <ul>
              {errors.map((error, idx) => (
                <li key={idx}>{error}</li>
              ))}
            </ul>

            <label
              for="title"
            >
              Title:
            </label>
            <input
              type="text"
              id="recipe__title"
            />
            Category:
            <select
              name="category"
              id="recipe_box"
            >
              <option
                value=""
                selected="selected"
              >
                Select region
              </option>
              <option
                value="region1"
              >
                Africa
              </option>
              <option
                value="region2"
              >
                Asia
              </option>
              <option
                value="region3"
              >
                Australia
              </option>
              <option
                value="region4"
              >
                Europe
              </option>
              <option
                value="region5"
              >
                North America
              </option>
              <option
                value="region6"
              >
                South America
              </option>
            </select>
            <label
              for="timeframe"
            >
              Timeframe:
            </label>
            <input
              type="text"
              id="recipe__timeframe"
            />
            <label
              for="story"
            >
              Recipe:
            </label>
            <textarea
              name="recipe__story"
              id="recipe__box"
            >
            </textarea>
            <label
              for="ingredients"
            >
              Ingredients:
            </label>
            <textarea
              name="recipe__ingredients"
              id="recipe__box"
            >
            </textarea>
            <label
              for="instructions"
            >
              Instructions:
            </label>
            <textarea
              name="recipe__instructions"
              id="recipe__box"
            >
            </textarea>
            <button
              type="submit"
              className="btn__cancel"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn__publish"
            >
              Publish
            </button>
          </form>
          <button className="btn__delete" onClick={() => {
            dispatch(deleteStory(story))
            history.push("/stories")
          }}>Delete</button>
        </div >
      </div>
    </>
  );
};

export default StoryForm;
