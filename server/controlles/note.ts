import { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
const fsPromises = fs.promises;

import Note from '../models/Note';
import User from '../models/User';
import Category from '../models/Category';

import { cid } from '../utils/createShortId';

import { NoteType, NoteMode, Roles } from '../ts/types';

interface INote {
    title: string,
    type: NoteType,
    images: string[],
    category: string,
    body: string,
    author: string
}

const getAll = async (req: Request, res: Response) => {
    const { mode, noteType, category, limit: amount, page } = req.query;

    const user = res.locals.user;

    try {
        const limit: number = amount === 'off_limits' ? 0 : Number(amount);
        const currentPage: number = Number(page);
    
        const skip: number = (limit * (currentPage - 1));
        
        const ctgKey = category === 'all' ? {} : { category };
        const authorId = mode === NoteMode.PUBLIC ? {} : { author: user._id };

        const searchOptions = {
            // privacy: mode,
            // noteType: mode === 'public' ? 'article' : noteType,
            ...ctgKey,
            ...authorId
        }
        
        const notesPrivate = await Note.find({ privacy: NoteMode.PRIVATE, author: user._id })
        .sort({ createdAt: -1 })
        .populate('author', 'cid name role -_id');


        const notesPublic = await Note.find({ privacy: NoteMode.PUBLIC })
        .sort({ createdAt: -1 })
        .populate('author', 'cid name role -_id');
        
        // const countPages = async (): Promise<number | null> => {
        //     const notesLength = await Note.count({ ...searchOptions });

        //     if(notesLength <= limit) {
        //         return 0;
        //     }
            
        //     const pages = ~~(notesLength / limit);
        //     const remains = notesLength % limit;
            
        //     return remains ? pages + 1 : pages;
        // }

        // const pages = await countPages();
        console.log('REQUESTED!!!');
        
        return res.status(200).json({ notes: notesPublic.concat(notesPrivate), pages: 0 })
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({ error: 'Something went wrong' });
    }

}

const getOne = async (req: Request, res: Response) => {
    const cid = req.params.id;
    const userId = res.locals.user._id;

    try {
        const note = await Note.findOne({ cid })
            .populate('author')
            .select('-password');

        if(note.privacy === 'private' && 
        String(userId) != String(note.author._id)) {
            return res.status(404).json({ error: 'The publication is private' });
        } 
        
        return res.status(202).json({ note });
    } catch (error) {
        return res.status(404).json({ error: 'The note is not found' });
    }
}

const create = async (req: Request, res: Response) => {
    const { title, category, images, privacy, body } = req.body;

    const { mode, noteType } = req.query;

    const user = res.locals.user;
    
    try {
        const file: any = req.files ? req.files.previewFile : null;
        const filename = file ? file.name : null;

        if(filename && !filename.match(/.(jpg|jpeg|png)$/i)) {
            return res.status(404).json({ error: 'Image is invalid' });
        } 

        const newNote: any = new Note({
            cid: cid(),
            title,
            noteType,
            privacy: noteType === 'note' ? 'private' : privacy,
            category,
            images,
            body,
            author: user._id
        });

        const newpath = path.join(__dirname, "../../client/public/uploads/");

        if(file) {
            const preview = Date.now() + '_' + filename.split(' ').join();

            await file.mv(`${newpath}${preview}`);
            newNote.preview = preview;
        } else {
            newNote.preview = null;
        }

        if(!category) {
            await newNote.save();
    
            return res.status(202).json({ message: 'Successfully added' }); 
        }
        console.log(mode)
        if(mode === NoteMode.PUBLIC) {
            console.log('i was here', 'public');
            
            await Category.findOneAndUpdate(
                { name: category },
                { $push: { notes: newNote._id }}
            )
        } else {
            console.log('i was here', 'private');

            const chosenCtg = user.categories.find((ctg: any) => {
                return ctg.name === category;
            });

            chosenCtg.notes.push(newNote._id);
            if(chosenCtg.isEmpty) chosenCtg.isEmpty = false;

            await user.save();
        }

        await newNote.save();
    
        return res.status(202).json({ message: 'Successfully added' });
    } catch (error) {
        console.log(error);
        
        return res.status(404).json({ error: 'The note is not found' });
    }
}

const edit = async (req: Request, res: Response) => {
    const cid = req.params.id;
    const body = req.body;

    const userId = res.locals.user._id;
    try {
        const note = await Note.findOne({ cid });
        if(!note) return res.status(404).json({ error: 'The note is not found' });

        if(note.privacy === 'public' && 
        String(userId) != String(note.author._id)) {
            return res.status(404).json({ error: 'Wrong article' });
        } 

        const file: any = req.files ? req.files.previewFile : null;
        const filename = file ? file.name : null;

        if(filename && !filename.match(/.(jpg|jpeg|png)$/i)) {
            return res.status(404).json({ error: 'Image is invalid' });
        } 
        
        for(let prop in body) {
            if(body.hasOwnProperty(prop) && body[prop]) {
                note[prop] = body[prop];
            }
        }

        const newpath = path.join(__dirname, "../../client/public/uploads/");

        if(file) {
            await fsPromises.unlink(`${newpath + '/' + note.preview}`);

            const preview = Date.now() + '_' + filename.split(' ').join();

            await file.mv(`${newpath}${preview}`);
            note.preview = preview;
        } 

        await note.save();

        return res.status(202).json({ message: 'Successfully updated' });
    } catch (error) {
        return res.status(404).json({ error: 'The note is not found' });
    }
}

const remove = async (req: Request, res: Response) => {
    const cid = req.params.id;
    const user = res.locals.user;
    
    try {
        const note = await Note.findOne({ cid });
        if(!note) return res.status(404).json({ error: 'Note doesn\'t exist' });
        console.log(note);
        
        if(
            (String(user._id) != String(note.author._id) &&
            user.role < Roles.ADMIN) ||
            (note.author.role === Roles.OWNER &&
            user.role != Roles.OWNER)
        ) {
            return res.status(404).json({ error: 'Wrong article' });
        }

        if(note.category) {
            if(note.privacy === 'public') {
                const category = await Category.findOne({ name: note.category });
                
                category.notes = category.notes.filter((ctgNote: any) => {
                    return ctgNote != note._id;
                });

                await category.save();
            } else {
                user.categories.forEach((ctg: any) => {
                    if(ctg.name === note.category) {
                        ctg.notes = ctg.notes.filter((ctgNote: any) => {
                            return String(ctgNote._id) != String(note._id);
                        });
                    }
                })
            }
        }

        if(note.preview) {
            const newpath = path.join(__dirname, "../../client/public/uploads/");

            await fsPromises.unlink(`${newpath + '/' + note.preview}`);
        }

        await user.save();
        await note.remove();

        return res.status(200).json({ message: 'Successfully deleted' });
    } catch (error) {
        console.log(error);
        
        return res.status(404).json({ error: 'The note is not found' });
    }
}

export {
    getAll,
    getOne,
    create,
    edit,
    remove
}