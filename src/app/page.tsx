// app/page.tsx

import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold mb-6">Welcome to Resume Builder</h1>
      <p className="text-lg mb-8 text-center">
        Create your professional resume by selecting a template and adding your personal and job-related information.
      </p>
      <Link
        href="/resume"
        className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition"
      >
        Get Started
      </Link>
    </div>
  );
}