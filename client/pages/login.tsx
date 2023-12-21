import { GetServerSidePropsContext } from 'next';
import { isUserAuthenticated } from '~/utils/auth';

import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';
import Layout from '~/components/Layout';

const Login = ({ isAuthenticated }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();

  const handleSignUp = async (e: FormEvent) => {
    e.preventDefault();

    const body = {
      email: email,
      password: password,
    };

    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (response.ok) {
      // refresh the current page
      router.replace(router.asPath);
    }
  };

  return (
    <Layout>
      {isAuthenticated && (
        <div className="mt-20">
          <h1 className="font-bold text-3xl text-center">Already logged in.</h1>
        </div>
      )}
      {!isAuthenticated && (
        <form
          className="container relative max-w-lg px-2 py-16 lg:mx-auto flex flex-col space-y-4"
          onSubmit={handleSignUp}>
          <h1 className="font-bold text-3xl text-center">Login</h1>
          <fieldset className="flex flex-col space-y-2">
            <label htmlFor="email">
              <b>Email</b>
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              name="email"
              required
              className="border rounded-sm p-2 bg-gray-200 outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </fieldset>

          <fieldset className="relative flex flex-col space-y-2">
            <label htmlFor="psw">
              <b>Password</b>
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter Password"
                name="psw"
                required
                className="border rounded-sm p-2 bg-gray-200 outline-none w-full"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <div className="absolute right-0 bottom-0 top-0 cursor-pointer mt-3 mr-3">
                {!showPassword ? (
                  <EyeIcon className="w-5 " onClick={() => setShowPassword(true)} />
                ) : (
                  <EyeSlashIcon className="w-5" onClick={() => setShowPassword(false)} />
                )}
              </div>
            </div>
          </fieldset>

          <div>
            <button
              type="submit"
              className={clsx(
                'w-full mt-5 shadow-sm text-white font-bold uppercase text-sm px-6 py-3 rounded outline-none focus:outline-none bg-green-400 cursor-pointer hover:bg-green-500'
              )}>
              Login to your account
            </button>
          </div>
        </form>
      )}
    </Layout>
  );
};

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const isAuthenticated = isUserAuthenticated(context);
  return {
    props: {
      isAuthenticated,
    },
  };
};

export default Login;
