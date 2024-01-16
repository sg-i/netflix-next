import axios from 'axios';
import Input from '../components/input';
import { useCallback, useEffect, useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import crypto from 'crypto';

import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';

const Auth = () => {
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [variant, setVariant] = useState('login');

  //verification email
  const [verificationCode, setVerificationCode] = useState('');
  const [codeWasSended, setCodeWasSended] = useState(false);
  const [emailWasVerifyed, setEmailWasVerifyed] = useState(false);

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) => (currentVariant === 'login' ? 'register' : 'login'));
  }, []);

  const login = useCallback(async () => {
    try {
      await signIn('credentials', {
        email,
        password,
        redirect: false,
        callbackUrl: '/',
      });
      router.push('/');
    } catch (error) {
      console.log(error);
    }
  }, [email, password, router]);

  const register = useCallback(async () => {
    try {
      await axios.post('/api/register', {
        email,
        name,
        password,
        code: verificationCode,
      });
      login();
    } catch (error) {
      console.log(error);
    }
  }, [email, name, password, login]);

  const sendVerificationCode = useCallback(async () => {
    try {
      await axios.post('/api/email/send-verification-code', {
        email,
      });
    } catch (error) {
      console.log(error);
    }
    setCodeWasSended(true);
  }, [email]);

  return (
    <div className="relative h-full  w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className="bg-black h-full  w-full lg:bg-opacity-50 ">
        <nav className="px-12 py-5">
          <img src="./images/logo.png" alt="Logo" className="h-12" />
        </nav>
        <div className="flex justify-center ">
          <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 rounded-md w-full">
            <h2 className="text-white mb-8 text-4xl font-semibold">
              {variant === 'login' ? 'Sign in' : 'Register'}
            </h2>
            <div className="flex flex-col gap-4">
              {variant === 'register' && (
                <Input
                  label="Username"
                  onChange={(ev: any) => setName(ev.target.value)}
                  id="name"
                  value={name}
                />
              )}
              <Input
                label="Email"
                onChange={(ev: any) => setEmail(ev.target.value)}
                id="email"
                type="email"
                value={email}
              />
              {variant === 'register' && email.includes('@') && (
                <div className="flex flex-row gap-4  items-center justify-end">
                  <button
                    onClick={sendVerificationCode}
                    className="rounded-md bg-white text-nowrap p-1">
                    Send Code
                  </button>
                  {codeWasSended && (
                    <>
                      <div className="">
                        <Input
                          disabled={!codeWasSended}
                          label="Verification Code for Email"
                          onChange={(ev: any) => setVerificationCode(ev.target.value)}
                          id="codeVerification"
                          type="name"
                          value={verificationCode}
                        />
                      </div>
                    </>
                  )}
                </div>
              )}
              <Input
                label="Password"
                onChange={(ev: any) => setPassword(ev.target.value)}
                id="password"
                type="password"
                value={password}
              />
            </div>
            <button
              onClick={variant === 'login' ? login : register}
              className="bg-red-600 py-3 disabled:bg-red-900 text-white rounded-md w-full mt-10 hover:bg-red-700 transition">
              {variant === 'login' ? 'Login' : 'Sign up'}
            </button>
            <div className="w-full mt-10 flex flex-row justify-center gap-5 items-center">
              <div
                onClick={() => {
                  signIn('google', { callbackUrl: '/' });
                }}
                className="bg-white w-10 h-10 flex justify-center items-center cursor-pointer rounded-full hover:opacity-80 transition">
                <FcGoogle size={30} />
              </div>
              <div
                onClick={() => {
                  signIn('github', { callbackUrl: '/' });
                }}
                className="bg-white w-10 h-10 flex justify-center items-center cursor-pointer rounded-full hover:opacity-80 transition">
                <FaGithub size={30} />
              </div>
            </div>
            <p className="text-neutral-500 mt-12">
              {variant === 'login' ? 'First time using Netflix?' : 'Already have an account?'}
              <span
                onClick={toggleVariant}
                className="text-white ml-1 hover:underline cursor-pointer">
                {variant === 'login' ? 'Create an account' : 'Login'}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
