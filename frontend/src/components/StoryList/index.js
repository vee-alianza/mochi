import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getStories } from "../../store/stories";
import StoryFormPage from "./StoryFormPage"
import "./StoryList.css"
import { Switch } from "react-router-dom";

const StoryList = () => {
    const dispatch = useDispatch();

    const stories = useSelector(state => state.stories.stories);
    console.log(stories, "eeewwwww")

    useEffect(() => {
        dispatch(getStories());
    }, [dispatch]);

    return (
        <>
            <h1>STORY LIST</h1>
            <Switch>
                <Route exact path="/stories">
                    <form>
                        <h4>TACO 'bout it</h4>

                    </form>

                </Route>
            </Switch>
        </>
    );
};

export default StoryList;

  // <div className="recipe__container">
        //     <form className="recipe__form"> */
        //         {/* <ul>
        //         {storyElements}
        //     </ul>
        //     {/*
        //         <form onSubmit={handleSubmit}>
        //             <ul>
        //             {errors.map((error, idx) => (
        //                 <li key={idx}>{error}</li>
        //             ))}
        //         </ul> */}

        //         <label
        //             for="title"
        //         >
        //             Title:
        //         </label>
        //         <input
        //             type="text"
        //             id="recipe__title"
        //         />
        //         Category:
        //         <select
        //             name="category"
        //             id="recipe_box"
        //         >
        //             <option
        //                 value=""
        //                 selected="selected"
        //             >
        //                 Select region
        //             </option>
        //             <option
        //                 value="region1"
        //             >
        //                 Africa
        //             </option>
        //             <option
        //                 value="region2"
        //             >
        //                 Asia
        //             </option>
        //             <option
        //                 value="region3"
        //             >
        //                 Australia
        //             </option>
        //             <option
        //                 value="region4"
        //             >
        //                 Europe
        //             </option>
        //             <option
        //                 value="region5"
        //             >
        //                 North America
        //             </option>
        //             <option
        //                 value="region6"
        //             >
        //                 South America
        //             </option>
        //         </select>
        //         <label
        //             for="timeframe"
        //         >
        //             Timeframe:
        //         </label>
        //         <input
        //             type="text"
        //             id="recipe__timeframe"
        //         />
        //         <label
        //             for="story"
        //         >
        //             Recipe:
        //         </label>
        //         <textarea
        //             name="recipe__story"
        //             id="recipe__box"


        //         >
        //         </textarea>
        //         <label
        //             for="ingredients"
        //         >
        //             Ingredients:
        //         </label>
        //         <textarea
        //             name="recipe__ingredients"
        //             id="recipe__box"
        //         >
        //         </textarea>
        //         <label
        //             for="instructions"
        //         >
        //             Instructions:
        //         </label>
        //         <textarea
        //             name="recipe__instructions"
        //             id="recipe__box"
        //         >
        //         </textarea>
        //         <button
        //             type="submit"
        //             class="btn__cancel"
        //         >
        //             Cancel
        //         </button>
        //         <button
        //             type="submit"
        //             class="btn__publish"
        //         >
        //             Publish
        //         </button>
        //     </form>
        // </div >
