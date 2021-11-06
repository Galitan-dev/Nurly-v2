declare module "*config.json" {
    export const token: {
        maxAge: number;
        size: number;
        encoding: BufferEncoding;
    };
    export const hcaptcha: {
        secret: string;
    };
}