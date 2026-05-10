import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
      <h1 className="text-4xl font-bold text-slate-100 mb-4">404</h1>
      <p className="text-slate-400 mb-8">The page you're looking for doesn't exist.</p>
      <Link to="/" className="inline-block bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-500 transition-colors">
        Back to Home
      </Link>
    </div>
  );
}
