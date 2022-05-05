import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getStories, newStory, editStory } from "../../store/stories";
import "./StoryForm.css"

const StoryForm = ({ props }) => {
  const { edit, setShowModal, storyId } = props;
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [timeframe, setTimeframe] = useState("");
  const [story, setStory] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [image, setImage] = useState("");
  const [errors, setErrors] = useState([]);
  const history = useHistory();
  const allStories = useSelector(state => state.stories.allStories);
  const storyRecipe = allStories?.find(story => story.id === storyId);

  console.log(props, "PROPS")

  const setData = () => {
    setTitle(storyRecipe.title);
    setCategory(storyRecipe.category);
    setTimeframe(storyRecipe.timeframe);
    setStory(storyRecipe.recipe);
    setIngredients(storyRecipe.ingredients);
    setInstructions(storyRecipe.instructions);
    setImage(storyRecipe.image);
  }

  useEffect(() => {
    if (!allStories) {
      dispatch(getStories());
    }
    if (edit) {
      setData();
    }
  }, [allStories]);

  useEffect(() => {
    const errors = [];
    if (title.length < 50) {
      errors.push("Title must be 5 or more characters")
    }
    // console.log(category, "CATEGORY")
    // if (category.length < 50) {
    //   errors.push("Please enter category")
    // }
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
  }, [title, timeframe, story, ingredients, instructions, image]);

  const handleSubmit = async (e) => {

    // console.log("HANDLESUBMIT")
    e.preventDefault();

    const storyBox = {
      title,
      category,
      timeframe,
      recipe: story,
      ingredients,
      instructions,
      image
    };

    if (!edit) {
      await dispatch(newStory(storyBox));

    } else {
      dispatch(editStory(storyBox, storyId));
    }
    setTitle("");
    setCategory("");
    setTimeframe("");
    setStory("");
    setIngredients("");
    setInstructions("");
    setImage("");

    if (!edit) {
      history.push('/home');
    } else {
      setShowModal(false);
    }
  };

  const handleCancel = () => {
    if (!edit) {
      history.push('/home');
    } else {
      setShowModal(false);
    }
  };

  return (
    <>
      <div className="recipe__container">
        <div className="recipe__form">
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
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
            Category:
            <select
              name="category"
              id="recipe_box"
              onChange={(e) => setCategory(e.target.value)}
              value={category}
            >
              <option
                value=""
                selected="selected"
              >
                Select region
              </option>
              <option
                value="Africa"
              >
                Africa
              </option>
              <option
                value="Asia"
              >
                Asia
              </option>
              <option
                value="Australia"
              >
                Australia
              </option>
              <option
                value="Europe"
              >
                Europe
              </option>
              <option
                value="North America"
              >
                North America
              </option>
              <option
                value="South America"
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
              onChange={(e) => setTimeframe(e.target.value)}
              value={timeframe}
            />
            <label
              for="image"
            >
              Image:
            </label>
            <input
              type="text"
              id="recipe__image"
              onChange={(e) => setImage(e.target.value)}
              value={image}
            />
            <label
              for="story"
            >
              Recipe:
            </label>
            <textarea
              name="recipe__story"
              id="recipe__box"
              onChange={(e) => setStory(e.target.value)}
              value={story}
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
              onChange={(e) => setIngredients(e.target.value)}
              value={ingredients}
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
              onChange={(e) => setInstructions(e.target.value)}
              value={instructions}
            >
            </textarea>
            <button
              type="button"
              className="btn__cancel"
              onClick={handleCancel}
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
        </div >
      </div>
    </>
  );
};

export default StoryForm;
