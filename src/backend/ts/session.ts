import { Session as SessionModel, User, sessionSchema } from './models';
import { randomBytes } from 'crypto';
import { token as tokenConfig } from './config.json';
import { Request } from 'express';
import { Document } from 'mongoose';

export default interface Session {
    username: string;
    token: string;
}

export async function openSession(username: string, password: string): Promise<Session> {

    const user = await User.findOne({ _id: username, password: password }).exec();

    if (!user) {
        throw new Error("401: Invalid credentials");
    }

    const token = randomBytes(tokenConfig.size).toString(tokenConfig.encoding);
    await SessionModel.create({ token: token, user: user._id, createdAt: new Date() });

    return { username: username, token: token };
}

export async function getSession(req: Request): Promise<Session> {

    const authorization = req.headers.authorization;
    const authType = authorization?.split(" ")?.[0];
    const token = authorization?.split(" ")?.[1];

    if (authType != "Bearer" || !token) {
        throw new Error("401: Unauthorized");
    }

    const session: any = await SessionModel.findOne({ 
        token: token,
        createdAt: { $gte: new Date(Date.now() - tokenConfig.maxAge) }
    });

    if (!session) {
        throw new Error("401: Unauthorized");
    }

    return { token, username: session.user};
}