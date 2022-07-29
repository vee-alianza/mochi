import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactStars from "react-stars";
import { bookmarkStory } from "../../store/stories";
import { FiClock } from "react-icons/fi";
import { AiTwotoneCalendar } from "react-icons/ai";
import "./StoryView.css";

const tabClasses = {
    munchies: "munchies__tab",
    ingredients: "ingredients__tab",
    instructions: "instructions__tab"
};

const StoryCard = ({ story, storyRating }) => {
    const dispatch = useDispatch();
    const isBookmarked = useSelector(state => state.session.currentStoryBookmarked);
    const [munchiesTab, setMunchiesTab] = useState('selected');
    const [ingredientsTab, setIngredientsTab] = useState('');
    const [instructionsTab, setInstructionsTab] = useState('');
    const [munchiesContainer, setMunchiesContainer] = useState('');
    const [ingredientsContainer, setIngredientsContainer] = useState('hide');
    const [instructionsContainer, setInstructionsContainer] = useState('hide');

    const tabSelect = (e) => {
        const currentClass = e.target.className;

        setMunchiesTab('');
        setIngredientsTab('');
        setInstructionsTab('');
        setMunchiesContainer('hide');
        setIngredientsContainer('hide');
        setInstructionsContainer('hide');

        if (currentClass.includes(tabClasses.munchies)) {
            setMunchiesTab('selected');
            setMunchiesContainer('');
        } else if (currentClass.includes(tabClasses.ingredients)) {
            setIngredientsTab('selected');
            setIngredientsContainer('');
        } else if (currentClass.includes(tabClasses.instructions)) {
            setInstructionsTab('selected');
            setInstructionsContainer('');
        }
    };

    const handleBookmark = () => {
        const bookmarkIcon = isBookmarked ? 'Unbookmark' : 'Bookmark';

        return (
            <button
                className="icon__bookmark"
                onClick={() => dispatch(bookmarkStory(story.id))}
            >
                <i class="fa-regular fa-bookmark"></i>
            </button>
        )
    };

    return (
        <div className="story__card__container">
            <div className="content__container">

                <div className="tab__container">
                    <div
                        className={`${tabClasses.munchies} ${munchiesTab}`}
                        onClick={tabSelect}
                    >
                        MUNCHIES
                    </div>
                    <div
                        className={`${tabClasses.ingredients} ${ingredientsTab}`}
                        onClick={tabSelect}
                    >
                        INGREDIENTS
                    </div>
                    <div
                        className={`${tabClasses.instructions} ${instructionsTab}`}
                        onClick={tabSelect}
                    >
                        INSTRUCTIONS
                    </div>
                </div>
                <div className="story__image__container">
                    <img src={story.image} alt="" id="story__image__view" width="300%" />
                </div>
                <div className="content__subcontainer">

                    <div className={`munchies__subcontainer ${munchiesContainer}`}>
                        <div className="munchies__title">
                            <div>{story.title}</div>
                            {/* {handleBookmark()} */}
                        </div>
                        <div className="munchies__category">
                            {story.Category.title}
                        </div>
                        <div className="munchies__author__details">
                            <div>
                                <img src="https://user-images.githubusercontent.com/92604480/165881172-2fecedae-a5c5-4f5c-8084-84afd1d01e9c.svg" alt="" className="user__icon" />
                                {story.User.username}</div>
                            <div className="munchies__date">
                                <AiTwotoneCalendar size={23} />
                                &nbsp;&nbsp;
                                {new Date(story.updatedAt).toDateString()}</div>
                            <div className="munchies__clock">
                                <FiClock size={23} />
                                &nbsp;&nbsp;
                                {story.timeframe}
                            </div>
                        </div>
                        <div className="munchies__recipe">{story.recipe}</div>
                        <div className="munchies__stars">
                            <ReactStars
                                value={Number(storyRating)}
                                size={28}
                                edit={false}
                                color2={'#00D8D8'}
                            />
                        </div>
                    </div>
                    <div className="ingredients__content__container">
                        <div className={`ingredients__subcontainer ${ingredientsContainer}`}>
                            <div>{story.ingredients}</div>
                        </div>
                    </div>
                    <div className="instructions__content__container">
                        <div className={`instructions__subcontainer ${instructionsContainer}`}>
                            <div>{story.instructions}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StoryCard;
