"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var body_parser_1 = require("body-parser");
var console_1 = require("console");
var express_1 = __importDefault(require("express"));
var http_1 = require("http");
var mongoose_1 = __importDefault(require("mongoose"));
var path_1 = require("path");
var api_1 = __importDefault(require("./api"));
var port = process.env.PORT || 3000;
var mongoUri = process.env.MONGODB_URI || "mongodb://172.17.0.4:27017/nurly";
var app = express_1.default();
var server = http_1.createServer(app);
app.use(express_1.default.static(path_1.join(__dirname, "www"), { extensions: ["html", "js"], redirect: true, index: ["index.html"] }));
app.use(body_parser_1.json({ strict: true }));
api_1.default(app);
app.get("/*", function (req, res) {
    res.redirect("/notfound.html");
});
console.log("Connecting to Mongo database...");
mongoose_1.default.connect(mongoUri);
var db = mongoose_1.default.connection;
db.on('error', function (err) { return console_1.error("MongoDB connection error:", err); });
db.on('open', function () {
    console_1.log("Connected!");
    console_1.log("Starting server...");
    server.listen(port, function () { return console.log("Server listening on port", port, "!"); });
});
