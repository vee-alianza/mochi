import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getStories, readStory, updateStory, deleteStory } from "../../store/stories";
import "./StoryForm.css"

const StoryList = () => {
    // const [title, setTitle] = useState(story.title);
    // const [category, setCategory] = useState();
    // const [timeframe, setTimeframe] = useState();
    // const [story, setStory] = useState();
    // const [ingredients, setIngredients] = useState();
    // const [instructions, setInstructions] = useState();
    // const [errors, setErrors] = useSate([]);

    // const stories = useSelector(state => state.stories);
    // console.log("stories", stories);
    // const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(getStories());
    // }, [dispatch]);

    // useEffect(() => {
    //     const errors = [];

    // })

    // const storyElements = Object.values(stories).map(story => {
    //     return (
    //         <li>{story.title}</li>
    //     )
    // })

    return (
        <div className="recipe__container">
            <form className="recipe__form"> */
                {/* <ul>
                {storyElements}
            </ul>
            {/*
                <form onSubmit={handleSubmit}>
                    <ul>
                    {errors.map((error, idx) => (
                        <li key={idx}>{error}</li>
                    ))}
                </ul> */}

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
                    class="btn__cancel"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    class="btn__publish"
                >
                    Publish
                </button>
            </form>
        </div >
    );
};

export default StoryList;
