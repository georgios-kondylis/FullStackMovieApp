import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
  adult: Boolean,
  backdrop_path: String,
  genre_ids: [Number],
  id: Number, // Movie ID from the API
  original_language: String,
  original_title: String,
  overview: String,
  popularity: Number,
  poster_path: String,
  release_date: String,
  title: String,
  video: Boolean,
  vote_average: Number,
  vote_count: Number,
  // trailerKey: String, 
}, { _id: false }); // prevent auto-generating _id for each movie

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
    enum: ['basic', 'suggested', 'premium', ''],
    default: '',
  },
  profiles: [
    {
      name: String,
      profileImage: String,
      forKids: Boolean,
      likedMovies: [movieSchema],  
      dislikedMovies: [movieSchema],
      favourites: [movieSchema],  // ✅ now stores full movie objects
    }
  ],
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;
