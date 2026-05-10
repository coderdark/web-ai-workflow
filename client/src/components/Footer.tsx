export default function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-700 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} ApexTuts. All rights reserved.
      </div>
    </footer>
  );
}
