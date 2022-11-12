import { scroller } from 'react-scroll';
import stringifyObject from 'stringify-object';
import Layout from '~/components/Layout';
import NewTag from '~/components/new-tag';
import Resource from '~/components/resource';
import { Guide as GuideType } from '~/types';

const stringify = (input: any) =>
  stringifyObject(input, { singleQuotes: false, inlineCharacterLimit: 4 });

export const API_GUIDES: GuideType[] = [
  {
    heading: 'Get a random quote',
    link: '#random-quote',
    codeSample: {
      request: `fetch("https://animechan.vercel.app/api/random")
          .then((response) => response.json())
          .then((quote) => console.log(quote));`,
      response: stringify({ anime: '...', character: '...', quote: '...' }),
    },
  },

  {
    heading: 'Get a random quote by anime title',
    link: '#random-quote-by-anime',
    isNewlyAdded: true,
    codeSample: {
      request: `fetch("https://animechan.vercel.app/api/random/anime?title=naruto")
          .then((response) => response.json())
          .then((quote) => console.log(quote));`,
      response: stringify({ anime: 'Naruto', character: '...', quote: '...' }),
    },
  },
  {
    heading: 'Get a random quote by anime character',
    link: '#random-quote-by-character',
    isNewlyAdded: true,
    codeSample: {
      request: `fetch("https://animechan.vercel.app/api/random/character?name=saitama")
          .then((response) => response.json())
          .then((quote) => console.log(quote));`,
      response: stringify({ anime: '...', character: 'Saitama', quote: '...' }),
    },
  },
  {
    heading: 'Get 10 random quotes',
    link: '#10-quotes',
    codeSample: {
      request: `fetch("https://animechan.vercel.app/api/quotes")
          .then((response) => response.json())
          .then((quotes) => console.log(quotes));`,
      response: stringify([
        { anime: '...', character: '...', quote: '...' },
        '...9 more',
      ]),
    },
  },
  {
    heading: 'Get 10 quotes by anime title',
    link: '#10quotes-by-anime',
    codeSample: {
      request: `fetch("https://animechan.vercel.app/api/quotes/anime?title=naruto")
          .then((response) => response.json())
          .then((quotes) => console.log(quotes));`,
      response: stringify([
        { anime: 'Naruto', character: '...', quote: '...' },
        '...9 more',
      ]),
    },
  },
  {
    heading: 'Get 10 quotes by anime character',
    link: '#10quotes-by-character',
    codeSample: {
      request: `fetch("https://animechan.vercel.app/api/quotes/character?name=saitama")
          .then((response) => response.json())
          .then((quotes) => console.log(quotes));`,
      response: stringify([
        { anime: '...', character: 'Saitama', quote: '...' },
        '...9 more',
      ]),
    },
  },
  {
    heading: 'Pagination',
    subHeading:
      'Pagination works only on the query endpoints. Default pagination count is 10 quotes per page.',
    link: '#pagination',
    codeSample: {
      request: `fetch('https://animechan.vercel.app/api/quotes/anime?title=naruto&page=2')
      .then(response => response.json())
      .then(quotes => console.log(quotes))

      // works on character queries too 👇
      // https://animechan.vercel.app/api/quotes/character?name=luffy&page=2`,
      response: stringify([
        { anime: 'Naruto', character: '...', quote: '...' },
        '...9 more',
      ]),
    },
  },
];

export default function Guide() {
  const metaInfo = {
    title: 'Animechan – Guide',
    description: 'Documentation for all available API endpoints.',
    image: 'https://animechan.vercel.app/image/guide.jpeg',
  };

  return (
    <Layout metaInfo={metaInfo}>
      <div className="container relative lg:mx-auto px-2 max-w-4xl py-16 mt-10">
        <div>
          <h1 className="text-4xl font-bold mb-4">Docs</h1>
          <h2 className="text-lg">
            Below you'll find examples using{' '}
            <a href="https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API">
              Fetch API
            </a>{' '}
            but you can use any other http library out there.
          </h2>
        </div>

        <div className="mt-10 relative">
          <hr className="mb-5" />
          <h3 className="text-2xl font-bold mb-4 text-wavy">Important Notes</h3>
          <ol className="list-disc list-inside lg:text-lg text-base">
            <li>
              Default rate limit is <i className="font-medium">100 requests</i> per hour.
            </li>
            <li>
              Default number of quotes returned from query endpoints is{' '}
              <i className="font-medium">10.</i>
            </li>
            <li>
              If you don't find the anime you are looking for then{' '}
              <a
                target="_blank"
                href="https://github.com/rocktimsaikia/anime-chan/discussions/65">
                submit a request here.
              </a>
            </li>
          </ol>
        </div>

        <div className="my-10">
          <h1 className="text-2xl font-bold mb-4 text-wavy">Available routes</h1>
          <ul>
            {API_GUIDES.map((guide, index) => (
              <li
                key={guide.heading}
                className="my-2"
                onClick={() =>
                  scroller.scrollTo(guide.link, {
                    duration: 700,
                    delay: 100,
                    smooth: true,
                    offset: -50,
                  })
                }>
                {index + 1}. <a href={guide.link}>{guide.heading}</a>
                {guide.isNewlyAdded && <NewTag />}
              </li>
            ))}
          </ul>
        </div>
        <hr />

        <div className="my-10 space-y-40">
          {API_GUIDES.map((guide) => (
            <Resource {...guide} key={guide.heading} />
          ))}
        </div>
        <hr />
      </div>
    </Layout>
  );
}
