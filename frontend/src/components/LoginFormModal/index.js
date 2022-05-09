import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';
import './LoginForm.css';


function LoginFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div>
        <button
          className="login__btn__modal"
          onClick={() => setShowModal(true)}
        >
          Log In
        </button>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <LoginForm setShowModal={setShowModal} />
          </Modal>
        )}
      </div>
    </>
  );
}

export default LoginFormModal;
