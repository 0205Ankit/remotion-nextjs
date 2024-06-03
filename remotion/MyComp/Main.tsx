/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { AbsoluteFill, Img, Sequence, Video } from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";
import React, { useEffect, useMemo } from "react";
import { useConfig } from "../../context/configContext";
import { getVideosTimeIntervals } from "../../utils/remotion";

loadFont();

const container: React.CSSProperties = {
  backgroundColor: "white",
};

type MainProps = {
  videoUrl: string;
  introUrl: string | null;
  outroUrl: string | null;
};

export const Main = ({ videoUrl, introUrl, outroUrl }: MainProps) => {
  const { config, setConfig } = useConfig();
  const intro = useMemo(() => introUrl, [introUrl]);
  const outro = useMemo(() => outroUrl, [outroUrl]);

  const videosTimeIntervals = useMemo(() => {
    return getVideosTimeIntervals({
      intro,
      outro,
      DURATION_IN_FRAMES: config.DURATION_IN_FRAMES,
      videoUrl,
    });
  }, [intro, outro, config.DURATION_IN_FRAMES, videoUrl]);

  useEffect(() => {
    if (intro) {
      setConfig({
        ...config,
        DURATION_IN_FRAMES: config.DURATION_IN_FRAMES + 150,
      });
    }
  }, [intro]);

  useEffect(() => {
    if (outro) {
      setConfig({
        ...config,
        DURATION_IN_FRAMES: config.DURATION_IN_FRAMES + 150,
      });
    }
  }, [outro]);

  return (
    <AbsoluteFill style={container}>
      {intro && (
        <Sequence
          from={videosTimeIntervals.intro ? videosTimeIntervals.intro[0] : 0}
          durationInFrames={
            videosTimeIntervals.intro
              ? videosTimeIntervals.intro[1] - videosTimeIntervals.intro[0]
              : 120
          }
        >
          <AbsoluteFill>
            {intro.endsWith(".mp4") ? (
              <Video src={intro} />
            ) : (
              <Img src={intro} />
            )}
          </AbsoluteFill>
        </Sequence>
      )}
      <Sequence
        from={videosTimeIntervals.video ? videosTimeIntervals.video[0] : 0}
        durationInFrames={
          videosTimeIntervals.video
            ? videosTimeIntervals.video[1] - videosTimeIntervals.video[0]
            : 120
        }
      >
        <AbsoluteFill>
          <Video src={videoUrl} />
        </AbsoluteFill>
      </Sequence>
      {outro && (
        <Sequence
          from={videosTimeIntervals.outro ? videosTimeIntervals.outro[0] : 0}
          durationInFrames={
            videosTimeIntervals.outro
              ? videosTimeIntervals.outro[1] - videosTimeIntervals.outro[0]
              : 120
          }
        >
          <AbsoluteFill>
            {outro.endsWith(".mp4") ? (
              <Video src={outro} />
            ) : (
              <Img src={outro} />
            )}
          </AbsoluteFill>
        </Sequence>
      )}
    </AbsoluteFill>
  );
};
