// services/apiBackend.ts
import type { HandleSignInProps, HandleSignUpProps } from "./typesAPI";

export const handleGuestLogin = ({ setUser, setLoggedIn }: any) => {
  setUser({
    firstName: 'Guest',
    lastName: '',
    membership: '',
    profiles: [],
  });
  setLoggedIn(true);
};

export const handleSignUp = async ({ e, formData, setMessageToUser, navigate,}: HandleSignUpProps) => {
  e.preventDefault();

  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/sign-up`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("❌ Sign-up failed:", data.message);
      setMessageToUser?.(data.message || "Sign-up failed.");
      return; 
    }
    
    setMessageToUser?.("✅ User created");
    setTimeout(() => { navigate('/sign-in');}, 2000);

    console.log("✅ User created");
  } catch (error: any) {
    console.error("❌ Error during sign-up:", error.message);
    setMessageToUser?.(error.message || "Something went wrong during sign-up. Try again.");
  }
};

export const handleSignIn = async ({ e, formData, setUser, setLoggedIn, setMessageToUser, rememberMe}: HandleSignInProps) => {
  e.preventDefault();

  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("❌ Sign-in failed:", data.message);
      setMessageToUser?.(data.message || "Sign-in failed.");
      return;
    }

    // 🧠 Use localStorage if rememberMe is true, else use sessionStorage
    const storage = rememberMe ? localStorage : sessionStorage;
    storage.setItem("token", data.token);
    storage.setItem("user", JSON.stringify(data.user));

    setUser?.(data.user);
    setMessageToUser?.("✅ Successfully Signed in");
    setTimeout(() => {setLoggedIn?.(true);}, 500)
    

    console.log("✅ Successfully Signed in");
  } catch (error: any) {
    console.error("❌ Error during sign-in:", error.message);
    setMessageToUser?.(error.message || "Something went wrong during sign-in. Try again.");
  }
};

export const createNewProfileFunk = async (userEmail: string, newProfile: any, setMessageToUser: any) => {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/new-profile`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: userEmail,
      name: newProfile.name,
      profileImage: newProfile.profileImage,
      forKids: newProfile.forKids,
    }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    setMessageToUser(errorData.message)
    setTimeout(() => {setMessageToUser('')}, 3000)
    throw new Error(errorData.message || 'Failed to create profile');
  }

  // Fetch updated user
  const updatedUserRes = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/user-by-email?email=${userEmail}`);
  const updatedUser = await updatedUserRes.json();
  return updatedUser;
};

export const deleteProfile = async (user:any, profileName:any, setUser:any) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/delete-profile`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: user.email,
        profileName,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to delete profile');
    }

    // ✅ Refetch updated user
    const userResponse = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/user-by-email?email=${user.email}`);
    const updatedUser = await userResponse.json();

    sessionStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
  } catch (error) {
    console.error('Error deleting profile:', error);
  }
};

export const updateProfileFunk = async ( email:string, profileId:string, profileData:any, setMessageToUser:any) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/edit-profile`, {
      method: "PUT",
      headers: {"Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        profileId,
        name: profileData.name,
        profileImage: profileData.profileImage,
        forKids: profileData.forKids,
        likedMovies: profileData.likedMovies || [],
        dislikedMovies: profileData.dislikedMovies || [],
        favourites: profileData.favourites || [],
      }),
    });

    if (!res.ok) {
      const errData = await res.json();
      setMessageToUser(errData.message)
      setTimeout(() => {setMessageToUser('')}, 3000)
      throw new Error(errData.message || "Failed to update profile");
    }

    const data = await res.json();
    setMessageToUser("Profile updated successfully ✅");
    setTimeout(() => {
      setMessageToUser("");
    }, 2000);
    return data.user; // backend should return `user` in res.json
  } catch (error) {
    console.error("Error updating profile:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to update profile ❌";
    setMessageToUser(errorMessage);
    throw error;
  }
};

export const addMovieToFavourites = async (email: string, profileId: string, movie: any) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/edit-profile`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, profileId, movie }),
    });

    if (!res.ok) {
      const errData = await res.json();
      throw new Error(errData.message || "Failed to update profile");
    }

    return await res.json();
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
};

