import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { newStory, editStory, getCategories, clearCategory, readStory } from "../../store/stories";
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
  const currentStory = useSelector(state => state.stories.currentStory);
  const categories = useSelector(state => state.stories.categories);

  useEffect(() => {
    if (!currentStory && edit) {
      dispatch(readStory(storyId));
    } else if (edit) {
      setTitle(currentStory.title);
      setCategory(currentStory.Category.title);
      setTimeframe(currentStory.timeframe);
      setStory(currentStory.recipe);
      setIngredients(currentStory.ingredients);
      setInstructions(currentStory.instructions);
      setImage(currentStory.image);
    }
  }, [storyId, currentStory, dispatch, edit]);

  useEffect(() => {
    if (title.length) {
      setErrors(prevErrors => prevErrors.filter(error => error !== "Title must be 5 or more characters"));
    }
    if (category.length) {
      setErrors(prevErrors => prevErrors.filter(error => error !== "Please enter category"));
    }
    if (timeframe.length) {
      setErrors(prevErrors => prevErrors.filter(error => error !== "Please enter timeframe"));
    }
    if (story.length) {
      setErrors(prevErrors => prevErrors.filter(error => error !== "Please enter your munchies"));
    }
    if (ingredients.length) {
      setErrors(prevErrors => prevErrors.filter(error => error !== "Please enter ingredients"));
    }
    if (instructions.length) {
      setErrors(prevErrors => prevErrors.filter(error => error !== "Please enter instructions"));
    }
    if (image.length) {
      setErrors(prevErrors => prevErrors.filter(error => error !== "Please provide an image url"));
    }
    // setErrors(errors);
  }, [title, timeframe, story, ingredients, instructions, image, category]);

  useEffect(() => {
    if (!category.length) {
      dispatch(clearCategory());
    }
  }, [category, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = [];
    if (!title.length) {
      errors.push("Title must be 5 or more characters")
    }
    // console.log(category, "CATEGORY")
    if (!category.length) {
      errors.push("Please select a category")
    }
    if (!timeframe.length) {
      errors.push("Please enter timeframe")
    }
    if (!story.length) {
      errors.push("Please enter your munchies")
    }
    if (!ingredients.length) {
      errors.push("Please enter ingredients")
    }
    if (!instructions.length) {
      errors.push("Please enter instructions")
    }
    if (!image.length) {
      errors.push("Please provide an image url")
    }
    setErrors(errors);

    if (errors.length) return;

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

  const findCategory = (e) => {
    setCategory(e.target.value);
    dispatch(getCategories(e.target.value));
  };

  const selectCategory = (title) => {
    setCategory(title);
    dispatch(clearCategory());
  };

  return (
    <>
      <div className="recipe__create__box">
        <h3>Carbs look great on you!</h3>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <div className="recipe__container" onSubmit={handleSubmit}>
          <div className="storyform__left_container">
            <form>
              <label
                htmlFor="title"
              >
                Title:
              </label>
              <input
                type="text"
                id="recipe__title"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                required
              />
              <div className="display__categories">
                <label
                  htmlFor='category'
                >
                  Category:
                </label>
                <input
                  type="text"
                  id="recipe__category"
                  onChange={findCategory}
                  value={category}
                  required
                />
                {categories &&
                  categories.map(category => {
                    return (
                      <div onClick={() => selectCategory(category.title)}>{category.title}</div>
                    )
                  })}
              </div>
              <label
                htmlFor="image"
              >
                Image:
              </label>
              <input
                type="text"
                id="recipe__image"
                onChange={(e) => setImage(e.target.value)}
                value={image}
                required
              />
            </form>
          </div>
          <div className="storyform__right__container">
            <form>
              <label
                htmlFor="timeframe"
              >
                Timeframe:
              </label>
              <input
                type="text"
                id="recipe__timeframe"
                onChange={(e) => setTimeframe(e.target.value)}
                value={timeframe}
                required
              />
              <label
                htmlFor="story"
              >
                Munchies:
              </label>
              <textarea
                name="recipe__story"
                id="recipe__box"
                onChange={(e) => setStory(e.target.value)}
                value={story}
                required
              >
              </textarea>
              <label
                htmlFor="ingredients"
              >
                Ingredients:
              </label>
              <textarea
                name="recipe__ingredients"
                id="recipe__box"
                onChange={(e) => setIngredients(e.target.value)}
                value={ingredients}
                required
              >
              </textarea>
              <label
                htmlFor="instructions"
              >
                Instructions:
              </label>
              <textarea
                name="recipe__instructions"
                id="recipe__box"
                onChange={(e) => setInstructions(e.target.value)}
                value={instructions}
                required
              >
              </textarea>
            </form>
          </div>
          <button
            type="button"
            className="btn__cancel"
            id="btn"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn__publish"
            id="btn"
            onClick={handleSubmit}
          >
            Publish
          </button>
        </div>
      </div >
    </>
  );
};

export default StoryForm;
