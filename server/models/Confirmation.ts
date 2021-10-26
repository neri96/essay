import mongoose from 'mongoose';

const confirmationCode = new mongoose.Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    code: { type: Number, required: true },
    action: { type: String, required: true }
}, { timestamps: true });

export default mongoose.models['ConfirmCode'] || mongoose.model('ConfirmCode', confirmationCode);
