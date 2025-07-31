// userSchema.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  membership: {
    type: String,
    enum: ['basic', 'suggested', 'premium', ''], // added empty string for no membership
    default: '',
  },
  profiles: [
    {
      name: String,
      profileImage: String,
      likedMovies: [String],      // store movie IDs or titles
      dislikedMovies: [String],
      favourites: [String],
    }
  ],
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;
