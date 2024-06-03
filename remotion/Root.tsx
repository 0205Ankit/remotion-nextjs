import { Composition } from "remotion";
import { Main } from "./MyComp/Main";
import { COMP_NAME, defaultMyCompProps } from "../types/constants";
import { ConfigProvider, useConfig } from "../context/configContext";

export const RemotionRootWithProvider: React.FC = () => {
  return (
    <ConfigProvider>
      <RemotionRoot />
    </ConfigProvider>
  );
};

export const RemotionRoot: React.FC = () => {
  const { config } = useConfig();

  const { DURATION_IN_FRAMES, VIDEO_WIDTH, VIDEO_HEIGHT, VIDEO_FPS } = config;
  return (
    <>
      <Composition
        id={COMP_NAME}
        component={Main}
        durationInFrames={DURATION_IN_FRAMES}
        fps={VIDEO_FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
        defaultProps={defaultMyCompProps}
      />
    </>
  );
};
