import React, { useState, useEffect, useContext} from "react";
import { useRouter } from "next/router";
import { auth } from "../firebase/config";
import { AiFillCopy } from "react-icons/ai";
import { AuthContext } from "@/context/authContext";
import Love from "@/types/lovetype";
import Spinner from "./spinner";

function HomePage() {
  let uid: string;

  const { getLove, loading } = useContext(AuthContext);
  const [love, setLove] = useState<Love[]>([]);
  const [shareableLink, setShareableLink] = useState<string>("");

  const fetchLove = async () => {
    const loveData = await getLove(uid);
    setLove(loveData ?? []);
  };
  useEffect(() => {
    console.log("useEffect");
    uid = auth.currentUser?.uid ?? "404";
    setShareableLink(`https://lovebytes.vercel.app/${uid}`);

    fetchLove();
  }, []);

  const handleCopy = () => {
    // navigator.clipboard.writeText(shareableLink);
    // alert("Copied to clipboard!");
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(shareableLink)
        .then(() => {
          alert("Copied to clipboard!");
        })
        .catch((error) => {
          console.error('Failed to copy to clipboard:', error);
        });
    } else {
      // Fallback for browsers that do not support the Clipboard API
      const input = document.createElement('input');
      input.value = shareableLink;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      alert("Copied to clipboard!");
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div
      className="wrapper p-2 w-screen h-screen bg-cover"
      style={{ backgroundImage: "url(love.jpg)" }}
    >
      <div className="flex flex-col items-center p-5">
        <h1 className="text-4xl font-bold text-white">Love ♥ Bytes</h1>
      </div>
      <div className="flex flex-col items-center p-5 ">
        <h1 className="text-2xl font-bold text-white">Shareable Link</h1>
        <p className="bg-gray-600 rounded-md p-5 text-white whitespace-normal break-all w-auto">
          {shareableLink}
        </p>
        <button
          onClick={handleCopy}
          className="bg-red-500  hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-3"
        >
          <AiFillCopy className="inline-block mr-2" />
          Copy Link
        </button>
      </div>

      {love.map((loves, index) => (
        // <div key={index} className="flex flex-col m-5 rounded-md bg-lime-200 items-center p-5 relative">
        //   <div className="absolute -top-4 -left-4 rounded-full bg-blue-500 text-white w-8 h-8 flex items-center justify-center">
        //     <span className="text-sm">{love.length - index}</span>
        //   </div>
        //   <table className="w-full table-auto">
        //     <thead>
        //     {
        //       new Date(parseInt(loves.createdAt)).toLocaleDateString("en-US", {
        //         weekday: "long",
        //         year: "numeric",
        //         month: "long",
        //         day: "numeric",
        //       })
        //       }
        //     </thead>

        //     <tr>
        //       <td className="px-4 py-2">Name</td>
        //       <td className="px-4 py-2">Crush</td>
        //     </tr>
        //     <tr>
        //       <td className="px-4 py-2">{loves.name}</td>
        //       <td className="px-4 py-2">{loves.partner}</td>
        //     </tr>
        //   </table>
        // </div>

        <div key={index} className="flex shadow-md flex-col m-5 rounded-md bg-white p-5 relative">
          <div className="absolute -top-4 -left-4 rounded-full bg-blue-500 text-white w-8 h-8 flex items-center justify-center">
            <span className="text-sm">{love.length - index}</span>
          </div>
          <div className="text-l bg-white rounded-sm mb-4">{formatDateTime(loves.createdAt)}</div>
          <div className="grid grid-cols-2 gap-4">
            <div className="whitespace-normal break-all w-auto bg-indigo-600 rounded-md p-2">
              <h2 className="text-m font-bold">Name</h2>
              <p>{loves.name}</p>
            </div>
            <div className="whitespace-normal break-all w-auto bg-violet-500 rounded-md p-2">
              <h2 className="text-m font-bold">Crush</h2>
              <p>{loves.partner}</p>
            </div>
          </div>
          <div className="mt-4 whitespace-normal break-all w-auto">
            <h2 className="text-l font-bold">Your Message:</h2>
            <p>{loves.message}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function formatDateTime(timestamp: string): string {
  const date = new Date(parseInt(timestamp));
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };
  return date.toLocaleString('en-US', options);
}

export default HomePage;
