import Link from "next/link";
import "tailwindcss/tailwind.css";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
      <p className="text-lg mt-2">
        The page you are looking for does not exist.
      </p>
      <Link href="/">
        <div className="mt-4 text-blue-500 hover:underline">
          Go back to the homepage
        </div>
      </Link>
    </div>
  );
}
