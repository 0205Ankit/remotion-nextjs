import { useUploadThing } from "../utils/uploadthing";
import React from "react";

const useSinglePhotoUpload = () => {
  const [photoUrl, setPhotoUrl] = React.useState<string>();
  const [isUploadingPhoto, setIsUploadingPhoto] = React.useState(false);

  const { startUpload } = useUploadThing("imageUploader", {
    onClientUploadComplete: (data) => {
      setIsUploadingPhoto(false);
      setPhotoUrl(data[0]?.url);
    },
    onUploadError: (err) => {
      console.log(err);
    },
    onUploadBegin: () => {
      setIsUploadingPhoto(true);
    },
  });

  const startUploading = (photoFile: File) => {
    void startUpload([photoFile]);
  };

  return {
    startUploading,
    isUploadingPhoto,
    photoUrl,
  };
};

export default useSinglePhotoUpload;
