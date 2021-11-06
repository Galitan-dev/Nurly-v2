import { model, Schema } from "mongoose";

export const userSchema = new Schema({
    _id: { type: String, lowercase: true },
    password: String,
    createdAt: Date,
}, { versionKey: false });

export const User = model("user", userSchema);

export const sessionSchema = new Schema({
    token: String,
    user: { type: String, lowercase: true },
    createdAt: Date,
}, { versionKey: false });

export const Session = model("session", sessionSchema);