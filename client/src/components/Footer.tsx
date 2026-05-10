export default function Footer() {
  return (
    <footer className="bg-stone-100 border-t border-stone-200 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-sm text-stone-500">
        © {new Date().getFullYear()} ApexTuts. All rights reserved.
      </div>
    </footer>
  );
}
