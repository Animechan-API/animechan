import Layout from '~/components/Layout';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';
import { ChangeEvent, FormEvent, useState } from 'react';
import validator from 'validator';
import clsx from 'clsx';
import { useRouter } from 'next/router';

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');

  const router = useRouter();

  const handleSignUp = async (e: FormEvent) => {
    e.preventDefault();

    const body = {
      username: username,
      password: password,
      email: email,
    };

    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (response.ok) {
      router.push('/login');
    }
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    setPassword(password);

    const passwordPoints = validator.isStrongPassword(password, {
      returnScore: true,
    });

    let strength = '';

    if (passwordPoints >= 50) {
      strength = 'Strong';
    } else if (passwordPoints >= 30) {
      strength = 'Good';
    } else if (passwordPoints >= 10) {
      strength = 'Weak';
    }
    setPasswordStrength(strength);
  };

  const isButtonDisabled =
    (passwordStrength !== 'Good' && passwordStrength !== 'Strong') || !email;

  return (
    <Layout>
      <form
        className="container relative max-w-lg px-2 py-16 lg:mx-auto flex flex-col space-y-4"
        onSubmit={handleSignUp}>
        <h1 className="font-bold text-3xl text-center">Sign Up</h1>

        <fieldset className="flex flex-col space-y-2">
          <label htmlFor="username" className="flex space-x-2">
            <b>Username </b>
            <span className="text-xs font-bold">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter username"
            name="username"
            required
            className="border rounded-sm p-2 bg-gray-200 outline-none"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </fieldset>

        <fieldset className="flex flex-col space-y-2">
          <label htmlFor="email" className="flex space-x-2">
            <b>Email </b>
            <span className="text-xs font-bold">*</span>
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
          <label htmlFor="pwd" className="flex space-x-2">
            <b>Password </b>
            <span className="text-xs font-bold">*</span>
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
              onChange={(e) => handlePasswordChange(e)}
            />

            <div className="absolute right-0 bottom-0 top-0 cursor-pointer mt-3 mr-3">
              {!showPassword ? (
                <EyeIcon className="w-5 " onClick={() => setShowPassword(true)} />
              ) : (
                <EyeSlashIcon className="w-5" onClick={() => setShowPassword(false)} />
              )}
            </div>
          </div>
          {/*TODO: Show only on focus */}
          <div>
            <div
              className={clsx('flex space-x-1', {
                'bg-gray-200': !password,
                'bg-red-400': passwordStrength === 'Weak',
                'bg-yellow-400': passwordStrength === 'Good',
                'bg-green-400': passwordStrength === 'Strong',
              })}>
              <div className="h-1 w-full border-r-4 border-white" />
              <div className="h-1 w-full border-r-4 border-white" />
              <div className="h-1 w-full" />
            </div>
            <span className="text-sm">{passwordStrength}</span>
          </div>
        </fieldset>

        <div>
          <button
            type="submit"
            disabled={isButtonDisabled}
            className={clsx(
              'w-full mt-5 shadow-sm text-white font-bold uppercase text-sm px-6 py-3 rounded outline-none focus:outline-none bg-green-400',
              {
                'opacity-50 cursor-not-allowed': isButtonDisabled,
                'cursor-pointer hover:bg-green-500': !isButtonDisabled,
              }
            )}>
            Create account
          </button>
        </div>
      </form>
    </Layout>
  );
};

export default SignUp;
