import Image from 'next/image';
import { Element } from 'react-scroll';
import CodeBlock from '~/components/codeblock';
import NewTag from '~/components/new-tag';
import { Guide } from '~/types';

export default function Resource({
  heading,
  subHeading,
  codeSample,
  link,
  isNewlyAdded,
}: Guide) {
  return (
    <Element name={link}>
      <div>
        <h2 className="lg:text-2xl text-xl font-bold mb-4 text-wavy">
          {heading}
          {isNewlyAdded && <NewTag />}
        </h2>
        {subHeading && (
          <p className="lg:text-lg text-base mb-2">
            Pagination works only on the query endpoints. Default pagination count is 10
            quotes per page.
          </p>
        )}
        <CodeBlock language="javascript" snippet={codeSample.request} />
        <p className="py-5 text-base italic flex items-center">
          <Image src="/arrow-32.png" height="18" width="18" alt="" />
          <span className="ml-2">Output</span>
        </p>
        <CodeBlock language="javascript" snippet={codeSample.response} />
      </div>
    </Element>
  );
}
