"use client";

import { Player } from "@remotion/player";
import type { NextPage } from "next";
import React, { useMemo, useState } from "react";
import { Main } from "../remotion/MyComp/Main";
import { CompositionProps, defaultMyCompProps } from "../types/constants";
import { z } from "zod";
import { Spacing } from "../components/Spacing";
import UploadComponent from "../components/uploadComponent";
import { RenderControls } from "../components/RenderControls";
import { useConfig } from "../context/configContext";

const container: React.CSSProperties = {
  maxWidth: 768,
  margin: "auto",
  marginBottom: 20,
};

const outer: React.CSSProperties = {
  borderRadius: "var(--geist-border-radius)",
  overflow: "hidden",
  boxShadow: "0 0 200px rgba(0, 0, 0, 0.15)",
  marginBottom: 40,
  marginTop: 60,
};

const player: React.CSSProperties = {
  width: "100%",
};

const Home: NextPage = () => {
  const { config } = useConfig();
  const { VIDEO_WIDTH, VIDEO_HEIGHT, VIDEO_FPS, DURATION_IN_FRAMES } = config;
  const [videoUrl] = useState<string>(defaultMyCompProps.videoUrl); // in case you have to change url
  const [introUrl, setIntroUrl] = useState<string | null>(
    defaultMyCompProps.introUrl
  );
  const [outroUrl, setOutroUrl] = useState<string | null>(
    defaultMyCompProps.outroUrl
  );

  const onIntroUpload = (url: string) => {
    setIntroUrl(url);
  };

  const onOutroUpload = (url: string) => {
    setOutroUrl(url);
  };

  const inputProps: z.infer<typeof CompositionProps> = useMemo(() => {
    return {
      videoUrl,
      introUrl,
      outroUrl,
    };
  }, [videoUrl, introUrl, outroUrl]);

  return (
    <div>
      <div style={container}>
        <div className="cinematics" style={outer}>
          <Player
            component={Main}
            inputProps={inputProps}
            durationInFrames={DURATION_IN_FRAMES}
            fps={VIDEO_FPS}
            compositionHeight={VIDEO_HEIGHT}
            compositionWidth={VIDEO_WIDTH}
            style={player}
            controls
            autoPlay
            loop
          />
          <UploadComponent
            onIntroUpload={onIntroUpload}
            onOutroUpload={onOutroUpload}
            introUrl={introUrl}
            outroUrl={outroUrl}
          />
          <RenderControls inputProps={inputProps}></RenderControls>
        </div>
        <Spacing></Spacing>
        <Spacing></Spacing>
        <Spacing></Spacing>
        <Spacing></Spacing>
      </div>
    </div>
  );
};

export default Home;
