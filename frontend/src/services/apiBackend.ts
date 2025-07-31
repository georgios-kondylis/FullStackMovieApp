// services/apiBackend.ts
import type { HandleSubmitProps } from "./typesAPI";

export const handleGuestLogin = ({ setUser, setLoggedIn }: any) => {
  setUser({
    firstName: 'Guest',
    lastName: '',
    membership: '',
    profiles: [],
  });
  setLoggedIn(true);
};

export const handleSignUp = async ({ e, formData, setUser, setLoggedIn, setMessageToUser, navigate,}: HandleSubmitProps) => {
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
      return alert(data.message || "Sign-up failed.");
    }

    setUser({
      firstName: data.user.firstName,
      lastName: data.user.lastName,
      email: data.user.email,
      membership: data.user.membership || '',
      profiles: data.user.profiles || [],
    });

    setMessageToUser?.("✅ User created");

    setLoggedIn(true);
    setTimeout(() => {
      navigate('/login');
    }, 2000);

    console.log("✅ User created");
  } catch (error: any) {
    console.error("❌ Error during sign-up:", error.message);
    setMessageToUser?.(error.message || "Something went wrong during sign-up. Try again.");
  }
};
