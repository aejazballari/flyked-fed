/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
import React from 'react';

export default function ModalPopup({ show, closeModalHandler, children }) {
  return (
    <div
      className="modal-wrapper"
      style={{ opacity: show ? '1' : '0' }}
    >
      <div className="modal-header">
        <span className="close-modal-btn" onClick={closeModalHandler}>X</span>
      </div>
      <div className="moal-content">
        {children}
      </div>
    </div>
  );
}
