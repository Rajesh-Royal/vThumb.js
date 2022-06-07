import React, { useState } from 'react';
import './App.css';
import VthumbLogo from "./assets/fevicon.png";
import Footer from './components/Footer';
import VideoThumbnailsFromFile from './components/VideoThumbnailsFromFile';
import VideoThumbnailsFromUrl from './components/VideoThumbnailsFromUrl';

function App() {
  const [thumbSourceType, setThumbSourceType] = useState<"File" | "Url" | null>(null)
  
  return (
    <div className="App">
      <header>
        <div className="app-header text-center">
        <img src={VthumbLogo} alt="fevicon"/> <p>VThumb.js</p>
      </div>
      <p className='text-center'>The smallest library to generate video thumbnails on client side.</p>
      </header>
      <div className="action-container">
        {thumbSourceType === null && <div className="options">
          <p className="text-center">Generate Thumbnail From</p>
          <div className="buttons-container text-center">
            <button onClick={() =>  setThumbSourceType("File")}>File</button>
            <button onClick={() => setThumbSourceType("Url")}>Url</button>
          </div>
        </div>}
        <div className="components-container">
          {thumbSourceType === "File" && <VideoThumbnailsFromFile />}
          {thumbSourceType === "Url" && <VideoThumbnailsFromUrl />}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
