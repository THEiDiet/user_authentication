import React from 'react'
import Modal from './Modal'
import {Button} from 'antd'
import {useVideoStreamControl} from '../hooks'

const Selfie = ({takeSnapshot, onClose}) => {
  const {videoRef, onModalCloseClick, onButtonSnapshotClick} = useVideoStreamControl(
    onClose,
    takeSnapshot,
  )
  return (
    <div className="camera">
      <video ref={videoRef} className="video"/>
      <div className="buttons">
        <Button type={'primary'} onClick={onButtonSnapshotClick}>snap</Button>
        <Button onClick={onModalCloseClick}>close</Button>
      </div>
    </div>
  )
}

export default Modal(Selfie)