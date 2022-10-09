import loadingSVG from "../assets/loading.svg";

type ThumbnailsProps = {
  setSelectedThumbnail: (thumbnail: string) => void;
  selectedThumbnail?: string;
  thumbnails?: string[];
  isError?: string;
};

const Thumbnails = (props: ThumbnailsProps) => {
  const {
    thumbnails = [],
    selectedThumbnail,
    setSelectedThumbnail,
    isError,
  } = props;

  if (isError) {
    return (
      <pre style={{ maxWidth: 800, margin: "auto", overflow: "auto" }}>
        {JSON.stringify(isError, undefined, 2)}
      </pre>
    );
  }

  return (
    <>
      {thumbnails?.map((image, index) => {
        if (image === "") {
          return (
            <img
              key={`loader_${index}`}
              src={loadingSVG}
              className="no-border"
              alt=""
            />
          );
        }

        return (
          <img
            src={image}
            alt="thumbnails"
            className={`width-100 ${
              image === selectedThumbnail ? "active" : ""
            }`}
            style={{ maxWidth: 200 }}
            key={`thumb_${index}`}
            onClick={() => setSelectedThumbnail(image)}
          />
        );
      })}
    </>
  );
};

export default Thumbnails;
