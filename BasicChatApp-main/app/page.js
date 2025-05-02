import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-blue-500 to-blue-700 text-white">
      <div className="text-center px-4">
        <h1 className="text-5xl font-bold mb-4">Welcome to ChatApp</h1>
        <p className="text-xl mb-8 max-w-md mx-auto">
          Connect with friends and colleagues through seamless messaging. Simple, fast, and secure.
        </p>
        <Link href="/login">
          <button className="bg-white text-blue-600 font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-gray-100 transition">
            Get Started
          </button>
        </Link>
      </div>
    </div>
  );
}