import { HttpStatus, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from 'express'; 

export class ChromeUserMiddleware implements NestMiddleware{
    use(req: Request, res: Response, next: NextFunction) {
        const agent = req.headers['user-agent'];
        if (!this.isUserAgentAcceptable(agent)) {
            res.status(HttpStatus.FORBIDDEN).json({ message : "Not Allowed"});
            return; 
        }
        next();
    }

    private isUserAgentAcceptable(userAgent: string) {
        const acceptedUserAgents = ["chrome"];
        return acceptedUserAgents.some((agent) => 
            userAgent.toLowerCase().includes(agent.toLowerCase())
        ); 
    }
}

