import Image from 'next/image';
import { Element } from 'react-scroll';
import CodeBlock from '~/components/codeblock';

export default function pagination() {
  const requestSample = `fetch('https://animechan.vercel.app/api/quotes/anime?title=naruto&page=2')
    .then(response => response.json())
    .then(quotes => console.log(quotes))

    // works on character queries too 👇
    // https://animechan.vercel.app/api/quotes/character?name=luffy&page=2`;

  const responseSample = `[{ anime: "Naruto", character: "...", quote: "..." }, ...9 more]`;

  return (
    <Element name="#pagination">
      <div className="mt-10">
        <h2 className="lg:text-2xl text-xl font-bold mb-4 text-wavy">Pagination</h2>
        <p className="lg:text-lg text-base mb-2">
          Pagination works only on the query endpoints. Default pagination count is 10
          quotes per page.
        </p>

        <CodeBlock language="javascript" snippet={requestSample} />
        <p className="py-5 text-base italic flex items-center">
          <Image src="/arrow-32.png" height="18" width="18" />
          <span className="ml-2">Output</span>
        </p>
        <CodeBlock language="javascript" snippet={responseSample} />
      </div>
    </Element>
  );
}
