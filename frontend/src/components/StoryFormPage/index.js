import { useState, useEffect } from "react";
import "./StoryForm.css"

const StoryFormPage = () => {
    // const [title, setTitle] = useState();
    // const [category, setCategory] = useState();
    // const [timeframe, setTimeframe] = useState();
    // const [story, setStory] = useState();
    // const [ingredients, setIngredients] = useState();
    // const [instructions, setInstructions] = useState();
    // const [errors, setErrors] = useSate([]);

    // useEffect(() => {
    //     const errors = []
    //     if()
    // })

    return (
        <div className="recipe__container">
            <form className="recipe__form">
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
                Category:
                <select
                    name="category"
                    id="recipe_box"
                >
                    <option
                        value=""
                        selected="selected"
                    >
                        Select category
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
                <input
                    type="text"
                    id="recipe__title"
                />
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

export default StoryFormPage;
