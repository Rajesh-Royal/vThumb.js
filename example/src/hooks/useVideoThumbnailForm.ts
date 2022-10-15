import { useState } from "react";

const vThumb = require("./video-thumbnails-generator").default;
const { generateVideoThumbnails, importFileandPreview } = vThumb;

type useVideoThumbnailFormProps = {
  maxThumbnails: number;
  type: "url" | "file";
};

const useVideoThumbnailForm = (props: useVideoThumbnailFormProps) => {
  const { maxThumbnails, type } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");

  const [inputUrl, setInputUrl] = useState<string>("");
  const [inputFile, setInputFile] = useState<File | null>(null);

  const [numberOfThumbnails, setNumberOfThumbnails] = useState(0);
  const [thumbnails, setThumbnails] = useState<string[]>();
  const [loadAssync, setLoadAssync] = useState(false);
  const [selectedThumbnail, setSelectedThumbnail] = useState<string>();

  const clearForm = () => {
    setNumberOfThumbnails(0);
    setSelectedThumbnail("");
    setInputFile(null);
    setInputUrl("");
    setIsError("");
  };

  const handleInputUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    clearForm();
    setInputUrl(event.target.value);
  };

  const handleInputFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = event.target?.files?.[0];
    if (selectedFile?.type.includes("video")) {
      clearForm();

      importFileandPreview(selectedFile).then((url: string) => {
        setInputFile(selectedFile);
        setInputUrl(url);
      });
    }
  };

  const handleNumberOfThumbnails = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value);
    setNumberOfThumbnails(newValue > maxThumbnails ? maxThumbnails : newValue);
  };

  const handleLoadAssync = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoadAssync(e.target.checked);
  };

  const updateThumbnails = (url: string, index: number) => {
    setThumbnails((prev) => {
      const newThumbnails = [...prev!];
      newThumbnails[index] = url;
      return newThumbnails;
    });
  };

  const handleGenerateThumbnails = async () => {
    const input = type === "url" ? inputUrl : inputFile;

    const callback = loadAssync ? updateThumbnails : undefined;
    setThumbnails(loadAssync ? Array(numberOfThumbnails).fill("") : [""]);

    setIsError("");
    setIsLoading(true);

    generateVideoThumbnails(input as any, numberOfThumbnails, type, callback)
      .then((res: string[]) => {
        setThumbnails(res);
      })
      .catch((err: any) => {
        setIsError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return {
    handleGenerateThumbnails,
    handleLoadAssync,
    handleNumberOfThumbnails,
    inputUrl,
    isError,
    isLoading,
    loadAssync,
    numberOfThumbnails,
    selectedThumbnail,
    setInputUrl,
    setIsError,
    setSelectedThumbnail,
    thumbnails,
    handleInputUrlChange,
    handleInputFileChange,
  };
};

export default useVideoThumbnailForm;
