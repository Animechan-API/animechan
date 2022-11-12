import Link from 'next/link';
import { scroller } from 'react-scroll';

export default function Header() {
  return (
    <div className="container px-2 relative mx-auto max-w-4xl text-center mt-20 pt-20 pb-10 bg-gradient-to-r">
      <h1 className="lg:text-7xl text-6xl font-display font-bold text-shadow-md">
        Animechan
      </h1>
      <div className="py-10">
        <h2 className="text-2xl">A free restful API serving quality anime quotes</h2>
        <p className="my-2">
          Powered by <a href="https://koajs.com/">Koa.js</a> and{' '}
          <a href="https://www.mongodb.com/">MongoDB</a>
        </p>
      </div>

      <Link href="/docs">
        <button
          className="text-gray-800 shadow-sm inline-flex items-center bg-transparent border border-solid border-green-500 hover:bg-green-500 hover:text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded outline-none focus:outline-none mr-1 mb-1"
          type="submit"
          style={{ transition: 'all .15s ease' }}>
          Get started{' '}
          <svg
            className="ml-1 w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </Link>
      <a
        className="no-underline"
        target="_blank"
        href="https://www.buymeacoffee.com/rocktimcodes">
        <button className="ml-2 shadow-sm inline-flex items-center border border-solid border-green-500 bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded outline-none focus:outline-none mr-1 mb-1">
          Buy me a coffee{' '}
          <img src="/coffee-cup.png" height="12" width="12" className="ml-2" />
        </button>
      </a>
      <div className="mt-28">
        <button
          className="text-gray-800 focus:outline-none"
          aria-label="Scroll Down"
          onClick={() =>
            scroller.scrollTo('tryThis', {
              duration: 700,
              delay: 100,
              smooth: true,
              offset: -50,
            })
          }>
          <svg
            className="animate-bounce w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 13l-7 7-7-7m14-8l-7 7-7-7"></path>
          </svg>
        </button>
      </div>
    </div>
  );
}
