import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import StoryForm from '../StoryFormPage';
// import StoryList from '../StoryList';
// import StoryView from '../StoryView';
// import "./EditFormModal.css";


function EditFormModal({ storyId }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button
                className="btn__edit__modal"
                onClick={() => setShowModal(true)}
            >
                <i className="fa-solid fa-pencil"></i>
            </button>
            {showModal && (
                <Modal
                    onClose={() => setShowModal(false)}
                >
                    <StoryForm props={{ edit: true, setShowModal, storyId }} />
                    {/* <StoryList />
                    <StoryView /> */}

                </Modal>
            )}
        </>
    );
}

export default EditFormModal;
