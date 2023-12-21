import Highlight, { defaultProps } from 'prism-react-renderer';
import dracula from 'prism-react-renderer/themes/oceanicNext';
import { CodeBlock } from '~/types';

export default function Codeblock({ language, snippet }: CodeBlock) {
  return (
    <Highlight {...defaultProps} theme={dracula} code={snippet} language={language}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={`${className} rounded-md p-6 whitespace-pre-wrap overflow-auto lg:text-base text-xs`}
          style={style}>
          {tokens.map((line, i) => (
            <div {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
}
