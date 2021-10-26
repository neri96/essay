import { Request, Response } from 'express';

import User from '../models/User';
import Category from '../models/Category';

import { cid } from '../utils/createShortId';

const getAllPrivate = async (req: Request, res: Response) => {
    const { id: cid } = req.body;
    
    try {
        const user: any = await User.findOne({ cid });

        if(!user) return res.status(409).json({ error: 'User doesnt exists' });
        // const _x = await user.populate('categories.0.notes');

        // console.log(_x.categories[0].notes);
        const _categories = await user.populate('categories.0.notes');
        
        return res.status(200).json({ categories: user.categories });
    } catch (error) {
        console.log(error)
    }
}

const createPrivate = async (req: Request, res: Response) => {
    const { name } = req.body;
    
    const { cid } = res.locals.user;
    
    try {
        const user: any = await User.updateOne(
            { cid }, 
            { $addToSet: { categories: { name, notes: [] } } }
        );
        
        if(!user) return res.status(409).json({ error: 'Category already exists' });

        return res.status(200).json({ message: 'Successfully added' });
    } catch (error) {
        console.log(error);
    }
}

const removePrivate = async (req: Request, res: Response) => {
    const { name } = req.body;
    
    const { cid } = res.locals.user;

    try {
        const user = await User.findOne({ cid });
        if(!user) return res.status(404).json({ error: 'User doesnt exist' });

        const ctgDel = user.categories.find((ctg: any) => {
            return ctg.name === name;
        })

        if(!ctgDel) {
            return res.status(404).json({ error: 'Category doesnt exist' });
        } else if(ctgDel.notes.length) {
            return res.status(404).json({ error: 'Category must be empty to be deleted!' });
        }

        user.categories = user.categories.filter((ctg: any, _i: number, self: string[]) => {
            return ctg.name != ctgDel.name;
        })

        await user.save();

        return res.status(200).json({ message: 'Successfully deleted' });
    } catch (error) {
        console.log(error);
        
    }
}

const getAllPublic = async (req: Request, res: Response) => {
    try {
        const categories = await Category.find({});

        return res.status(200).json({ categories: categories ? categories : [] });
    } catch (error) {
        console.log(error);
    }
}

const createPublic = async (req: Request, res: Response) => {
    const { name, restricted } = req.body;

    try {
        const newCategory = new Category({ cid: cid(), name, restricted });

        newCategory.save();

        return res.status(200).json({ message: 'Successfully added' });
    } catch (error) {
        console.log(error)
    }
}

const removePublic = async (req: Request, res: Response) => {
    const { name } = req.body;

    try {
        const category = await Category.findOne({ name });

        if(!category) {
            return res.status(404).json({ error: 'Category doesnt exist' });
        } else if(category.length) {
            return res.status(404).json({ error: 'Category must be empty to be deleted!' });
        }

        return res.status(200).json({ message: 'Successfully deleted' });
    } catch (error) {
        
    }
}

export {
    getAllPrivate,
    createPrivate,
    removePrivate,
    getAllPublic,
    createPublic,
    removePublic
}