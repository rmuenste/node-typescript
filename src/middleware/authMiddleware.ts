import { Request, Response, NextFunction } from 'express';
const jwt = require('jsonwebtoken');

export function requireAuth2(req: Request, res: Response, next: NextFunction): void {

    const token = req.cookies.jwt;

    if( token ) {
        jwt.verify(token, 'joker', (err: any, decodedToken: any) => {
            if(err) {
                res.status(400).json({ msg: "User authentication failed. Access denied.", auth: false });
                console.log(err.message);
            } else {
                console.log(decodedToken);
                next();
//                res.status(200).json({ msg: "User authentication successful. Access granted.", auth: true });
            }
        });
    } else {
        res.status(400).send("User authentication token missing. Access denied.");
    }

};

