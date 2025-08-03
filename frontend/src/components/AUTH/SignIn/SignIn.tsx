import React, { useState, useEffect } from 'react';
import { useGlobalProps, MoviesBg, Logo, MessageToUser, SubmitBtn, Loader } from '../../exports';
import { handleGuestLogin, handleSignIn } from '../../../services/apiBackend';
import { useNavigate } from 'react-router-dom';

const SignIn = ({ setUser }: any) => {
  const { customStyles } = useGlobalProps();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [messageToUser, setMessageToUser] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [loggedIn, setLoggedIn] = useState(false);
  const selectedProfile = JSON.parse(sessionStorage.getItem('selectedProfile') || 'null');

  // AUTO SIGN-IN IF TOKEN EXISTS
  useEffect(() => {
    const jwt = sessionStorage.getItem('token');
    if (jwt) setLoggedIn(true);
  }, []);

  // REDIRECT BASED ON PROFILE
  useEffect(() => {
    if (loggedIn) {
      if (selectedProfile && selectedProfile.name !== 'Guest') {
        navigate('/');
      } else {
        navigate('/profiles');
      }
    }
  }, [loggedIn, navigate, selectedProfile]);

  // HIDE MESSAGE AFTER TIMEOUT
  useEffect(() => {
    if (messageToUser !== "") {
      const timer = setTimeout(() => setMessageToUser(""), 4000);
      return () => clearTimeout(timer);
    }
  }, [messageToUser]);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleContinueAsGuest = () => handleGuestLogin({ setUser, setLoggedIn });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    handleSignIn({ e, formData, setUser, setLoggedIn, setMessageToUser, navigate })
      .finally(() => setIsLoading(false));
  };

  return (
    <section className="z-[9999] fixed inset-0 w-full min-h-screen mainPX flex justify-center">
      <Loader /> {/* HERE AND IN THE APP IS NEEDED */}
      <MoviesBg />

      <main className="MAX_W relative z-10">
        <Logo />

        <div className="relative max-w-[450px] mx-auto bg-black/80 px-6 py-8 rounded-lg text-white mt-[10%]">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Sign In</h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* EMAIL */}
            <input type="email" name="email" placeholder="Email"
              className={`${customStyles?.mainGrayBg} rounded p-3 outline-none`}
              value={formData.email} required
              onChange={handleChange}
            />

            {/* PASSWORD */}
            <div className={`${customStyles?.mainGrayBg} rounded flex items-center outline-none`}>
              <input type={showPassword ? 'text' : 'password'} name="password" placeholder="Password"
                className="outline-none w-full p-3"
                value={formData.password} required
                onChange={handleChange} 
              />
              <i className={`fa-solid ${showPassword ? 'fa-eye' : 'fa-eye-slash'} | cursor-pointer px-3`}
                onClick={() => setShowPassword(prev => !prev)}
              />
            </div>

            {/* SUBMIT */}
            <SubmitBtn isLoading={isLoading} text="Sign In" loadingText="Signing In..." />
          </form>

          {/* GUEST LOGIN */}
          <button onClick={handleContinueAsGuest}
            className="mt-4 text-sm text-gray-300 underline hover:text-white transition1 cursor-pointer"
          >
            Continue as Guest
          </button>

          {/* SIGN-UP REDIRECT */}
          <p className="text-sm text-gray-400 mt-6 text-center">
            New to Cinemoon?
            <span className="text-white underline cursor-pointer ml-[10px]"
              onClick={() => navigate('/sign-up')}
            >
              Create an account
            </span>
          </p>

          {/* ERROR MESSAGE */}
          <MessageToUser message={messageToUser} />
        </div>
      </main>
    </section>
  );
};

export default SignIn;
