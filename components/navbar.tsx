import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';
import Discord from '~/components/icons/discord';
import GithubIcon from '~/components/icons/github';

export default function Navbar() {
  const [navbarOpen, setNavbarOpen] = React.useState<boolean>(false);

  return (
    <div className="shadow-md">
      <nav className="container relative lg:mx-auto px-2 max-w-4xl py-3 navbar-expand-lg mb-3 text-green-700">
        <div className="container mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link href="/">
              <span
                onClick={() => setNavbarOpen(false)}
                className="text-lg font-bold leading-relaxed inline-block mr-4 py-2 whitespace-no-wrap no-underline cursor-pointer">
                Animechan
              </span>
            </Link>
            <button
              className="text-gray-800 cursor-pointer text-xl leading-none py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              aria-label="Hamburger Menu"
              onClick={() => setNavbarOpen(!navbarOpen)}>
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>

          <div
            className={clsx('lg:flex flex-grow items-center', {
              hidden: !navbarOpen,
            })}>
            <ul
              className="flex flex-col lg:flex-row list-none ml-auto"
              onClick={() => setNavbarOpen(false)}>
              <li className="nav-item">
                <Link href="/docs">
                  <a className="no-underline px-3 py-2 flex items-center text-sm font-bold leading-snug cursor-pointer hover:opacity-75">
                    <span className="ml-2">Docs</span>
                  </a>
                </Link>
              </li>
              <li className="nav-item">
                <Link href="https://github.com/rocktimsaikia/anime-chan">
                  <a
                    className="no-underline px-3 py-2 flex items-center text-sm font-bold leading-snug cursor-pointer hover:opacity-75"
                    target="_blank">
                    <GithubIcon height={18} width={18} />
                    <span className="ml-2">Github</span>
                  </a>
                </Link>
              </li>
              <li className="nav-item">
                <Link href="https://discord.gg/yVEDXVYaT3">
                  <a
                    className="no-underline px-3 py-2 flex items-center text-sm font-bold leading-snug cursor-pointer hover:opacity-75"
                    target="_blank">
                    <Discord height={18} width={18} />
                    <span className="ml-2">Discord</span>
                  </a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
