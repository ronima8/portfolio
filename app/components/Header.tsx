import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full border-b border-gray-800/70 bg-gray-950/70 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-lg font-semibold text-emerald-300">Pak Pavel</Link>
        <nav className="text-sm space-x-6 text-gray-200">
          <a href="#about" className="hover:text-emerald-300">About</a>
          <a href="#projects" className="hover:text-emerald-300">Projects</a>
          <a href="#contact" className="hover:text-emerald-300">Contact</a>
        </nav>
      </div>
    </header>
  );
}
