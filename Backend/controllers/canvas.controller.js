import Canvas from "../models/canvas.model.js";
import User from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";

export const createCanvas = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { name } = req.body;

    const canvas = await Canvas.create({
      name: name?.trim() || "Untitled Canvas",
      owner: userId,
      sharedWith: [],
      elements: [],
      isPublic: false,
    });

    res.status(201).json({
      success: true,
      message: "Canvas created successfully",
      canvas: {
        id: canvas._id,
        name: canvas.name,
        createdAt: canvas.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getAllCanvases = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const canvases = await Canvas.find({
      $or: [
        { owner: userId },
        { sharedWith: userId },
        { isPublic: true },
      ],
    })
      .select("_id name owner createdAt updatedAt")
      .sort({ updatedAt: -1 });

    res.status(200).json({
      success: true,
      count: canvases.length,
      canvases,
    });
  } catch (error) {
    next(error);
  }
};

export const loadCanvas = async (req, res, next) => {
  try {
    const { canvasId } = req.params;
    const userId = req.user.id;

    const canvas = await Canvas.findById(canvasId);
    if (!canvas) {
      throw new ApiError(404, "Canvas not found");
    }

    const isOwner = canvas.owner.toString() === userId;
    const isShared = canvas.sharedWith.some(
      (id) => id.toString() === userId
    );

    if (!isOwner && !isShared && !canvas.isPublic) {
      throw new ApiError(403, "You do not have access to this canvas");
    }

    res.status(200).json({
      success: true,
      canvas,
    });
  } catch (error) {
    next(error);
  }
};


export const updateCanvas = async (req, res, next) => {
  try {
    const { canvasId } = req.params;
    const { elements } = req.body;
    const userId = req.user.id;

    if (!Array.isArray(elements)) {
      throw new ApiError(400, "Invalid canvas elements");
    }

    const canvas = await Canvas.findById(canvasId);
    if (!canvas) {
      throw new ApiError(404, "Canvas not found");
    }

    const isOwner = canvas.owner.toString() === userId;
    const isShared = canvas.sharedWith.some(
      (id) => id.toString() === userId
    );

    if (!isOwner && !isShared) {
      throw new ApiError(403, "Unauthorized to update this canvas");
    }

    canvas.elements = elements;
    await canvas.save();

    res.status(200).json({
      success: true,
      message: "Canvas updated successfully",
      canvas: {
        id: canvas._id,
        updatedAt: canvas.updatedAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const shareCanvas = async (req, res, next) => {
  try {
    const { canvasId } = req.params;
    const { email } = req.body;
    const userId = req.user.id; // authenticated user

    if (!email) {
      throw new ApiError(400, "Email is required");
    }

    // 1️⃣ Find canvas
    const canvas = await Canvas.findById(canvasId);
    if (!canvas) {
      throw new ApiError(404, "Canvas not found");
    }

    // 2️⃣ Only owner can share
    if (canvas.owner.toString() !== userId) {
      throw new ApiError(403, "Only the owner can share this canvas");
    }

    // 3️⃣ Find user by email
    const userToShare = await User.findOne({ email });
    if (!userToShare) {
      throw new ApiError(404, "User with this email does not exist");
    }

    // 4️⃣ Owner cannot add themselves
    if (userToShare._id.toString() === userId) {
      throw new ApiError(400, "You cannot share the canvas with yourself");
    }

    // 5️⃣ Prevent duplicate sharing
    const alreadyShared = canvas.sharedWith.some(
      (id) => id.toString() === userToShare._id.toString()
    );

    if (alreadyShared) {
      throw new ApiError(409, "User already has access to this canvas");
    }

    // 6️⃣ Add user to sharedWith
    canvas.sharedWith.push(userToShare._id);
    await canvas.save();

    res.status(200).json({
      success: true,
      message: "Canvas shared successfully",
      sharedWith: {
        id: userToShare._id,
        email: userToShare.email,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const deleteCanvas = async (req, res, next) => {
  try {
    const { canvasId } = req.params;
    const userId = req.user.id;

    const canvas = await Canvas.findById(canvasId);
    if (!canvas) {
      throw new ApiError(404, "Canvas not found");
    }

    // Only owner can delete
    if (canvas.owner.toString() !== userId) {
      throw new ApiError(403, "Only the owner can delete this canvas");
    }

    await Canvas.findByIdAndDelete(canvasId);

    res.status(200).json({
      success: true,
      message: "Canvas deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};






