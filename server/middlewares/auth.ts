import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import User from '../models/User';

interface Decoded { id: string, name: string, email: string }

const SECRET_KEY = (process.env.SECRET_KEY as string);

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {    
    try {
        const bearerToken = req.headers['authorization'];

        if(!bearerToken) return res.status(401).json({ error: 'Unauthorized' }); 

        const token = (bearerToken as string).split(' ')[1];
        
        const { id, name, email }: any = jwt.verify(token, SECRET_KEY);

        const user = await User.findOne({ cid: id, name, email });
        
        if(!user) return res.status(404).json({ error: 'User doesn\'t exist' });

        res.locals.user = user;
        next();
    } catch (error) {
        console.log(error);
    }
}

export default authMiddleware;