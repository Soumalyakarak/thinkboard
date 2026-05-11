import mongoose from "mongoose";

const canvasSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      default: "Untitled Canvas",
      trim: true,
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    isPublic: {
      type: Boolean,
      default: false,
    },

    sharedWith: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    elements: [
      {
        type: mongoose.Schema.Types.Mixed,
      },
    ],
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);

export default mongoose.model("Canvas", canvasSchema);
