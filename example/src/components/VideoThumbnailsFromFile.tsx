import { generateVideoThumbnails, importFileandPreview } from '@rajesh896/video-thumbnails-generator';
import React, { useEffect, useState } from 'react';
import loadingSVG from '../assets/loading.svg';


const VideoThumbnailsFromFile = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [numberOfThumbnails, setNumberOfThumbnails] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [thumbnails, setThumbnails] = useState<string[]>();
  const [selectedThumbnail, setselectedThumbnail] = useState<string>();
  const [videoPreview, setVideoPreview] = useState("");

  useEffect(() => {
    if (selectedFile) {
      setselectedThumbnail("")
      setNumberOfThumbnails(0)
      setThumbnails([])
      importFileandPreview(selectedFile).then((url) => {
        setVideoPreview(url)
      })
    }
    return () => {
      window.URL.revokeObjectURL(videoPreview)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFile])
  
  return (
    <div className='fromfile'>
      {videoPreview && <div className="video text-center">
        <video src={videoPreview} poster={selectedThumbnail || ""} controls></video>
      </div>}
      <div className="formgroup">
        <input type={"file"} onChange={(e) => {
          if (e.target.files && e.target.files?.length! > 0 && e.target.files?.[0]?.type.includes("video")) {
            setSelectedFile(e.target.files[0])
          }
        }}  accept="video/*"/>
        <input type={"number"} placeholder="Amount of thumbnails"
          onChange={(e) => {
          if(parseInt( e.target.value) > 20) return
            setNumberOfThumbnails(parseInt(e.target.value))
          }}
          max={"20"} value={numberOfThumbnails} />
        <button onClick={() => {
          if (selectedFile) {
            setIsLoading(true);
            generateVideoThumbnails(selectedFile, numberOfThumbnails, "file").then((res) => {
              setIsLoading(false);
              setThumbnails(res);
            }).catch((Err) => {
              console.log('Err', Err)
              setIsLoading(false);
            })
          }
        
        }}
        disabled={selectedFile ? false : true}
        >Generate Thumbnails</button>
      </div>
      <div className="thumbnails-container">
        {!isLoading ? thumbnails?.map((image, index) => {
          return <img src={image} alt="thumbnails" className={`width-100 ${image === selectedThumbnail ? "active" : ""}`} style={{ maxWidth: 200 }} key={index} onClick={() => setselectedThumbnail(image)}/>
        }):  <img src={loadingSVG} alt="" className='no-border'/>}
      </div>
    </div>
  )
}

export default VideoThumbnailsFromFile