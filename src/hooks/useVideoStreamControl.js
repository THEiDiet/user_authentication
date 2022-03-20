import {useCallback, useEffect, useRef, useState} from 'react'

const MAX_VIDEO_WIDTH = 720
const MAX_TABLET_WIDTH = 768
const MAX_VIDEO_HEIGHT = 405.2

export const useVideoStreamControl = (onClose, takeSnapshot) => {
  const [videoStream, setVideoStream] = useState(null)
  const videoRef = useRef(null)
  const screenWidth = window.innerWidth
  const screenHeight = window.innerHeight

  const videoWidth = screenWidth > MAX_TABLET_WIDTH ? MAX_VIDEO_WIDTH : screenWidth
  const videoHeight = videoWidth === screenWidth ? screenHeight : MAX_VIDEO_HEIGHT

  const fetchVideo = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: videoWidth,
          height: videoHeight,
          facingMode: 'user',
        },
      })

      if (stream) {
        setVideoStream(stream)

        const video = videoRef.current

        video.srcObject = stream
        video.play()
      }
    } catch (e) {
      console.error(e)
    }
  }, [videoWidth, videoHeight])

  const stopVideo = () => {
    const video = videoRef.current

    video.pause()
    video.currentTime = 0
    videoStream.removeTrack(videoStream.getTracks()[0])
  }

  const onButtonSnapshotClick = () => {
    const video = videoRef.current

    takeSnapshot(video)
    stopVideo()
  }

  const onModalCloseClick = () => {
    onClose()
    stopVideo()
  }

  useEffect(() => {
    (async () => {
      await fetchVideo()
    })()
  }, [videoRef, fetchVideo])

  return {
    videoRef,
    onModalCloseClick,
    onButtonSnapshotClick,
  }
}