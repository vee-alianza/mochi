import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import StoryForm from '../StoryFormPage';
import "./EditFormModal.css";


function EditFormModal({ storyId }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button onClick={() => setShowModal(true)}>Edit</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <StoryForm props={{ edit: true, setShowModal, storyId }} />
                </Modal>
            )}
        </>
    );
}

export default EditFormModal;
