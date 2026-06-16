export default function Footer() {
  return (
    <footer className="w-full py-8 border-t border-border-custom mt-auto">
      <div className="max-w-5xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-text-muted">
        <p>Dinesh Abbi — built with Next.js, hosted on Vercel</p>
        <div className="flex gap-4">
          <a href="https://github.com/dinesh-abbi" target="_blank" rel="noopener noreferrer" className="hover:text-text-primary transition-colors">
            GitHub
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-text-primary transition-colors">
            LinkedIn
          </a>
          <a href="mailto:abhidinesh0215@gmail.com" className="hover:text-text-primary transition-colors">
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
