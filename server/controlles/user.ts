import { Request, Response } from 'express';

import { validationResult } from 'express-validator';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from '../models/User';
import Token from '../models/Token';
import Confirmation from '../models/Confirmation';

import { main } from '../utils/nodemailer';

import { cid } from '../utils/createShortId';

import { ConfirmAction } from '../ts/types';

const SECRET_KEY = (process.env.SECRET_KEY as string);

const createToken = ({ id, name, email }: { id: string, name: string, email: string }) => {
    const date = new Date();
    const expirationDate = date.setDate(date.getDate() + 1);

    const accessToken = jwt.sign(
        { id, name, email }, 
        SECRET_KEY, 
        { expiresIn: '1d' }
    );

    const refreshToken = jwt.sign(
        { id, name, email }, 
        SECRET_KEY, 
        { expiresIn: '7d' }
    );

    return { accessToken, expirationDate, refreshToken }
}

const signIn = async (req: Request, res: Response) => {
    const { name, password } = req.body;
    
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }

        const user = await User.findOne({ $or: [{ name }, { email: name }] });
        if(!user) return res.status(404).json({ error: 'User doesnt exist' });

        const passCorrect = await bcrypt.compare(password, user.password);
        if(!passCorrect) return res.status(403).json({ error: 'Password is incorrect' });
        
        if(!user.active) return res.status(403).json({ error: 'Account is not activated' });

        const { accessToken, expirationDate, refreshToken } = createToken({ 
            id: user.cid, name: user.name, email: user.email 
        });

        const newToken = await new Token({ 
            owner: user._id, 
            token: refreshToken,
            expirationDate: new Date(expirationDate).toISOString()
        }).save();

        user.refreshToken = newToken._id;

        await user.save();

        return res.status(200).json({ userData: {
            cid: user.cid,
            name: user.name,
            role: user.role,
            accessToken,
            refreshToken,
            expirationDate
        }});
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({ message: 'Something went wrong' });
    }
}

const signUp = async (req: Request, res: Response) => {
    const { name, email, password, confirmPassword } = req.body;

    try {
        const user = await User.findOne({ name, email });
        if(user) return res.status(409).json({ error: 'User already exists' });

        if(password != confirmPassword) {
            return res.status(403).json({ error: 'Passwords dont match' });
        }

        const passHashed = await bcrypt.hash(password, 10);
        
        const newUser = new User({
            cid: cid(),
            name,
            email,
            password: passHashed
        });
        
        await newUser.save();

        res.cookie('userData',
            { id: newUser._id, email },
            { maxAge: 1000 * 60 * 10 }
        )

        return res.status(200).json({ message: { id: newUser.cid } });
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({ message: 'Something went wrong' });
    }
}

const sendVerif = async (req: Request, res: Response) => {    
    try {
        const { id, email } = req.cookies.userData;
        
        const code = Math.floor(Math.random() * 90000) + 10000;
        const messageId = await main(email, code.toString());

        await new Confirmation({
            owner: id,
            code,
            action: ConfirmAction.CONFIRM_EMAIL
        }).save();
        
        return res.status(200).json({ message: 'Successfully sent the code' });
    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong' });
    }
}

const confirm = async (req: Request, res: Response) => {
    const code = req.body.code.toString();
    
    try {
        const confirmDoc = await Confirmation.findOne({ code });
        if(!confirmDoc) return res.status(409).json({ error: 'Wrong confirmation code!' });

        const user = await User.findOne({ _id: confirmDoc.owner });
        if(!user) return res.status(404).json({ error: 'User doesnt exist' });

        user.confirmCode = null;

        const { accessToken, expirationDate, refreshToken } = createToken({ 
            id: user.cid, 
            name: user.name, 
            email: user.email 
        });

        const newToken = await new Token({ 
            owner: user._id, 
            token: refreshToken,
            expirationDate: new Date(expirationDate).toISOString()
        }).save();

        user.active = true;
        user.refreshToken = newToken._id;

        await confirmDoc.remove();

        await user.save();

        return res.status(200).json({ userData: {
            cid: user.cid,
            name: user.name,
            role: user.role,
            accessToken,
            refreshToken,
            expirationDate
        }});
    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong' });
    }
}

const logout = async (_req: Request, res: Response) => {
    const user = res.locals.user;

    try {
        await Token.deleteOne({ _id: user.refreshToken });
        user.refreshToken = null;

        await user.save();

        return res.status(200).json({ message: 'Logged out' });
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({ message: 'Something went wrong' });
    }
}

const refreshToken = async (req: Request, res: Response) => {
    const token = req.body.refreshToken;

    try {
        const decoded: any = jwt.verify(token, SECRET_KEY);
        if(!decoded) return res.status(500).json({ message: 'Something went wrong' });

        const { id: cid, name, email } = decoded;

        const user = await User.findOne({ cid, name, email });
        if(!user) return res.status(500).json({ message: 'Something went wrong' });

        const tokenUpd = await Token.findOne({ 
            _id: user.refreshToken, 
            owner: user._id 
        });
        if(!tokenUpd) return res.status(500).json({ message: 'Something went wrong' });

        const { accessToken, expirationDate, refreshToken } = createToken({ 
            id: user.cid, 
            name: user.name, 
            email: user.email 
        });

        tokenUpd.token = refreshToken;

        await tokenUpd.save();

        return res.status(200).json({ userData: {
            cid: user.cid,
            name: user.name,
            role: user.role,
            accessToken,
            refreshToken,
            expirationDate,
            refreshed: true
        }});
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({ message: 'Something went wrong' });
    }
}

export { 
    signIn, 
    signUp, 
    sendVerif, 
    confirm, 
    logout,
    refreshToken 
}