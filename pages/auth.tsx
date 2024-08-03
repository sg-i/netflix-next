import axios from 'axios';
import Input from '../components/input';
import { useCallback,  useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';

import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import AuthActionModeButton from '../components/AuthActionModeButton';

const Auth = () => {
  const router = useRouter();
  const [typeAuthAction, setTypeAuthAction] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [variant, setVariant] = useState('login');

  //verification email
  const [verificationCode, setVerificationCode] = useState('');
  const [codeWasSended, setCodeWasSended] = useState(false);

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) => (currentVariant === 'login' ? 'register' : 'login'));
  }, []);

  const demoAuth = useCallback(async () => {
    try {
      await signIn('credentials', {
        email: 'guest@gmail.com',
        password: 'guest_password',
        redirect: false,
        callbackUrl: '/',
      });
      router.push('/');
    } catch (error) {
      console.log(error);
    }
  }, [router]);

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
  }, [email, name, password, login, verificationCode]);

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
            {typeAuthAction === '' ? (
              <div className="flex flex-col">
                <h1 className="text-white text-4xl text-center">Select mode</h1>
                <div className="flex gap-6">
                  <AuthActionModeButton text="Demo Account" click={() => demoAuth()} />
                  <AuthActionModeButton
                    text="Real Sign In"
                    click={() => setTypeAuthAction('Real Sign In')}
                  />
                </div>
              </div>
            ) : (
              <div>
                <div className="flex justify-between  mb-8">
                  <h2 className="text-white  text-4xl font-semibold">
                    {variant === 'login' ? 'Sign in' : 'Register'}
                  </h2>
                  <h2
                    onClick={() => setTypeAuthAction('')}
                    className="text-lg pt-3 underline cursor-pointer text-white ">
                    Go back
                  </h2>
                </div>

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
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
