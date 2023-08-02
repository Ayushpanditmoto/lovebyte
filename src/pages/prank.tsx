import React from "react";
import Image from "next/image";

function Prank() {
  return (
    <div
      className="wrapper w-screen h-screen bg-cover p-5"
      style={{ backgroundImage: "url(love.jpg)" }}
    >
      <div className="flex flex-row justify-center">
        <Image
          className="rounded-lg"
          src="/prank.jpg"
          alt="Picture of the author"
          width={150}
          height={300}
        />
        <Image
          className="rounded-lg"
          src="/prank2.jpg"
          alt="Picture of the author"
          width={150}
          height={300}
        />
      </div>
      <div className="flex flex-col justify-center m-4">
        <h2 className="text-white text-xl font-bold m-2">
          Sorry you have been pranked
        </h2>
        <p className="text-white">
          Your <b className="text-red-700">name</b>, your{" "}
          <b className="text-red-700">crush name</b> and your{" "}
          <b className="text-red-700">message</b> has been sent to the link
          creator.
        </p>
        <Image
          className="rounded-lg w-[150px]"
          src="/huehue.jpg"
          alt="Picture of the author"
          width={150}
          height={150}
        />
      </div>
      {/* But dont worry you can also do this type prank using this link */}

      <div>
        <h2 className="text-white text-l m-2">
          But dont worry you can also do this type prank using the button below
        </h2>
        <button className="bg-white text-black font-bold py-2 px-4 rounded mt-3">
          <a href="https://lovebytes.vercel.app/">Create your Own Link</a>
        </button>
      </div>
    </div>
  );
}

export default Prank;
