import React, {useEffect, useRef, useState} from 'react';
import Modal from "./Modal";
import {Button} from "antd";

const Selfie = ({takeSnap, onClose}) => {
    let [a,setA] = useState()
    const videoRef = useRef(null)
    const screenWidth = window.innerWidth
    const screenHeight = window.innerHeight

    const videoWidth = screenWidth > 768 ? 720 : screenWidth
    const videoHeight =videoWidth === screenWidth ? screenHeight : 405.2

    const getVideo = () => {
        navigator.mediaDevices.getUserMedia({video: {width: videoWidth, height: videoHeight, facingMode: 'user'}})
            .then(stream => {
                setA(stream)
                let video = videoRef.current
                video.srcObject = stream
                video.play()

            }).catch(err => {
            console.error(err)
        })
    }
    const stopVideo = () => {
        let video = videoRef.current
        video.pause()
        video.currentTime = 0
        a.removeTrack(a.getTracks()[0])
    }
    const takePhoto = () => {
        let video = videoRef.current
        takeSnap(video)
        stopVideo()
    }
    const onCloseHandler = ()=>{
        onClose()
        stopVideo()
    }
    useEffect(() => {
        getVideo()
    }, [videoRef])
    return (
        <div className='camera'>
            <video ref={videoRef} className='video'/>
            <div className='buttons'>
                <Button type={'primary'} onClick={takePhoto}>snap</Button>
                <Button  onClick={onCloseHandler}>close</Button>
            </div>
        </div>
    )
};

export default Modal(Selfie);