import useVideoThumbnailForm from "../hooks/useVideoThumbnailForm";
import Thumbnails from "./Thumbnails";

const VideoThumbnailsFromUrl = () => {
  const {
    handleGenerateThumbnails,
    handleInputUrlChange,
    handleLoadAssync,
    handleNumberOfThumbnails,
    inputUrl,
    isError,
    loadAssync,
    numberOfThumbnails,
    selectedThumbnail,
    setSelectedThumbnail,
    thumbnails,
  } = useVideoThumbnailForm({
    maxThumbnails: 20,
    type: "url",
  });

  return (
    <div className="fromUrl">
      {inputUrl && (
        <div className="video text-center">
          <video
            src={inputUrl}
            poster={selectedThumbnail || ""}
            controls
          ></video>
        </div>
      )}
      <div className="formgroup">
        <input
          type="url"
          placeholder="Direct URL of video file"
          onChange={handleInputUrlChange}
          value={inputUrl}
        />
        <input
          type="number"
          placeholder="Amount of thumbnails"
          onChange={handleNumberOfThumbnails}
          value={numberOfThumbnails}
        />
        <label>
          <input
            type="checkbox"
            onChange={handleLoadAssync}
            checked={loadAssync}
          />{" "}
          Load asynchronously
        </label>
        <button
          onClick={handleGenerateThumbnails}
          disabled={!(numberOfThumbnails && inputUrl)}
        >
          Generate Thumbnails
        </button>
      </div>
      <div className="thumbnails-container">
        <Thumbnails
          thumbnails={thumbnails}
          selectedThumbnail={selectedThumbnail}
          setSelectedThumbnail={setSelectedThumbnail}
          isError={isError}
        />
      </div>
    </div>
  );
};

export default VideoThumbnailsFromUrl;
