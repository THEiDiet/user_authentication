import React, {useRef, useState} from 'react';
import Selfie from "./Selfie";
import  './../styles/Avatar.css'
import {Button} from "antd";

const UploadImage = ({setImage}) => {
    const [isGetPhoto,setIsGetPhoto] = useState(false)
    const mediaRef = useRef(null)
    const files = useRef(null)
    const imageRef = useRef(null)

    const onChangeFileInput = (e) => {
        const reader = new FileReader()
        const file = e.target.files[0]
        reader.readAsDataURL(file)
        reader.onloadend = (e) => {
            let img = new Image()
            img.src = e.target.result
            img.onload = () => {
                let imgData = drawImageIntoCanvas(mediaRef.current, img).toDataURL('image/jpeg', 1.0).split(';base64,')[1]
                setImage(imgData)
                setIsGetPhoto(true)
            }
        }
    }
    let drawImageIntoCanvas = (canvas, file) => {
        const screenWidth = window.innerWidth
        const screenHeight = window.innerHeight
        let size= file.width > file.height ? file.height : file.width
        let screenSize= screenWidth > screenHeight ? screenHeight : screenWidth
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
            canvas.height =file.src ? size : screenSize
            canvas.width  = file.src ? size: screenSize
         } else {
            canvas.height = size || 400
            canvas.width =  size || 400
        }
        let ctx = canvas.getContext('2d')
        ctx.drawImage(file,0, 0)
        let image = imageRef.current
        image.src = canvas.toDataURL('image/jpeg', 1.0)
        setIsGetPhoto(true)
        return canvas
    }

    const [selfieMode, setSelfieMode] = useState(false)
    const startVideo = () => {
        navigator.mediaDevices.getUserMedia({
            video: {
                width: 1280,
                height: 720,
                facingMode: 'user'
            }
        })
        setSelfieMode(true)
    }
    const takeSnap = (video)=>{
        setSelfieMode(false)
        let snapData = drawImageIntoCanvas(mediaRef.current,video).toDataURL('image/jpeg', 1.0).split(';base64,')[1]
        setImage(snapData)
    }
    const chooseAnother = () => {
        setIsGetPhoto(false)
    }
    return (
        <div className='uploadPhoto'>
            {selfieMode && <Selfie takeSnap={takeSnap} onClose={()=>setSelfieMode(false)} setImage={setImage}/>}
            <div className='canvasContainer'>
                <input onChange={onChangeFileInput} className='fileInput' ref={files} type="file" id='fileInput'/>
                <label className={`fileInputLabel ${isGetPhoto ? 'labelHidden' : ''}`} htmlFor="fileInput"><span>Download photo</span></label>
                <canvas className='canvas' ref={mediaRef}/>
                <img ref={imageRef}  className='canvas-image' alt=""/>
            </div>
            {!isGetPhoto && <Button  onClick={startVideo} >make selfie</Button>}
            {isGetPhoto && <Button onClick={chooseAnother}>choose another photo</Button>}
        </div>
    );
};

export default UploadImage;
