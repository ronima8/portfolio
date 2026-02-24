import Socials from "./Socials";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-gray-800 bg-gray-950/80 text-center text-sm text-gray-400">
      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="mb-3"><strong className="text-emerald-300">Pak Pavel</strong> — built with Next.js</div>
        <Socials />
        <div className="mt-4">© {new Date().getFullYear()} Pak Pavel. All rights reserved.</div>
      </div>
    </footer>
  );
}
