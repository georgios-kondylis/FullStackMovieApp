import React, { useState, useEffect } from 'react';
import { useGlobalProps, MoviesBg, Logo, MessageToUser,SubmitBtn } from '../../exports';
import { handleGuestLogin, handleSignIn } from '../../../services/apiBackend';
import { useNavigate } from 'react-router-dom';

const SignIn = ({ setUser, }: any) => {
  const { customStyles } = useGlobalProps();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [messageToUser, setMessageToUser] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // while signing in

  // AUTO SIGN-IN //
  useEffect(() => {
    const jwt = sessionStorage.getItem('token')
    jwt && setLoggedIn(true)
  },[])

  

  useEffect(() => { // setMessageToUser to '' so it dissapears gain
    if (messageToUser !== "") {
      const timer = setTimeout(() => {setMessageToUser(""); }, 4000);
      return () => clearTimeout(timer); // Clean up if component unmounts
    }
  }, [messageToUser]);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value, }));
  };
  
  // if loggenIn navigate to '/' 
  useEffect(() => {   // if loggenIn navigate to '/' 
    if (loggedIn) { navigate('/profiles') }
  }, [loggedIn, navigate]);

  const handleContinueAsGuest = () => handleGuestLogin({ setUser, setLoggedIn });

  const handleSubmit = (e: React.FormEvent) => {
    setIsLoading(true);
    handleSignIn({ e, formData, setUser, setLoggedIn, setMessageToUser, navigate })
      .finally(() => setIsLoading(false));
  };
  
  return (
    <section className="z-[9999] fixed inset-0 w-full min-h-screen mainPX flex justify-center">
      <MoviesBg />

      <main className="MAX_W relative z-10">
        <Logo />

        <div className="relative max-w-[450px] mx-auto bg-black/80 px-6 py-8 rounded-lg text-white mt-[10%]">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Sign In</h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* EMAIL */}
            <input type="email" name='email' placeholder="Email"
              className={`${customStyles?.mainGrayBg} rounded p-3 outline-none`}
              value={formData.email} required
              onChange={handleChange}
            />
             {/* PASSWORD */}
            <div className={`${customStyles?.mainGrayBg} rounded flex items-center outline-none`}>
              <input type={showPassword ? "text" : 'password'} name="password" placeholder="Password"
                className="outline-none w-full p-3"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <i className={`fa-solid ${showPassword ? 'fa-eye' : 'fa-eye-slash'} | cursor-pointer px-3`}
                onClick={() => setShowPassword(prev => !prev)}
              />
            </div>
             {/* SUBMIT */}
          <SubmitBtn isLoading={isLoading} text='Sign In' loadingText='Signing In...' />
          </form>

          <button onClick={handleContinueAsGuest}
            className="mt-4 text-sm text-gray-300 underline hover:text-white transition1 cursor-pointer"
          >
            Continue as Guest
          </button>

          <p className="text-sm text-gray-400 mt-6 text-center">
            New to Cinemoon?
             <span className="text-white underline cursor-pointer ml-[10px]" onClick={() => navigate('/sign-up')}>
                 Create an account
              </span>
          </p>

          <MessageToUser message={messageToUser} />
        </div>
      </main>
    </section>
  );
};

export default SignIn;
