import mongoose, { Schema, model, models } from "mongoose";

// ✅ Fixed typo: DIMENSIONS (not DIMENSIOS)
export const VIDEO_DIMENSIONS = {
  width: 1080,
  height: 1920,
} as const;

export interface IVideo {
  _id?: mongoose.Types.ObjectId;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  controls?: boolean;
  transformation?: {
    height: number;
    width: number;
    quality?: number;
  };
}

const videoSchema = new Schema<IVideo>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    videoUrl: { type: String, required: true },
    thumbnailUrl: { type: String, required: true },

    // ✅ Fixed typo: `efault` → `default`
    controls: { type: Boolean, default: true },

    transformation: {
      // ✅ Fixed line breaks & typo
      height: { type: Number, default: VIDEO_DIMENSIONS.height },
      width: { type: Number, default: VIDEO_DIMENSIONS.width },
      quality: { type: Number, min: 1, max: 100 },
    },
  },
  {
    timestamps: true,
  }
);

// ✅ Avoids model overwrite on hot reloads
const Video = models?.Video || model<IVideo>("Video", videoSchema);
export default Video;
