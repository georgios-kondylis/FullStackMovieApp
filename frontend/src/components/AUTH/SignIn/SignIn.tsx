// SignIn.tsx
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
  const [rememberMe, setRememberMe] = useState(false);
  const [continueIsHovered, setContinueIsHovered] = useState(false);



  // AUTO SIGN-IN IF TOKEN EXISTS Checks both localStorage and sessionStorage
useEffect(() => {
  const jwt = localStorage.getItem('token') || sessionStorage.getItem('token');
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
    handleSignIn({ e, formData, setUser, setLoggedIn, setMessageToUser, navigate,rememberMe })
      .finally(() => setIsLoading(false));
  };

  return (
    <section className="z-[9999] fixed inset-0 w-full min-h-screen mainPX flex justify-center">
    {/* <Loader /> */}   {/*  HERE AND IN THE APP IS NEEDED */}
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
            <div className="flex gap-3 w-full">
              {/* Sign In button */}
              <div className={`transition2 
                  ${continueIsHovered ? "flex-[0.2]" : "flex-[0.8]"}`}
              >
                <SubmitBtn isLoading={isLoading} text="Sign In" loadingText="Signing In..." />
              </div>

              {/* Continue as Guest button */}
              <button disabled={isLoading} onMouseEnter={() => setContinueIsHovered(true)} onMouseLeave={() => setContinueIsHovered(false)} onClick={handleContinueAsGuest}
                className={` ${customStyles?.btnColor} transition2 text-white font-semibold rounded p-3 flex justify-center items-center gap-2 ${isLoading ? "opacity-70 cursor-not-allowed" : "hover:opacity-90"} text-nowrap
                  ${continueIsHovered ? "flex-[0.8] pl-0" : "flex-[0.2] pl-0.5"}`}
              >
                 <span className={`transition2 ${continueIsHovered ? "opacity-100" : "opacity-0 text-[0.1px]"}`}>Continue as</span> Guest
              </button>
            </div>

          </form>

          {/* GUEST LOGIN */}
          <div className='flex items-center justify-between mt-6'>
           
             <p className="text-sm text-gray-400 text-center">
            New to Cinemoon?
            <span className="text-white underline cursor-pointer ml-[7px]"
              onClick={() => navigate('/sign-up')}
            >
              Create an account
            </span>
          </p>

            <label className="text-sm text-gray-300 flex items-center gap-1 cursor-pointer">
              <input type="checkbox" checked={rememberMe}
                onChange={() => setRememberMe(prev => !prev)}
                className="accent-[#c92443] w-4 h-4 cursor-pointer"
              />
              Remember Me
            </label>
          </div>

          {/* ERROR MESSAGE */}
          <MessageToUser message={messageToUser} />
        </div>
      </main>
    </section>
  );
};

export default SignIn;


{/* THIS IS THE OLD BUTTON */}
 {/* <button onClick={handleContinueAsGuest}    
    className="text-sm text-gray-300 underline hover:text-white transition1 cursor-pointer"
  >
    Continue as Guest
  </button> */}