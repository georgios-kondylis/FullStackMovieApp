import React, { useState } from 'react';
import { useGlobalProps, MoviesBg, Logo } from '../../exports';

type User = {
  firstName: string;
  lastName?: string;
  isGuest: boolean;
};

const SignUp = ({ setUser }: any) => {
  const { customStyles } = useGlobalProps();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setUser({
      firstName: 'User',
      lastName: '',
      isGuest: false,
    });
  };

  return (
    <section className="z-[9999] fixed inset-0 w-full min-h-screen mainPX flex justify-center">
      {/* Background Image + Overlay */}
     <MoviesBg/>

      {/* Main Content */}
      <main className="MAX_W relative z-10 MAX_W">
        {/* Logo */}
       <Logo/>

        {/* Form */}
        <div className="max-w-[450px] mx-auto bg-black/80 px-6 py-8 rounded-lg text-white mt-[10%]">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Sign In</h2>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input type="email"
              placeholder="Email"
              className={`${customStyles?.mainGrayBg} rounded p-3 outline-none`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div className={`${customStyles?.mainGrayBg} rounded flex items-center outline-none`}>
              <input type={showPassword ? "text" : 'password'}
                placeholder="Password"
                autoComplete='off'
                className={`outline-none w-full p-3`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <i className={`fa-solid ${showPassword? 'fa-eye' : 'fa-eye-slash'} | cursor-pointer px-3`}
              onClick={() => setShowPassword(prev => !prev)}/>
            </div>
            

            <button type="submit"
              className={`${customStyles?.btnColor} text-white font-semibold rounded p-3 hover:opacity-90 transition1`}
            >
              Sign In
            </button>
          </form>

          {/* Guest option */}
          <button onClick={() => setUser({ firstName: 'Guest', isGuest: true })}
            className="mt-4 text-sm text-gray-300 underline hover:text-white transition1 cursor-pointer"
          >
            Continue as Guest
          </button>

          {/* Extra info */}
          <p className="text-sm text-gray-400 mt-6 text-center">
            New to Cinemoon? <span className="text-white underline cursor-pointer">Create an account</span>
          </p>
        </div>
      </main>
    </section>
  );
};

export default SignUp;





// <button onClick={() => setUser({ firstName: 'Guest', isGuest: true })}>
// Continue as Guest
// </button>
// <button onClick={() => {
// // show form or redirect to sign up page
// }}>
// Create Account
// </button>