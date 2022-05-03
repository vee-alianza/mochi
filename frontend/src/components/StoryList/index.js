import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getStories } from "../../store/stories";
import StoryFormPage from "./StoryFormPage"
import "./StoryList.css"
import { Switch, Route } from "react-router-dom";

const StoryList = () => {
    const dispatch = useDispatch();

    const stories = useSelector(state => state.stories.stories);
    console.log(stories, "eeewwwww")

    useEffect(() => {
        dispatch(getStories());
    }, [dispatch]);

    return (
        <>
            <Switch>
                <Route exact path="/stories">
                    <form>
                        <h4>TACO 'bout it</h4>
                        {stories?.map(({ id, title }) => {
                            return (
                                <div>

                                </div>
                            )
                        })}
                    </form>
                </Route>
            </Switch>
        </>
    );
};

export default StoryList;
