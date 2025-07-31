import React, { useState, useEffect } from 'react';
import { useGlobalProps, MoviesBg, Logo } from '../../exports';
import { useNavigate } from 'react-router-dom';

const SignIn = ({ setUser, user }: any) => {
  const { customStyles } = useGlobalProps();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [loggedIn, setLoggedIn] = useState(false);

  const handleContinueAsGuest = () => {
    setUser({...user, firstName: 'User',});
    setLoggedIn(true);
  };

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
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Sign In</h2>

          <form onSubmit={() => ''} className="flex flex-col gap-4">
            <input type="email"placeholder="Email"
              className={`${customStyles?.mainGrayBg} rounded p-3 outline-none`}
              value={email} required
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className={`${customStyles?.mainGrayBg} rounded flex items-center outline-none`}>
              <input  type={showPassword ? "text" : 'password'} placeholder="Password"
               className="outline-none w-full p-3"
                autoComplete="off" value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <i  className={`fa-solid ${showPassword ? 'fa-eye' : 'fa-eye-slash'} | cursor-pointer px-3`}
                onClick={() => setShowPassword(prev => !prev)}
              />
            </div>

            <button type="submit"
              className={`${customStyles?.btnColor} text-white font-semibold rounded p-3 hover:opacity-90 transition1`}
            >
              Sign In
            </button>
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
        </div>
      </main>
    </section>
  );
};

export default SignIn;
