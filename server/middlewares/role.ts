import { Request, Response, NextFunction } from 'express';

import { Roles } from '../ts/types';

const SECRET_KEY = (process.env.SECRET_KEY as string);

const roleMiddleware = async (req: Request, res: Response, next: NextFunction) => {    
    try {
        const user = res.locals.user;

        if(user.role <= Roles.USER) {
            console.log('loool');
            
            return res.status(404).json({ error: 'You\'re not authorized for this operation' });
        }

        next();
    } catch (error) {
        console.log(error);
    }
}

export default roleMiddleware;