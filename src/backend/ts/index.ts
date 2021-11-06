import { json as jsonParser } from "body-parser";
import { error, log } from 'console';
import express from "express";
import { createServer } from "http";
import mongoose from "mongoose";
import { join as joinPath } from "path";
import useApi from "./api";

const port = process.env.PORT || 3000;
const mongoUri = process.env.MONGODB_URI || "mongodb://172.17.0.4:27017/nurly"

const app = express();
const server = createServer(app);

app.use(express.static(joinPath(__dirname, "www"), { extensions: [ "html", "js" ], redirect: true, index: [ "index.html" ] }));
app.use(jsonParser({ strict: true }));

useApi(app);

app.get("/*", (req, res) => {
    res.redirect("/notfound.html");
});

console.log("Connecting to Mongo database...");
mongoose.connect(<string> mongoUri);
const db = mongoose.connection;

db.on('error', err => error("MongoDB connection error:", err));
db.on('open', () => {
    log("Connected!");
    log("Starting server...")
    server.listen(port, () => console.log("Server listening on port", port, "!"));
});