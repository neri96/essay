import mongoose from 'mongoose';

const category = new mongoose.Schema({
    name: { type: String, required: true },
    notes: { type: [mongoose.Schema.Types.ObjectId], ref: 'Note', required: true, default: [] },
    isEmpty: { type: Boolean },
    restricted: { type: String, reqired: true, default: false }
}, { timestamps: true });

export default mongoose.models['Category'] || mongoose.model('Category', category);
