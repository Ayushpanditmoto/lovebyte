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
              type="button"
              onClick={loginWithGoogle}
              className="mt-6 text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2"
            >
              <svg
                className="w-4 h-4 mr-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 18 19"
              >
                <path
                  fillRule="evenodd"
                  d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z"
                  clipRule="evenodd"
                />
              </svg>
              Login with Google
            </button>
          )}
          {error && <p className="text-red-500 mt-5">{error}</p>}
          <div className="absolute bottom-1 text-center">
            <p className="text-white mt-5">
              By logging in, you agree to our Terms of Service and Privacy
              Policy
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
    </div>
  );
}
