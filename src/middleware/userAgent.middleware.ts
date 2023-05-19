import { NextFunction, Request, Response } from 'express';

export function UserAgentMiddleware(req: Request, res: Response, next: NextFunction) {
    const agent = req.headers['user-agent'];
    console.log(agent);
    next();
}