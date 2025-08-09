// userRoutes.js
import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from "../mongoDB/userSchema.js";

const router = express.Router();

// --------------- SIGN-UP --------------- //
router.post('/sign-up', async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    
    if (existingUser) { return res.status(409).json({ message: 'User already exists' }); }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// --------------- LOG-IN --------------- //
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("firstName lastName email password membership profiles");

    if (!user) { return res.status(400).json({ message: 'Invalid credentials' }); }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) { return res.status(400).json({ message: 'Invalid credentials' }); }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '3h' }
    );

    return res.status(200).json({
      token,
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        membership: user.membership,
        profiles: user.profiles,
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// --------------- Create Profile --------------- //
router.put('/new-profile', async (req, res) => {
  try {
    const { email, name, profileImage, forKids } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // ❌ Check if a profile with the same name already exists
    const nameExists = user.profiles.some(p => p.name.toLowerCase() === name.toLowerCase());
    if (nameExists) {
      return res.status(400).json({ message: 'Profile name already exists' });
    }

    const newProfile = {
      name,
      profileImage,
      forKids,
      likedMovies: [],
      dislikedMovies: [],
      favourites: [],
    };

    user.profiles.push(newProfile);
    await user.save();

    return res.status(200).json({ message: 'Profile created', profiles: user.profiles });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});


// Get The User Only, Ex. after i create a profile i want to update the user in the session storage
router.get('/user-by-email', async (req, res) => {
  const { email } = req.query;
  try {
    const user = await User.findOne({ email }).select("-password"); // exclude password
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// --------------- DELETE Profile --------------- //
router.delete('/delete-profile', async (req, res) => {
  try {
    const { email, profileName } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Filter out the profile with the matching name
    const updatedProfiles = user.profiles.filter(profile => profile.name !== profileName);

    if (updatedProfiles.length === user.profiles.length) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    user.profiles = updatedProfiles;
    await user.save();

    res.status(200).json({ message: 'Profile deleted successfully', profiles: user.profiles });
  } catch (error) {
    console.error('Error deleting profile:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// --------------- Update Profile --------------- //
router.put('/edit-profile', async (req, res) => {
  try {
    const { email, profileId, name, profileImage, forKids, movie, likedMovie, dislikedMovie } = req.body;

    // 1. Find user
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // 2. Find profile
    const profile = user.profiles.id(profileId);
    if (!profile) return res.status(404).json({ message: 'Profile not found' });

    // 3. Update basic fields
    if (name !== undefined) profile.name = name;
    if (profileImage !== undefined) profile.profileImage = profileImage;
    if (typeof forKids === 'boolean') profile.forKids = forKids;

    // 4. Incrementally add/remove movies
    if (movie && !profile.favourites.some(m => m.id === movie.id)) {
      profile.favourites.push(movie);
    }

    if (likedMovie) {
      // If movie already liked → remove it (toggle off)
      if (profile.likedMovies.some(m => m.id === likedMovie.id)) {
        profile.likedMovies = profile.likedMovies.filter(m => m.id !== likedMovie.id);
      } else {
        // Remove from dislikedMovies if it's there
        profile.dislikedMovies = profile.dislikedMovies.filter(m => m.id !== likedMovie.id);
        // Add to likedMovies
        profile.likedMovies.push(likedMovie);
      }
    }
    

    if (dislikedMovie) {
      // If movie already disliked → remove it (toggle off)
      if (profile.dislikedMovies.some(m => m.id === dislikedMovie.id)) {
        profile.dislikedMovies = profile.dislikedMovies.filter(m => m.id !== dislikedMovie.id);
      } else {
        // Remove from likedMovies if it's there
        profile.likedMovies = profile.likedMovies.filter(m => m.id !== dislikedMovie.id);
        // Add to dislikedMovies
        profile.dislikedMovies.push(dislikedMovie);
      }
    }
    

    // 5. Save
    await user.save();

    return res.status(200).json({
      message: 'Profile updated successfully',
      user,
    });

  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// --------------- Remove Movie From Favourites --------------- //
router.put('/un-favourite', async (req, res) => {
  try {
    const { email, profileId, movie } = req.body;

    // 1. Find user
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // 2. Find profile inside user's profiles array
    const profile = user.profiles.id(profileId);
    if (!profile) return res.status(404).json({ message: 'Profile not found' });

    // 3. If the movie exists, remove it
    if (movie) {
      profile.favourites = profile.favourites.filter(m => m.id !== movie.id);
    }

    // 4. Save updated user
    await user.save();

    return res.status(200).json({
      message: 'Movie removed from favourites successfully',
      user,
    });
  } catch (error) {
    console.error("Error removing movie from favourites:", error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});



export default router