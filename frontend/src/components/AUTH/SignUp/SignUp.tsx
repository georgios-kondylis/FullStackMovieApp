import React, { useState, useEffect } from 'react';
import { useGlobalProps, MoviesBg, Logo } from '../../exports';
import { useNavigate } from 'react-router-dom';
import { handleSignUp, handleGuestLogin } from '../../../services/apiBackend';

const SignUp = ({ setUser, user }: any) => {
  const { customStyles } = useGlobalProps();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [messageToUser, setMessageToUser] = useState('');

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
  
  const handleSubmit = (e: React.FormEvent) => handleSignUp({ e, formData, setUser, setLoggedIn, setMessageToUser, navigate });  // POST API CALL TO CREATE USER
  const handleContinueAsGuest = () => handleGuestLogin({ setUser, setLoggedIn });
  
  useEffect(() => {
    if (loggedIn) {
      navigate('/');
    }
  }, [loggedIn, navigate]);

  return (
    <section className="z-[9999] fixed inset-0 w-full min-h-screen mainPX flex justify-center">
      <MoviesBg />

      <main className="MAX_W relative z-10">
        <Logo />

        <div className="max-w-[450px] mx-auto bg-black/80 px-6 py-8 rounded-lg text-white mt-[10%]">
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

            <button type="submit"
              className={`${customStyles?.btnColor} text-white font-semibold rounded p-3 hover:opacity-90 transition1`}
            >
              Sign Up
            </button>
          </form>

          <button onClick={handleContinueAsGuest}
            className="mt-4 text-sm text-gray-300 underline hover:text-white transition1 cursor-pointer"
          >
            Continue as Guest
          </button>

          <p className="text-sm text-gray-400 mt-6 text-center">
            Already have an account?
            <span className="text-white underline cursor-pointer ml-[8px]"
              onClick={() => navigate('/sign-in')}
            >
              Login
            </span>
          </p>
        </div>
        <div>
          <p>{messageToUser !== '' && messageToUser}</p>
        </div>
      </main>
    </section>
  );
};

export default SignUp;
