import { generateVideoThumbnails } from '@rajesh896/video-thumbnails-generator';
import React, { useState } from 'react';
import loadingSVG from '../assets/loading.svg';


const VideoThumbnailsFromUrl = () => {
  const [inputUrl, setInputUrl] = useState<string >("")
  const [numberOfThumbnails, setNumberOfThumbnails] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");
  const [thumbnails, setThumbnails] = useState<string[]>();
  const [selectedThumbnail, setselectedThumbnail] = useState<string>();
  
  return (
    <div className='fromUrl'>
      {inputUrl && <div className="video text-center">
        <video src={inputUrl} poster={selectedThumbnail || ""} controls></video>
      </div>}
      <div className="formgroup">
        <input type={"url"} onChange={(e) => {
            setInputUrl(e.target.value)
        }} placeholder="Direct URL of video file"/>
        <input type={"number"} placeholder="Amount of thumbnails"
          onChange={(e) => {
          if(parseInt( e.target.value) > 20) return
            setNumberOfThumbnails(parseInt(e.target.value))
          }}
          max={"20"} value={numberOfThumbnails} />
        <button onClick={() => {
          if (inputUrl) {
            setIsLoading(true);
            setIsError("")
            generateVideoThumbnails(inputUrl as unknown as File, numberOfThumbnails, "url").then((res) => {
              setIsLoading(false);
              setThumbnails(res);
            }).catch((Err) => {
              setIsError(Err)
              setIsLoading(false);
            })
          }
        
        }}
        disabled={inputUrl ? false : true}
        >Generate Thumbnails</button>
      </div>
      <div className="thumbnails-container">
        {!isLoading ? thumbnails?.map((image, index) => {
          return <img src={image} alt="thumbnails" className={`width-100 ${image === selectedThumbnail ? "active" : ""}`} style={{ maxWidth: 200 }} key={index} onClick={() => setselectedThumbnail(image)}/>
        }) : <img src={loadingSVG} alt="" className='no-border' />}
        {isError && <pre style={{maxWidth: 800, margin: "auto", overflow: "auto"}}>{JSON.stringify(isError, undefined, 2)} </pre>}
      </div>
    </div>
  )
}

export default VideoThumbnailsFromUrl