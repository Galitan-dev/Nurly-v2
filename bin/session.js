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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSession = exports.openSession = void 0;
var models_1 = require("./models");
var crypto_1 = require("crypto");
var config_json_1 = require("./config.json");
function openSession(username, password) {
    return __awaiter(this, void 0, void 0, function () {
        var user, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, models_1.User.findOne({ _id: username, password: password }).exec()];
                case 1:
                    user = _a.sent();
                    if (!user) {
                        throw new Error("401: Invalid credentials");
                    }
                    token = crypto_1.randomBytes(config_json_1.token.size).toString(config_json_1.token.encoding);
                    return [4 /*yield*/, models_1.Session.create({ token: token, user: user._id, createdAt: new Date() })];
                case 2:
                    _a.sent();
                    return [2 /*return*/, { username: username, token: token }];
            }
        });
    });
}
exports.openSession = openSession;
function getSession(req) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function () {
        var authorization, authType, token, session;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    authorization = req.headers.authorization;
                    authType = (_a = authorization === null || authorization === void 0 ? void 0 : authorization.split(" ")) === null || _a === void 0 ? void 0 : _a[0];
                    token = (_b = authorization === null || authorization === void 0 ? void 0 : authorization.split(" ")) === null || _b === void 0 ? void 0 : _b[1];
                    if (authType != "Bearer" || !token) {
                        throw new Error("401: Unauthorized");
                    }
                    return [4 /*yield*/, models_1.Session.findOne({
                            token: token,
                            createdAt: { $gte: new Date(Date.now() - config_json_1.token.maxAge) }
                        })];
                case 1:
                    session = _c.sent();
                    if (!session) {
                        throw new Error("401: Unauthorized");
                    }
                    return [2 /*return*/, { token: token, username: session.user }];
            }
        });
    });
}
exports.getSession = getSession;
