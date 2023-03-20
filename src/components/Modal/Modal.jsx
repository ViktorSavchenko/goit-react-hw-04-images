import { useEffect} from "react";
import PropTypes from 'prop-types';
import {createPortal} from "react-dom";
import './Modal.css'

const modalRoot = document.querySelector('#modal-root');

function Modal({ onToggleModalShow, children }) {
  useEffect(() => { document.addEventListener('keydown', onEscModalClose);
  return () => document.removeEventListener('keydown', onEscModalClose);
  });

  const onEscModalClose = e => {
    if (e.code === 'Escape') {
      onToggleModalShow();
    };
  };
  
  const onBackdropModalClose = e => {
    if (e.currentTarget === e.target) {
      onToggleModalShow();
    };
  };
     
  return createPortal(
    <div className="Overlay" onClick={onBackdropModalClose}>
      <div className="Modal">
        <img src={children} alt="" />
      </div>
    </div>, modalRoot);
}; 

Modal.propTypes = {
  onToggleModalShow: PropTypes.func.isRequired,
};

export default Modal;