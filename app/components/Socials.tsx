export default function Socials() {
  return (
    <div className="flex items-center justify-center gap-4">
      <a href="https://github.com/" target="_blank" rel="noreferrer" aria-label="GitHub" className="text-emerald-300 hover:text-emerald-200">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 .5C5.7.5.9 5.3.9 11.6c0 4.6 3 8.4 7.1 9.8.5.1.7-.2.7-.5v-1.8c-2.9.6-3.5-1.3-3.5-1.3-.4-1.1-1-1.4-1-1.4-.8-.6.1-.6.1-.6.9.1 1.4.9 1.4.9.8 1.4 2.2 1 2.7.8.1-.6.3-1 .6-1.2-2.3-.3-4.7-1.2-4.7-5.2 0-1.2.4-2.2 1.1-3-.1-.3-.5-1.4.1-2.8 0 0 .9-.3 3 .9.9-.3 1.9-.5 2.9-.5 1 0 2 .2 2.9.5 2.1-1.2 3-.9 3-.9.6 1.4.2 2.5.1 2.8.7.8 1.1 1.8 1.1 3 0 4-2.4 4.9-4.7 5.2.3.2.6.8.6 1.6v2.4c0 .3.2.6.7.5 4.1-1.4 7.1-5.2 7.1-9.8C23.1 5.3 18.3.5 12 .5z" /></svg>
      </a>
      <a href="https://twitter.com/" target="_blank" rel="noreferrer" aria-label="Twitter" className="text-emerald-300 hover:text-emerald-200">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M23 4.6c-.7.3-1.6.6-2.4.7.9-.6 1.6-1.4 1.9-2.4-.9.6-1.9 1-3 1.2-1-1-2.6-1.6-4.1-1.6-3.1 0-5.5 2.7-4.8 5.6-4.1-.2-7.7-2.1-10.1-4.9-.6 1.1-.3 2.6.6 3.4-.6 0-1.2-.2-1.7-.5 0 1.9 1.3 3.6 3 4-.6.2-1.3.2-2 .1.6 2 2.5 3.4 4.6 3.4-2 .9-4.3 1.4-6.6 1.4-.4 0-.8 0-1.2-.1 2.3 1.5 5.1 2.4 8 2.4 9.6 0 14.8-8 14.8-14.9v-.7c1-.7 1.8-1.6 2.4-2.6z" /></svg>
      </a>
      <a href="mailto:you@example.com" aria-label="Email" className="text-emerald-300 hover:text-emerald-200">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/></svg>
      </a>
    </div>
  );
}
