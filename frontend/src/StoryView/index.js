import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getStories, newStory, editStory } from "../../store/stories";
import { readStory } from "../store/stories";
import "./StoryView.css";

const StoryView = () => {
    const { id } = useParams();
    const dispatch = useDispatch;
    const history = useHistory;
    const allStories = useSelector(state => state.stories.allStories);
    const storyRecipe = allStories?.find(story => story.id === storyId);
    const [editTitle, setEditTitle] = useState(storyRecipe.title)
    const [editCategory, setEditCategory] = useState(storyRecipe.category);
    const [editTimeframe, setEditTimeframe] = useState(storyRecipe.timeframe);
    const [editStory, setEditStory] = useState(storyRecipe.recipe);
    const [editIngredients, setEditIngredients] = useState(storyRecipe.ingredients);
    const [editInstructions, setEditInstructions] = useState(storyRecipe.instructions);
    const [editImage, setEditImage] = useState(storyRecipe.image);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        dispatch(getStories());
    }, [dispatch]);

    useEffect(() => {
        dispatch(readStory(storyId))
    }, [dispatch, id, storyId]);

    const editRedirect = async (e) => {
        e.preventDefault();

        const edit = {
            editTitle,
            editCategory,
            editTimeframe,
            editStory,
            editIngredients,
            editInstructions,
            editImage
        }
    }

    useEffect(() => {
        const errors = [];

    });

    return (
        <>
            <div>

            </div>
        </>
    )
}

export default StoryView;
