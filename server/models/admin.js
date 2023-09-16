import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true, // Ensure usernames are unique
  },
  password: {
    type: String,
    required: true,
  },
});

// Hash and salt the password before saving
adminSchema.pre('save', async function (next) {
  try {
    const hashedPassword = await bcrypt.hash(this.password, 10); // Hash with salt rounds (e.g., 10)
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

const Admin = mongoose.model('Admin', adminSchema);

export default Admin;
