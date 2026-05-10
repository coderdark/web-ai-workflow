import { Link, Route, Routes, useLocation } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { ClassesPage } from './pages/ClassesPage'
import { ClassPage } from './pages/ClassPage'
import { HowItWorksPage } from './pages/HowItWorksPage'
import { FaqPage } from './pages/FaqPage'

function NavLink({ to, label }: { to: string; label: string }) {
  const location = useLocation()
  const active = location.pathname === to
  return (
    <Link
      to={to}
      className={`rounded-full px-3 py-2 text-sm font-semibold transition ${active ? 'bg-teal-600 text-white' : 'text-slate-700 hover:bg-slate-100 hover:text-teal-700'}`}
    >
      {label}
    </Link>
  )
}

export function App() {
  return (
    <div className="min-h-screen flex flex-col text-slate-900">
      <header className="sticky top-0 z-20 border-b border-slate-300/50 bg-slate-100/75 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link to="/" className="brand-font text-2xl font-extrabold tracking-tight text-teal-700">ApexTuts</Link>
          <nav className="flex gap-2">
            <NavLink to="/classes" label="Classes" />
            <NavLink to="/how-it-works" label="How it works" />
            <NavLink to="/faq" label="FAQ" />
          </nav>
        </div>
      </header>
      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-8">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/classes" element={<ClassesPage />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/class/:slug" element={<ClassPage />} />
        </Routes>
      </main>
      <footer className="border-t border-slate-300/60 bg-slate-100/70">
        <div className="mx-auto max-w-6xl px-6 py-6 text-sm text-slate-600">
          © {new Date().getFullYear()} ApexTuts. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
