// import mongoose, { Schema } from "mongoose";
import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
    writer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Writer",
        required: true,

    },
    title: {
        type: String,
        required: [true, "Please enter title"],
        unique: true,
    },

    body: {
        type: String,
    },
    tags: {
        type: String,
    },
    created_at: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true,
});

export const Blog = mongoose.models.User || mongoose.model("Blog", blogSchema); 
