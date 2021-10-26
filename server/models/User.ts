import mongoose from 'mongoose';

import { Roles } from '../ts/types';

const localCategory = new mongoose.Schema({
    name: { type: String, required: false },
    notes: { type: [mongoose.Schema.Types.ObjectId], ref: 'Note', required: false, default: [] },
    isEmpty: { type: Boolean, default: true }
})

const user = new mongoose.Schema({
    cid: { type: String, required: true },
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    role: { type: Number, required: true, default: Roles.ADMIN },
    notes: { type: [mongoose.Schema.Types.ObjectId], ref: 'Note', default: [] },
    categories: { type: [localCategory], default: [] },
    password: { type: String, required: true },
    active: { type: Boolean, required: true, default: false },
    refreshToken: { type: mongoose.Schema.Types.ObjectId, ref: 'Token' },
    confirmCode: { type: mongoose.Schema.Types.ObjectId, ref: 'ConfirmLink' }
}, { timestamps: true });

export default mongoose.models['User'] || mongoose.model('User', user);
