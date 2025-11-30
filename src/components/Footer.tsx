import { Github, Mail, Heart, Book, Code, ExternalLink } from 'lucide-react';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 text-white mt-20">
      {/* Wave Decoration */}
      <div className="w-full overflow-hidden leading-none">
        <svg className="relative block w-full h-12" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" 
            className="fill-gradient-to-br from-slate-100 via-gray-100 to-slate-200"
            style={{ fill: '#f1f5f9' }}
          ></path>
        </svg>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-lg">
                <Code className="text-white" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold">DFA Parking</h3>
                <p className="text-xs text-slate-400">System Simulation</p>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Simulasi interaktif sistem parkir otomatis menggunakan konsep Deterministic Finite Automata.
            </p>
            <div className="flex gap-3">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a 
                href="mailto:contact@example.com"
                className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Book size={18} className="text-emerald-400" />
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#simulation" className="text-slate-400 hover:text-emerald-400 transition-colors text-sm flex items-center gap-2">
                  <span>→</span> Simulasi
                </a>
              </li>
              <li>
                <a 
                  href="#about-section" 
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('about-section')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-slate-400 hover:text-emerald-400 transition-colors text-sm flex items-center gap-2 cursor-pointer"
                >
                  <span>→</span> Tentang Proyek
                </a>
              </li>
              <li>
                <a 
                  href="#docs-section"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('docs-section')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-slate-400 hover:text-emerald-400 transition-colors text-sm flex items-center gap-2 cursor-pointer"
                >
                  <span>→</span> Dokumentasi
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <ExternalLink size={18} className="text-emerald-400" />
              Resources
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors text-sm flex items-center gap-2">
                  <span>→</span> DFA Theory
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors text-sm flex items-center gap-2">
                  <span>→</span> Source Code
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors text-sm flex items-center gap-2">
                  <span>→</span> API Reference
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors text-sm flex items-center gap-2">
                  <span>→</span> Tutorial
                </a>
              </li>
            </ul>
          </div>

          {/* Technology Stack */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Tech Stack</h4>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1.5 bg-slate-700 text-emerald-400 rounded-lg text-xs font-medium border border-slate-600">
                React
              </span>
              <span className="px-3 py-1.5 bg-slate-700 text-blue-400 rounded-lg text-xs font-medium border border-slate-600">
                TypeScript
              </span>
              <span className="px-3 py-1.5 bg-slate-700 text-cyan-400 rounded-lg text-xs font-medium border border-slate-600">
                Tailwind CSS
              </span>
              <span className="px-3 py-1.5 bg-slate-700 text-purple-400 rounded-lg text-xs font-medium border border-slate-600">
                Vite
              </span>
              <span className="px-3 py-1.5 bg-slate-700 text-orange-400 rounded-lg text-xs font-medium border border-slate-600">
                Lucide Icons
              </span>
            </div>
            <div className="mt-4 p-3 bg-slate-800 rounded-lg border border-slate-700">
              <p className="text-xs text-slate-400">
                Built with modern web technologies for optimal performance.
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-700 my-8"></div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-sm text-center md:text-left">
            © {currentYear} DFA Parking System. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-slate-400 text-sm">
            <span>Made with</span>
            <Heart className="text-red-500 animate-pulse" size={16} fill="currentColor" />
            <span>for UAS Project</span>
          </div>
          <div className="flex gap-4 text-xs">
            <a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">
              Terms of Service
            </a>
          </div>
        </div>

        {/* Credit Badge */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 rounded-full border border-slate-700">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-xs text-slate-400">
              Proyek UAS - Teori Bahasa dan Automata
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

