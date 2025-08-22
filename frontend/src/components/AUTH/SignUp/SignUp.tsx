import React, { useState, useEffect } from 'react';
import { useGlobalProps, MoviesBg, Logo, MessageToUser, SubmitBtn } from '../../exports';
import { useNavigate } from 'react-router-dom';
import { handleSignUp, handleGuestLogin } from '../../../services/apiBackend';

const SignUp = ({ setUser, user }: any) => {
  const { customStyles } = useGlobalProps();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [messageToUser, setMessageToUser] = useState('');
  const [isLoading, setIsLoading] = useState(false); // while signing up
  const [continueIsHovered, setContinueIsHovered] = useState(false);

  useEffect(() => { // setMessageToUser to '' so it dissapears gain
    if (messageToUser !== "") {
      const timer = setTimeout(() => {setMessageToUser(""); }, 4000);
      return () => clearTimeout(timer); // Clean up if component unmounts
    }
  }, [messageToUser]);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value, }));
  };
  
  const handleSubmit = (e: React.FormEvent) => { 
    setIsLoading(true);
    handleSignUp({ e, formData, setMessageToUser, navigate })
    .finally(() => setIsLoading(false));
  }  
  const handleContinueAsGuest = () => handleGuestLogin({ setUser, setLoggedIn });
  
  useEffect(() => {   // if loggenIn navigate to '/' 
    if (loggedIn) { navigate('/') }
  }, [loggedIn, navigate]);

  return (
    <section className="z-[9999] fixed inset-0 w-full min-h-screen mainPX flex justify-center">
      <MoviesBg />

      <main className="MAX_W relative z-10">
        <Logo />

        <div className="relative max-w-[450px] mx-auto bg-black/80 px-6 py-8 rounded-lg text-white mt-[10%]">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Sign Up</h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              className={`${customStyles?.mainGrayBg} rounded p-3 outline-none`}
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              className={`${customStyles?.mainGrayBg} rounded p-3 outline-none`}
              value={formData.lastName}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className={`${customStyles?.mainGrayBg} rounded p-3 outline-none`}
              value={formData.email}
              onChange={handleChange}
              required
            />
            <div className={`${customStyles?.mainGrayBg} rounded flex items-center outline-none`}>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                autoComplete="off"
                className="outline-none w-full p-3"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <i className={`fa-solid ${showPassword ? 'fa-eye' : 'fa-eye-slash'} cursor-pointer p-3`}
                onClick={() => setShowPassword(prev => !prev)}
              />
            </div>

             {/* SUBMIT */}
             <div className="flex gap-3 w-full">
                {/* Sign In button */}
                <div className={`transition2 ${continueIsHovered ? "flex-[0.2]" : "flex-[0.8]"}`}>
                  <SubmitBtn isLoading={isLoading} text='Sign Up' loadingText='Signing Up...' />
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

          <p className="text-sm text-gray-400 mt-6 text-center">
            Already have an account?
            <span className="mt-4 text-sm text-gray-300 underline hover:text-white transition1 cursor-pointer ml-[8px]"
              onClick={() => navigate('/sign-in')}
            >
              Sign-in
            </span>
          </p>
          
          <MessageToUser message={messageToUser} />
        </div>

        <div className="absolute bottom-0 left-0 flex items-center justify-between w-full mt-[40px] 
                         max-sm:flex-col-reverse max-sm: pb-5">
          <p className={`text-sm ${ 'text-white/60'}`}>
            &copy; {new Date().getFullYear()} Georgios Kondylis. All rights reserved.
          </p>

          <div id="socialMedia" className="flex text-[24px] text-white">
            <a href="https://www.linkedin.com/in/georgios-kondylis-7b680a1a7/" className="p-2 cursor-pointer hover:text-[#0077b5] transition-colors" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin" />
            </a>
            <a href="https://github.com/georgios-kondylis" className="p-2 cursor-pointer hover:text-gray-400 transition-colors" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-github" />
            </a>
            <a href="https://www.instagram.com/georgios.kondylis/" className="p-2 cursor-pointer hover:text-pink-500 transition-colors" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram" />
            </a>
            <a href="https://www.facebook.com/Georgios1995Kondylis/" className="p-2 cursor-pointer hover:text-[#1877f2] transition-colors" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook" />
            </a>
          </div>
        </div>
      </main>
    </section>
  );
};

export default SignUp;
