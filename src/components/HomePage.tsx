import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { auth } from '../firebase/config';
import { AiFillCopy } from 'react-icons/ai';
import { AuthContext } from '@/context/authContext';
import Love from '@/types/lovetype';

const uid = auth.currentUser?.uid ?? "404";
const shareableLink = `https://lovebytes.vercel.app/${uid}`;

function HomePage() {
  const { getLove } = useContext(AuthContext);
  const router = useRouter();
  const [love, setLove] = useState<Love[]>([]);
  const [count, setCount] = useState(0);

  const fetchLove = async () => {
    const loveData = await getLove(uid);
    setLove(loveData ?? []);
  };
  useEffect(() => {
    console.log("useEffect");
    

    fetchLove();
  }, [count]);

  const handleCopy = () => {
    navigator.clipboard.writeText(shareableLink);
    alert("Copied to clipboard!");
  };

  return (
    <div className="wrapper w-screen h-screen bg-cover" style={{ backgroundImage: "url(love.jpg)" }}>
      <div className="flex flex-col items-center p-5">
        <h1 className="text-4xl font-bold text-white">Love ♥ Calculator</h1>
      </div>
      <div className="flex flex-col items-center p-5 bg-emerald-500">
        <h1 className="text-2xl font-bold text-white">Shareable Link</h1>
        <p className="text-white">{shareableLink}</p>
        <button
          onClick={handleCopy}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-10"
        >
          <AiFillCopy className="inline-block mr-2" />
          Copy Link
        </button>
      </div>
      {love.map((love) => (
        <div className="flex flex-col items-center p-5 bg-emerald-500" key={love.createdAt}>
          <h1 className="text-2xl font-bold text-white">Your Love</h1>
          <p className="text-white">{love.name}</p>
          <h1 className="text-2xl font-bold text-white">Your Crush</h1>
          <p className="text-white">{love.partner}</p>
          <h1 className="text-2xl font-bold text-white">Your Love Percentage</h1>
          <p className="text-white">{love.message}</p>
        </div>
      ))}
    </div>
  );
}

export default HomePage;
