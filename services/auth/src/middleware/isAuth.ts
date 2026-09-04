import { NextFunction, Request, Response } from 'express'
import { IUser } from '../model/User.js'
import jwt, { JwtPayload } from 'jsonwebtoken';

export interface AuthenticatedRequest extends Request {
    user?: IUser | null;
}

export const isAuth = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {

        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            res.status(401).json(
                {
                    message: "Please Login - No auth header",
                }
            );
            return;
        };

        const token = authHeader?.split(" ")[1];
        if (!token) {
            res.status(401).json(
                {
                    message: "Please Login - Token Missing",
                }
            );
            return;
        }

        const decodedValue = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
        if (!decodedValue || !decodedValue.user) {
            res.status(401).json(
                {
                    message: "Please Login - Invalid Token",
                }
            );
            return;
        }

        req.user = decodedValue.user;
        next()

    } catch (err: any) {
        res.status(500).json({
            message: err.message
        })
    }
}