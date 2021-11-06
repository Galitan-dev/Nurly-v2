import express from 'express';
import { User, Session as SessionModel } from './models';
import { log } from 'console';
import { getSession, openSession } from './session';
import Session from './session';
import hcaptcha from 'hcaptcha';
import config from './config.json';

export default function (app: express.Application): void {
    // Basics
    app.all("/api/help", (_req, res) => {
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
    app.all("/api/notfound", (_req, res) => {
        res.status(404).json({
            code: 404,
            message: "Not Found"
        }).send();
    });

    // Authentification
    app.post("/api/auth/init", async(req, res) => {

        if (req.headers['content-type'] != "application/json") {
            res.status(400).json({
                code: 400, 
                message: "Bad Request" 
            }).send();
            return;
        }

        const username: string | undefined = req.body.username;
        const password: string | undefined = req.body.password;
        
        if (!username || !password) {
            res.status(400).json({
                code: 400, 
                message: "Bad Request" 
            }).send();
            return;
        }

        if (await User.findById(username).exec() != null) {
            res.status(401).json({
                code: 401,
                message: "User already exists"
            }).send();
            return;
        }

        let session: Session;
        try {
            await User.create({ _id: username, password, date: new Date() });
            session = await openSession(username, password);
        } catch (err) {
            log(err);
            res.status(500).json({ 
                code: 500,
                message: "Error creating user"
            }).send();
            return;
        }

        res.status(200).json({ 
            code: 200,
            token: session.token
        }).send();
    });
    app.post("/api/auth/logout", async(req, res) => {
        try {
            const session = await getSession(req);
            await SessionModel.deleteOne({ token: session.token });
        } catch (err: any) {
            if (err.message?.startsWith("401")) {
                res.status(401).json({ 
                    code: 401,
                    message: "Unauthorized"
                }).send();
                return;
            }
            
            log(err);
            res.status(500).json({ 
                code: 500,
                message: "Error opening session"
            }).send();
            return;
        }

        res.status(200).json({
            code: 200,
            message: "Successfully closed session"
        }).send();
    });
    app.post("/api/auth", async(req, res) => {

        if (req.headers['content-type'] != "application/json") {
            res.status(400).json({
                code: 400, 
                message: "Bad Request" 
            }).send();
            return;
        }

        const username: string | undefined = req.body.username;
        const password: string | undefined = req.body.password;
        const captchaKey: string | undefined = req.body.captchaKey;
        
        if (!username || !password || !captchaKey) {
            res.status(400).json({
                code: 400, 
                message: "Bad Request" 
            }).send();
            return;
        }

        let session: Session;
        try {
            const verification = await hcaptcha.verify(config.hcaptcha.secret, captchaKey);
            if (!verification.success) {
                res.status(403).json({ 
                    code: 403,
                    message: "Invalid captcha"
                }).send();
                return;
            }

            session = await openSession(username, password);
        } catch (err: any) {
            if (err.message?.startsWith("401")) {
                res.status(401).json({ 
                    code: 401,
                    message: "Invalid credentials"
                }).send();
                return;
            }

            log(err);
            res.status(500).json({ 
                code: 500,
                message: "Error opening session"
            }).send();
            return;
        }

        res.status(200).json({ 
            code: 200,
            token: session.token
        }).send();
    });
    
    // Rediretions
    app.all("/api", (_req, res) => {
        res.redirect("/api/help");
    });
    app.all("/api/*", (_req, res) => {
        res.redirect("/api/notfound");
    });
}