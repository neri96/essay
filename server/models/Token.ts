import mongoose from 'mongoose';

const token = new mongoose.Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    token: { type: String, required: true },
    expirationDate: { type: String, required: true } 
}, { timestamps: true });

export default mongoose.models['Token'] || mongoose.model('Token', token);

