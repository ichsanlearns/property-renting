function HeroCarousel() {
  return (
    <section className="relative h-[870px] min-h-[600px] w-full flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="hero-slide absolute inset-0 transition-opacity duration-1000 ease-in-out opacity-100 z-10">
          <img
            alt="Immersive mountain cabin"
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBDvScxN3ZKwrpko-r8nWgN7Ppm8keEhJe4xBo3Egr5zWPihCjyyyBBLeRXl4faC8QKSpnu7hMjzy1eLIdY1NikIIIGQAWy8xq_QY3AJz6VHt9o7SHwlmShammFTZi9khzTLIK73VWR5myMPWSaQCTpplI0MA9tldv9rPLKkfuy12g-G7jiFyUph9PAMNil3Uue33Rkddk6y2BYN-83R5CqApkMIbH3EU19ZEXc7gnKVX0Z13sqpkMEZi3cX2tFnvozFKPyhEJOm-tw"
          />
          <div className="absolute inset-0 hero-gradient"></div>
          <div className="absolute inset-0 flex items-center justify-center pb-24 px-6">
            <div className="text-center w-full max-w-5xl">
              <h1 className="text-4xl md:text-7xl font-extrabold text-white mb-6 tracking-tight leading-[1.1]">
                Escape to the <span className="text-[#ff5c61]">Peaks</span>.
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-12 max-w-2xl mx-auto font-medium">
                Discover unique homes and unforgettable experiences in over 190
                countries.
              </p>
            </div>
          </div>
        </div>
        <div className="hero-slide absolute inset-0 transition-opacity duration-1000 ease-in-out opacity-0 z-0">
          <img
            alt="Luxury beach villa"
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAwA-18xNeHhrnf3rMWjHf3KZwuSNcjLT6FeOg3bv2YWBGfx-XCKNeWJs8OnPFZn6hNDjrFNpv-i8Rx60K_yjSi5kthdYCZSSdnq5ZjCFi-_pCEf70HHv0rJaensp7PncpVLdQz-yxHiN_UHqq55x6R-GQExvjJ3tMqjSndmYILwRhcpR0MnignnIAqCyvpES3UI6RVYYIk3MOg8LvHCmGbZPthMV5pF0EhaoWquQGb4ToY1DDcFNaafTatM2p6qsT3cY77xfg2cFWY"
          />
          <div className="absolute inset-0 hero-gradient"></div>
          <div className="absolute inset-0 flex items-center justify-center pb-24 px-6">
            <div className="text-center w-full max-w-5xl">
              <h1 className="text-4xl md:text-7xl font-extrabold text-white mb-6 tracking-tight leading-[1.1]">
                Your Private <span className="text-[#ff5c61]">Paradise</span>.
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-12 max-w-2xl mx-auto font-medium">
                Find your perfect coastal escape and let the sound of waves
                recharge you.
              </p>
            </div>
          </div>
        </div>
        <div className="hero-slide absolute inset-0 transition-opacity duration-1000 ease-in-out opacity-0 z-0">
          <img
            alt="Modern city loft"
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBJJ8t7I1fMx-mQueciYd3G_x1x5ko4uAAsR9TPpovzrqelwSYMEswzeZYZtfXiaY0yR53uZsb1v0Gs2Wbpm_z9tBMdToH1qlKqGON2l5uIl4-z6eEVrtZK7tR1Ho-laUSLUYMEfycXLyl2KwItr10VPPz6yrU1DtQMEoCjG1mls5gxBAzweGgrSkVkG2Qvlv7I9LsJ-81Gy8DaRe6AasINGYmme2Tqjybn6nw1EuaDB7D7ns195Mf09ZfNPm5sW3kEKfXTWrmm5OGQ"
          />
          <div className="absolute inset-0 hero-gradient"></div>
          <div className="absolute inset-0 flex items-center justify-center pb-24 px-6">
            <div className="text-center w-full max-w-5xl">
              <h1 className="text-4xl md:text-7xl font-extrabold text-white mb-6 tracking-tight leading-[1.1]">
                Urban <span className="text-[#ff5c61]">Masterpieces</span>.
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-12 max-w-2xl mx-auto font-medium">
                Live like a local in breathtaking lofts situated in the heart of
                global cities.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="relative z-20 w-full max-w-5xl px-6 mt-48">
        <div className="glass-search max-w-4xl mx-auto rounded-full p-2 shadow-2xl flex flex-col md:flex-row items-center gap-2 group transition-all duration-500 hover:rounded-3xl">
          <div className="flex-1 w-full flex items-center px-6 py-3 border-r border-slate-200/50">
            <span
              className="material-symbols-outlined text-slate-400 mr-3"
              data-icon="search"
            >
              search
            </span>
            <input
              className="w-full bg-transparent border-none focus:ring-0 text-slate-800 placeholder-slate-400 font-medium text-base"
              placeholder="Search city, country, or property"
              type="text"
            />
          </div>
          <div className="hidden md:flex items-center gap-2 px-4">
            <div className="text-left px-4 py-2 hover:bg-slate-100 rounded-full cursor-pointer transition-colors">
              <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                Dates
              </p>
              <p className="text-sm font-semibold text-slate-800">Add dates</p>
            </div>
            <div className="text-left px-4 py-2 hover:bg-slate-100 rounded-full cursor-pointer transition-colors">
              <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                Guests
              </p>
              <p className="text-sm font-semibold text-slate-800">Add guests</p>
            </div>
          </div>
          <button className="w-full md:w-auto bg-[#ff5c61] text-white p-4 rounded-full flex items-center justify-center hover:bg-[#e64a50] transition-colors shadow-lg shadow-[#ff5c61]/30">
            <span className="material-symbols-outlined" data-icon="search">
              search
            </span>
            <span className="md:hidden ml-2 font-bold">Search</span>
          </button>
        </div>
      </div>
      <button
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 hover:bg-white/30 backdrop-blur-md text-white transition-all shadow-lg border border-white/20"
        //   onclick="prevSlide()"
      >
        <span className="material-symbols-outlined text-3xl">chevron_left</span>
      </button>
      <button
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 hover:bg-white/30 backdrop-blur-md text-white transition-all shadow-lg border border-white/20"
        //   onclick="nextSlide()"
      >
        <span className="material-symbols-outlined text-3xl">
          chevron_right
        </span>
      </button>
      <div className="absolute bottom-16 z-20 flex gap-3 pb-8">
        <button
          className="hero-dot w-3 h-3 rounded-full bg-white transition-all shadow-md"
          // onclick="changeSlide(0)"
        ></button>
        <button
          className="hero-dot w-3 h-3 rounded-full bg-white/50 hover:bg-white/80 transition-all shadow-md"
          // onclick="changeSlide(1)"
        ></button>
        <button
          className="hero-dot w-3 h-3 rounded-full bg-white/50 hover:bg-white/80 transition-all shadow-md"
          // onclick="changeSlide(2)"
        ></button>
      </div>
    </section>
  );
}

export default HeroCarousel;
