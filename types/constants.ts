import { z } from "zod";
export const COMP_NAME = "MyComp";

export const CompositionProps = z.object({
  videoUrl: z.string().url(),
  introUrl: z.string().url().nullable(),
  outroUrl: z.string().url().nullable(),
});

export const defaultMyCompProps: z.infer<typeof CompositionProps> = {
  videoUrl: "https://utfs.io/f/b714e379-638f-434a-b487-bf6bf9988809-fwmnfw.mp4",
  introUrl: null,
  outroUrl: null,
};
