import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { createComment, deleteComment } from "../../store/comments";
import "./comments.css"

const CommentForm = () => {
    const dispatch = useDispatch();
    const [content, setContent] = useState("");
    const [errors, setErrors] = useState([]);
    const comments = useSelector(state => Object.values(state.comments));
    const sessionUser = useSelector(state => state.session.user);
    const history = useHistory();

    if (!sessionUser) {
        history.push("/home")
    }

    useEffect(() => {
        dispatch(createComment());
    }, [dispatch]);

    const addCommet = async (e) => {
        e.prevenDefault();

    }

    useEffect(() => {
        const errors = [];
        if (content.length < 50) {
            errors.push("Content must be 5 or more characters")
        }
    })

    const handleSubmit = async (e) => {
        e.prevenDefault();
    }

    return (
        <>
            <div className="comment__container">
                <h4>COMMENT FORM</h4>
                <div>

                </div>
            </div>
        </>
    )
}

export default CommentForm;
