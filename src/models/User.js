import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  its: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
  },
  address: {
    type: String,
  },
  userRole: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  }
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
