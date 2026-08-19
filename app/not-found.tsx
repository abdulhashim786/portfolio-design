import { Link } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-[#0f172a] text-gray-900 dark:text-gray-100 p-4">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-6">Page Not Found</h2>
      <a
        href="/"
        className="px-6 py-3 rounded-lg bg-teal-500 hover:bg-teal-600 text-white font-medium transition-colors"
      >
        Return Home
      </a>
    </div>
  );
}
