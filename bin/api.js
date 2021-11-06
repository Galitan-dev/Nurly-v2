"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var models_1 = require("./models");
var console_1 = require("console");
var session_1 = require("./session");
var hcaptcha_1 = __importDefault(require("hcaptcha"));
var config_json_1 = __importDefault(require("./config.json"));
function default_1(app) {
    var _this = this;
    // Basics
    app.all("/api/help", function (_req, res) {
        res.status(200).json({
            code: 200,
            endpoints: [
                {
                    method: "ALL",
                    path: "/help",
                    searchParams: [],
                    headers: {},
                    description: "Show this help"
                },
                {
                    method: "ALL",
                    path: "/notfound",
                    searchParams: [],
                    headers: {},
                    description: "Redirected when the request endpoint is not found"
                },
                {
                    method: "POST",
                    path: "/auth",
                    searchParams: [],
                    headers: {},
                    body: {
                        username: "string",
                        password: "string",
                        captchaKey: "string"
                    },
                    description: "Create a new session",
                },
                {
                    method: "POST",
                    path: "/auth/logout",
                    searchParams: [],
                    headers: {
                        "Authorization": "Bearer <token>"
                    },
                    body: {},
                    description: "Terminate the session"
                },
                {
                    method: "POST",
                    path: "/auth/init",
                    searchParams: [],
                    headers: {},
                    body: {
                        username: "string",
                        password: "string"
                    },
                    description: "Inititialize a new user and create a new session"
                }
            ]
        }).send();
    });
    app.all("/api/notfound", function (_req, res) {
        res.status(404).json({
            code: 404,
            message: "Not Found"
        }).send();
    });
    // Authentification
    app.post("/api/auth/init", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var username, password, session, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (req.headers['content-type'] != "application/json") {
                        res.status(400).json({
                            code: 400,
                            message: "Bad Request"
                        }).send();
                        return [2 /*return*/];
                    }
                    username = req.body.username;
                    password = req.body.password;
                    if (!username || !password) {
                        res.status(400).json({
                            code: 400,
                            message: "Bad Request"
                        }).send();
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, models_1.User.findById(username).exec()];
                case 1:
                    if ((_a.sent()) != null) {
                        res.status(401).json({
                            code: 401,
                            message: "User already exists"
                        }).send();
                        return [2 /*return*/];
                    }
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 5, , 6]);
                    return [4 /*yield*/, models_1.User.create({ _id: username, password: password, date: new Date() })];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, session_1.openSession(username, password)];
                case 4:
                    session = _a.sent();
                    return [3 /*break*/, 6];
                case 5:
                    err_1 = _a.sent();
                    console_1.log(err_1);
                    res.status(500).json({
                        code: 500,
                        message: "Error creating user"
                    }).send();
                    return [2 /*return*/];
                case 6:
                    res.status(200).json({
                        code: 200,
                        token: session.token
                    }).send();
                    return [2 /*return*/];
            }
        });
    }); });
    app.post("/api/auth/logout", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var session, err_2;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, session_1.getSession(req)];
                case 1:
                    session = _b.sent();
                    return [4 /*yield*/, models_1.Session.deleteOne({ token: session.token })];
                case 2:
                    _b.sent();
                    return [3 /*break*/, 4];
                case 3:
                    err_2 = _b.sent();
                    if ((_a = err_2.message) === null || _a === void 0 ? void 0 : _a.startsWith("401")) {
                        res.status(401).json({
                            code: 401,
                            message: "Unauthorized"
                        }).send();
                        return [2 /*return*/];
                    }
                    console_1.log(err_2);
                    res.status(500).json({
                        code: 500,
                        message: "Error opening session"
                    }).send();
                    return [2 /*return*/];
                case 4:
                    res.status(200).json({
                        code: 200,
                        message: "Successfully closed session"
                    }).send();
                    return [2 /*return*/];
            }
        });
    }); });
    app.post("/api/auth", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var username, password, captchaKey, session, verification, err_3;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (req.headers['content-type'] != "application/json") {
                        res.status(400).json({
                            code: 400,
                            message: "Bad Request"
                        }).send();
                        return [2 /*return*/];
                    }
                    username = req.body.username;
                    password = req.body.password;
                    captchaKey = req.body.captchaKey;
                    if (!username || !password || !captchaKey) {
                        res.status(400).json({
                            code: 400,
                            message: "Bad Request"
                        }).send();
                        return [2 /*return*/];
                    }
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, hcaptcha_1.default.verify(config_json_1.default.hcaptcha.secret, captchaKey)];
                case 2:
                    verification = _b.sent();
                    if (!verification.success) {
                        res.status(403).json({
                            code: 403,
                            message: "Invalid captcha"
                        }).send();
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, session_1.openSession(username, password)];
                case 3:
                    session = _b.sent();
                    return [3 /*break*/, 5];
                case 4:
                    err_3 = _b.sent();
                    if ((_a = err_3.message) === null || _a === void 0 ? void 0 : _a.startsWith("401")) {
                        res.status(401).json({
                            code: 401,
                            message: "Invalid credentials"
                        }).send();
                        return [2 /*return*/];
                    }
                    console_1.log(err_3);
                    res.status(500).json({
                        code: 500,
                        message: "Error opening session"
                    }).send();
                    return [2 /*return*/];
                case 5:
                    res.status(200).json({
                        code: 200,
                        token: session.token
                    }).send();
                    return [2 /*return*/];
            }
        });
    }); });
    // Rediretions
    app.all("/api", function (_req, res) {
        res.redirect("/api/help");
    });
    app.all("/api/*", function (_req, res) {
        res.redirect("/api/notfound");
    });
}
exports.default = default_1;
