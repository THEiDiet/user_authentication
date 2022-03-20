import {useRef, useState} from 'react'

const IMAGE_RADIUS_CROP_WIDTH = 400

export const useUploadImage = setImage => {
  const filesRef = useRef(null)
  const mediaRef = useRef(null)
  const imageRef = useRef(null)

  const [isGetPhoto, setIsGetPhoto] = useState(false)
  const [isSelfieMode, setIsSelfieMode] = useState(false)

  const onImageLoad = image => {
    const imageData = drawImageIntoCanvas(mediaRef.current, image)
      .toDataURL('image/jpeg', 1.0)
      .split(';base64,')[1]

    setImage(imageData)
    setIsGetPhoto(true)
  }

  const onFileInputChange = e => {
    const reader = new FileReader()
    const file = e.target.files[0]

    reader.readAsDataURL(file)

    reader.onloadend = e => {
      const image = new Image()
      image.src = e.target.result

      image.onload = () => onImageLoad(image)
    }
  }

  const drawImageIntoCanvas = (canvas, file) => {
    const {width, height, src} = file

    const screenWidth = window.innerWidth
    const screenHeight = window.innerHeight
    const size = width > height ? height : width
    const screenSize = screenWidth > screenHeight ? screenHeight : screenWidth

    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(
        navigator.userAgent,
      )
    ) {
      canvas.height = src ? size : screenSize
      canvas.width = src ? size : screenSize
    } else {
      canvas.height = size || IMAGE_RADIUS_CROP_WIDTH
      canvas.width = size || IMAGE_RADIUS_CROP_WIDTH
    }
    const ctx = canvas.getContext('2d')
    const image = imageRef.current

    ctx.drawImage(file, 0, 0)
    image.src = canvas.toDataURL('image/jpeg', 1.0)
    setIsGetPhoto(true)

    return canvas
  }

  const onStartVideoClick = () => {
    navigator.mediaDevices.getUserMedia({
      video: {
        width: 1280,
        height: 720,
        facingMode: 'user',
      },
    })
    setIsSelfieMode(true)
  }

  const takeSnapshot = video => {
    setIsSelfieMode(false)
    const snapData = drawImageIntoCanvas(mediaRef.current, video)
      .toDataURL('image/jpeg', 1.0)
      .split(';base64,')[1]
    setImage(snapData)
  }

  const onResetAvatarClick = () => setIsGetPhoto(false)

  return {
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
  }
}
