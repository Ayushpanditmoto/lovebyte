import Image from "next/image";
import { Inter } from "next/font/google";
import { AuthContext } from "@/context/authContext";
import { useContext } from "react";
import Spinner from "@/components/spinner";
import HomePage from "@/components/HomePage";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { user, loginWithGoogle, loading, error, logout } =
    useContext(AuthContext);

  if (loading) return <Spinner />;

  if (user) return <HomePage />;

  return (
    <div
      className="wrapper w-screen h-screen bg-cover"
      style={{ backgroundImage: "url(love.jpg)" }}
    >
      {/* Login with Google */}
      <div className="flex flex-col items-center justify-center h-screen p-5">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold text-white">Love</h1>
          <h1 className="text-4xl font-bold text-white">♥</h1>
          <h1 className="text-4xl font-bold text-white">Calculator</h1>
          {user ? (
            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-10"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={loginWithGoogle}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-10"
            >
              Login with Google
            </button>
          )}
          {error && <p className="text-red-500 mt-5">{error}</p>}
          <p className="text-white mt-5">
            By logging in, you agree to our Terms of Service and Privacy Policy
          </p>
          <p className="text-white m-5">
            Made with <span className="text-red-500">❤</span> by{" "}
            <a href="" className="text-red-500">
              @ayushpanditmoto
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
