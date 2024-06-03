type Props = {
  intro: string | null;
  outro: string | null;
  videoUrl: string;
  DURATION_IN_FRAMES: number;
};

export const getVideosTimeIntervals = ({
  intro,
  outro,
  DURATION_IN_FRAMES,
  videoUrl,
}: Props) => {
  if (intro && outro) {
    return {
      intro: [0, 150],
      video: [150, DURATION_IN_FRAMES - 150],
      outro: [DURATION_IN_FRAMES - 150, DURATION_IN_FRAMES],
    };
  } else if (intro && !outro) {
    return {
      intro: [0, 150],
      video: [150, DURATION_IN_FRAMES],
      outro: null,
    };
  } else if (!intro && outro) {
    return {
      video: [0, DURATION_IN_FRAMES - 150],
      outro: [DURATION_IN_FRAMES - 150, DURATION_IN_FRAMES],
      intro: null,
    };
  } else if (!intro && !outro && videoUrl) {
    return {
      video: [0, DURATION_IN_FRAMES],
      outro: null,
      intro: null,
    };
  }
  return {
    video: [0, DURATION_IN_FRAMES],
    outro: null,
    intro: null,
  };
};
