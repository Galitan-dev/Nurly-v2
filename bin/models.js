"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Session = exports.sessionSchema = exports.User = exports.userSchema = void 0;
var mongoose_1 = require("mongoose");
exports.userSchema = new mongoose_1.Schema({
    _id: { type: String, lowercase: true },
    password: String,
    createdAt: Date,
}, { versionKey: false });
exports.User = mongoose_1.model("user", exports.userSchema);
exports.sessionSchema = new mongoose_1.Schema({
    token: String,
    user: { type: String, lowercase: true },
    createdAt: Date,
}, { versionKey: false });
exports.Session = mongoose_1.model("session", exports.sessionSchema);
