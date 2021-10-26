import mongoose from 'mongoose';

const note = new mongoose.Schema({
    cid: { type: String },
    title: { type: String, required: true },
    preview: { type: String },
    privacy: { type: String, required: true, },
    noteType: { type: String, required: true, default: 'note' },
    images: { type: [String], default: [] },
    category: { type: String },
    body: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

export default mongoose.models['Note'] || mongoose.model('Note', note);
