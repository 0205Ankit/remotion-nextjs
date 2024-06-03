/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { loadFont, fontFamily } from "@remotion/google-fonts/Inter";
import { MdCloudUpload } from "react-icons/md";
import Image from "next/image";
import useVideoUpload from "../hooks/useVideoUpload";
import LoadingScreen from "./loading-screen";
import useSinglePhotoUpload from "../hooks/usePhotoUpload";

loadFont();

const input: React.CSSProperties = {
  display: "none",
};

const label: React.CSSProperties = {
  color: "white",
  fontFamily: fontFamily,
  width: "50%",
  fontSize: 18,
  fontWeight: "bold",
  padding: 10,
  paddingInline: 30,
  display: "flex",
  justifyContent: "space-evenly",
  alignItems: "center",
  borderRadius: 5,
  border: "1px solid white",
  cursor: "pointer",
  marginTop: 10,
};

const container: React.CSSProperties = {
  display: "flex",
  gap: 20,
  marginTop: 50,
};

const icon: React.CSSProperties = {
  fontSize: 100,
  color: "white",
};

const image: React.CSSProperties = {
  width: 100,
  objectFit: "cover",
  fontSize: 10,
  borderRadius: 5,
};

const UploadComponent: React.FC<{
  onIntroUpload: (url: string) => void;
  onOutroUpload: (url: string) => void;
  introUrl: string | null;
  outroUrl: string | null;
}> = ({ onIntroUpload, onOutroUpload, introUrl, outroUrl }) => {
  const {
    isUploadingVideo,
    startUploading: startUploadingVideo,
    videoUrl,
  } = useVideoUpload();
  const {
    isUploadingPhoto,
    startUploading: startUploadingPhoto,
    photoUrl,
  } = useSinglePhotoUpload();

  const [uploadedFileType, setUploadedFileType] = React.useState<
    "intro" | "outro"
  >("intro");

  useEffect(() => {
    if (videoUrl) {
      if (uploadedFileType === "intro") {
        onIntroUpload(videoUrl);
      } else {
        onOutroUpload(videoUrl);
      }
    }
  }, [videoUrl]);

  useEffect(() => {
    if (photoUrl) {
      if (uploadedFileType === "intro") {
        onIntroUpload(photoUrl);
      } else {
        onOutroUpload(photoUrl);
      }
    }
  }, [photoUrl]);

  const handleIntroUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    const file = files ? files[0] : null;
    setUploadedFileType("intro");

    if (!file) return;
    if (file.type.includes("video")) {
      startUploadingVideo(file);
    } else {
      startUploadingPhoto(file);
    }
  };

  const handleOutroUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    const file = files ? files[0] : null;
    setUploadedFileType("outro");

    if (!file) return;
    if (file.type.includes("video")) {
      startUploadingVideo(file);
    } else {
      startUploadingPhoto(file);
    }
  };

  return (
    <>
      {(isUploadingVideo || isUploadingPhoto) && <LoadingScreen />}
      <div style={container}>
        <input
          style={input}
          type="file"
          id="intro"
          accept="video/mp4,image/*"
          onChange={handleIntroUpload}
        />
        <label htmlFor="intro" style={label}>
          <p>
            Intro <br /> Video/Image
          </p>
          {introUrl ? (
            <Image
              alt={`${introUrl}`}
              style={image}
              src={introUrl}
              width={100}
              height={100}
            />
          ) : (
            <MdCloudUpload style={icon} />
          )}
        </label>

        <input
          type="file"
          accept="video/mp4,image/*"
          style={input}
          id="outro"
          onChange={handleOutroUpload}
        />
        <label htmlFor="outro" style={label}>
          <p>
            Outro <br /> Video/Image
          </p>
          {outroUrl ? (
            <Image
              alt={`${outroUrl}`}
              style={image}
              src={outroUrl}
              width={100}
              height={100}
            />
          ) : (
            <MdCloudUpload style={icon} />
          )}
        </label>
      </div>
    </>
  );
};

export default UploadComponent;
