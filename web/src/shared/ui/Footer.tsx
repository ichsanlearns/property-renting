export default function Footer() {
  return (
    <footer className="max-w-7xl mx-auto px-4 py-8 border-t border-primary/10 text-center text-slate-500 dark:text-slate-400 text-sm">
      <p>© 2026 StayHub Inc. All rights reserved.</p>
      <div className="mt-2 flex justify-center gap-4">
        <a
          className="hover:text-primary underline-offset-4 hover:underline"
          href="#"
        >
          Privacy Policy
        </a>
        <a
          className="hover:text-primary underline-offset-4 hover:underline"
          href="#"
        >
          Terms of Service
        </a>
      </div>
    </footer>
  );
}
