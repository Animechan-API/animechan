import Head from 'next/head';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import Footer from '~/components/footer';
import HelloBar from '~/components/hello-bar';
import Navbar from '~/components/navbar';

interface MetaInformation {
  title: string;
  description: string;
  image: string;
  type: 'website';
}

interface Props {
  children: ReactNode;
  metaInfo?: Partial<MetaInformation>;
}

export default function Layout({ children, metaInfo }: Props) {
  const router = useRouter();

  const host =
    process.env.NODE_ENV !== 'production'
      ? 'http://localhost:3000'
      : 'https://animechan.vercel.app';

  const currentPath = host + router.asPath;

  const meta: MetaInformation = {
    title: 'Animechan – Anime quotes API',
    description: `Animechan is a free online REST API for anime quotes.`,
    image: `${host}/image/home.jpeg`,
    type: 'website',
    ...metaInfo,
  };

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="robots" content="follow, index" />
        <meta content={meta.description} name="description" />
        <meta property="og:url" content={currentPath} />
        <link rel="canonical" href={currentPath} />
        <meta property="og:type" content={meta.type} />
        <meta property="og:site_name" content="Animechan" />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:image" content={meta.image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.image} />
      </Head>
      <HelloBar />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
