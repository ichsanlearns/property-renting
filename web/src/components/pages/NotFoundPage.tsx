function NotFoundPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden font-display">
      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12 md:py-24">
        <div className="max-w-2xl w-full text-center">
          {/* Illustration Area */}
          <div className="relative mb-10 inline-block">
            <div className="absolute -inset-4 bg-primary/10 rounded-full blur-2xl"></div>
            <div className="relative flex items-center justify-center bg-white dark:bg-slate-800 size-48 md:size-64 rounded-full shadow-xl mx-auto border border-primary/5">
              <div className="flex flex-col items-center">
                <span className="material-symbols-outlined text-[80px] md:text-[110px] text-primary/30 absolute">home</span>
                <span className="material-symbols-outlined text-[50px] md:text-[70px] text-primary relative z-10 translate-x-4 translate-y-2">search_off</span>
              </div>
            </div>
          </div>

          {/* Error Message */}
          <div className="space-y-4">
            <h1 className="text-slate-900 dark:text-slate-50 text-4xl md:text-5xl font-extrabold tracking-tight">
              Oops! <span className="text-primary">Halaman tidak ditemukan</span>
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-lg md:text-xl max-w-lg mx-auto leading-relaxed">Sepertinya properti atau halaman yang Anda cari telah berpindah lokasi atau tidak tersedia saat ini.</p>
          </div>

          {/* Action Button */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              className="group flex items-center justify-center gap-2 min-w-50 h-14 bg-primary hover:bg-primary/90 text-white rounded-xl font-bold text-lg transition-all shadow-lg shadow-primary/20 hover:shadow-primary/40 active:scale-95"
              href="/"
            >
              <span className="material-symbols-outlined">home</span>
              <span>Kembali ke Beranda</span>
            </a>
            <button className="flex items-center justify-center gap-2 min-w-50 h-14 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-xl font-semibold text-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-all active:scale-95">
              <span className="material-symbols-outlined">support_agent</span>
              <span>Hubungi Bantuan</span>
            </button>
          </div>

          {/* Popular Links */}
          <div className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800">
            <p className="text-sm font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4">Mungkin Anda mencari:</p>
            <div className="flex flex-wrap justify-center gap-4">
              {["Apartemen Disewakan", "Rumah Dijual", "Properti Populer"].map((link) => (
                <a key={link} className="px-4 py-2 rounded-full bg-primary/5 dark:bg-primary/10 text-primary text-sm font-medium hover:bg-primary/10 transition-colors" href="#">
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default NotFoundPage;
