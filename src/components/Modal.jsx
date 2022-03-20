import React from 'react'
import './../styles/Modal.css'

const Modal = Component => props => (
  <div className="modalBg">
    <div className="modal">
      <Component {...props}/>
    </div>
  </div>
)

export default Modal