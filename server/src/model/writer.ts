import mongoose from "mongoose";

const writerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "please enter a name."],
    },
    email: {
        type: String,
        required: [true, "Please enter your email."],
        unique: true,
    },
    contact: {
        type: Number,
        required: [true, "Please enter your contact number."],
    },
    address: {
        type: String,
        required: [true, "Please enter your address."],
    },
    password: {
        type: String,
        required: [true, "Please enter password"],
    },
    img: {
        type: String,
    },
    role: {
        type: String,
        enum: ['user', 'writer', 'admin'],
        required: true,
        default: ['user']
    },
    permissions: {
        type: [String],
        default: ['user']
    },
    created_at: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true,
});

export const Writer = mongoose.models.Writer || mongoose.model("Writer", writerSchema);