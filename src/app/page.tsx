// app/page.tsx
import Head from 'next/head';
import dynamic from 'next/dynamic';

const Map = dynamic(() => import('./components/map'), { ssr: false });

const Home: React.FC = () => {
  // const mockDate = new Date('2024-09-15'); // Adjust as needed for testing

  return (
    <div>
      <Head>
        <title>Distance App</title>
        <meta name="description" content="Getting closer to my girlfriend every day!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Map />
    </div>
  );
};

export default Home;
