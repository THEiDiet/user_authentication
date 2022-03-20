import React, {useContext} from 'react'
import Selfie from './Selfie'
import './../styles/Avatar.css'
import {Button} from 'antd'
import {useUploadImage} from '../hooks'
import {Context} from '../services'

const UploadImage = ({setImage}) => {
  const {theme} = useContext(Context)
  const {
    filesRef,
    mediaRef,
    imageRef,
    isGetPhoto,
    isSelfieMode,
    setIsSelfieMode,
    takeSnapshot,
    onFileInputChange,
    onStartVideoClick,
    onResetAvatarClick,
  } = useUploadImage(setImage)
  return (
    <div className="uploadPhoto">
      {isSelfieMode && <Selfie takeSnap={takeSnapshot} onClose={() => setIsSelfieMode(false)} setImage={setImage}/>}
      <div className="canvasContainer">
        <input onChange={onFileInputChange} className="fileInput" ref={filesRef} type="file" id="fileInput"/>
        <label className={`fileInputLabel ${isGetPhoto ? 'labelHidden' : ''}`}
               htmlFor="fileInput" style={{color: theme.accent, borderColor: theme.accent, background: theme.second}}
        ><span>Download photo</span></label>
        <canvas className="canvas" ref={mediaRef}/>
        <img ref={imageRef} className="canvas-image" alt=""/>
      </div>
      {!isGetPhoto && <Button onClick={onStartVideoClick}
                              style={{color: theme.accent, borderColor: theme.accent, background: theme.second}}>make
        selfie</Button>}
      {isGetPhoto && <Button onClick={onResetAvatarClick}
                             style={{color: theme.accent, borderColor: theme.accent, background: theme.second}}>choose
        another photo</Button>}
    </div>
  )
}

export default UploadImage
