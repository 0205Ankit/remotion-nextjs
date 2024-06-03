import { useUploadThing } from "../utils/uploadthing";
import React from "react";

const useVideoUpload = () => {
  const [videoUrl, setVideoUrl] = React.useState<string>();
  const [isUploadingVideo, setIsUploadingVideo] = React.useState(false);

  const { startUpload } = useUploadThing("videoUploader", {
    onClientUploadComplete: (data) => {
      setIsUploadingVideo(false);
      setVideoUrl(data[0]?.url);
    },
    onUploadError: (err) => {
      console.log(err);
    },
    onUploadBegin: () => {
      setIsUploadingVideo(true);
    },
  });

  const startUploading = (videoFile: File) => {
    void startUpload([videoFile]);
  };

  return {
    startUploading,
    isUploadingVideo,
    videoUrl,
  };
};

export default useVideoUpload;
