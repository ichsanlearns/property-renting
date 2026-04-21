function ImageGallery() {
  return (
    <div className="bg-black text-white w-screen h-screen overflow-hidden relative font-body selection:bg-primary selection:text-white">
      <div className="absolute inset-0 w-full h-full z-0 p-2 md:p-4">
        <div className="w-full h-full rounded-2xl md:rounded-4xl overflow-hidden relative">
          <img
            alt="Luxurious oceanfront bedroom with panoramic floor-to-ceiling windows"
            className="w-full h-full object-cover"
            data-alt="Wide shot of an ultra-modern luxury bedroom overlooking the ocean at sunset with warm glowing light"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCaH5Vs8_yavagEWkglVjg7YL4PesNJz6JvDKlZwewrVshaXuRgIr6mgXWOPpDZkbITGSJ9LxmOOxI-C_zsh4o5UqLwz0VMQF2aWNmMfcZ6k6cdfHID8OxA9TPtajOHr3Tre9OjP3E3krwbZGZywTt_86S19AneCzd1g_y_STgisB-aVvndAsyUKxpeFXf96Ysa79I0nX3jtmcQrfe8ljj5uMfQ3mQbM-BbU_skqfpTjmGx9Ltb2P2Vfqkz5FUsQg0llyiPcB6bPGSa"
          />
        </div>
      </div>
      <div className="absolute top-0 inset-x-0 h-40 gradient-top z-10 pointer-events-none rounded-t-2xl md:rounded-t-4xl mx-2 md:mx-4 mt-2 md:mt-4"></div>
      <header className="absolute top-8 md:top-10 inset-x-8 md:inset-x-12 z-20 flex justify-between items-center w-auto">
        <div className="text-white/90 text-xs md:text-sm font-medium tracking-widest drop-shadow-sm bg-black/20 backdrop-blur-lg px-4 py-2 rounded-full border border-white/10">
          1 / 12
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden md:flex gap-1 bg-black/20 backdrop-blur-lg rounded-full p-1 border border-white/10">
            <button
              aria-label="zoom in"
              className="text-white/80 hover:text-white transition-colors active:scale-95 duration-200 p-2 rounded-full hover:bg-white/10"
            >
              <span
                className="material-symbols-outlined text-[20px]"
                data-icon="zoom_in"
              >
                zoom_in
              </span>
            </button>
            <button
              aria-label="zoom out"
              className="text-white/80 hover:text-white transition-colors active:scale-95 duration-200 p-2 rounded-full hover:bg-white/10"
            >
              <span
                className="material-symbols-outlined text-[20px]"
                data-icon="zoom_out"
              >
                zoom_out
              </span>
            </button>
          </div>
          <button
            aria-label="close gallery"
            className="bg-black/20 backdrop-blur-lg border border-white/10 hover:bg-white/10 text-white/90 hover:text-white transition-all active:scale-95 duration-200 p-2.5 rounded-full shadow-lg"
          >
            <span
              className="material-symbols-outlined text-[20px]"
              data-icon="close"
            >
              close
            </span>
          </button>
        </div>
      </header>
      <div className="absolute bottom-40 md:bottom-44 left-8 md:left-12 z-20 pointer-events-none drop-shadow-md">
        <h1 className="text-white/90 font-headline text-2xl md:text-3xl font-medium tracking-tight">
          Master Suite
        </h1>
        <p className="text-white/60 text-sm mt-1">Ocean Breeze Villa</p>
      </div>
      <button
        aria-label="Previous image"
        className="absolute left-6 md:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-black/20 hover:bg-black/40 backdrop-blur-xl text-white/90 hover:text-white transition-all hover:scale-105 hover:brightness-110 shadow-lg border border-white/10 group mt-8 lg:mt-0"
      >
        <span
          className="material-symbols-outlined text-3xl group-hover:-translate-x-0.5 transition-transform"
          data-icon="chevron_left"
        >
          chevron_left
        </span>
      </button>
      <button
        aria-label="Next image"
        className="absolute right-6 md:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-black/20 hover:bg-black/40 backdrop-blur-xl text-white/90 hover:text-white transition-all hover:scale-105 hover:brightness-110 shadow-lg border border-white/10 group mt-8 lg:mt-0"
      >
        <span
          className="material-symbols-outlined text-3xl group-hover:translate-x-0.5 transition-transform"
          data-icon="chevron_right"
        >
          chevron_right
        </span>
      </button>
      <div className="absolute bottom-0 inset-x-0 h-64 gradient-bottom z-10 pointer-events-none rounded-b-2xl md:rounded-b-4xl mx-2 md:mx-4 mb-2 md:mb-4"></div>
      <footer className="absolute bottom-8 md:bottom-10 w-full flex items-end justify-center px-4 z-30">
        <div className="bg-black/30 backdrop-blur-2xl p-3 md:p-4 rounded-3xl border border-white/10 shadow-2xl">
          <div className="flex gap-4 overflow-x-auto snap-x hide-scrollbar max-w-[90vw] md:max-w-3xl items-center">
            <button className="shrink-0 snap-center w-[100px] h-[70px] md:w-[120px] md:h-[80px] rounded-xl overflow-hidden border-2 border-white scale-105 shadow-xl relative transition-all z-10">
              <img
                className="w-full h-full object-cover"
                data-alt="Thumbnail of modern master bedroom with ocean view"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDBUCGAdHW5urrNzh54OCwWF9jQLGYb8fSDftyTldyXLBVC-pWK_pEw2ZdvLB0ERuupoqPTt7HAJj6rxt-A5SM8uc_9hCQgtg254Cwe5P-E7FNG-3LYXBR6vlcVce1VObYZDtzUXsd1SEbkEGdQuRtLFbNfzebxew_uEUI_M0RSSCClZa3h9_XxKoeUJfPggBYtQibfto_Ja3zIPZaiAN_L6rpVWq9CvqEQzZtCyhdbyJcG-hcOwC9LvHp8mZkfPwnxViwWb29KVvtI"
              />
            </button>
            <button className="shrink-0 snap-center w-[100px] h-[70px] md:w-[120px] md:h-[80px] rounded-xl overflow-hidden border border-white/10 opacity-50 hover:opacity-100 transition-all hover:scale-105 active:scale-95">
              <img
                className="w-full h-full object-cover"
                data-alt="Thumbnail of secondary bedroom with light wood accents"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCZUKIqeT7sIRmquQMkBUucWK2OEftN0IkIxDqOTpRUvgUqDSBiwrFVExnXnFYme9eTybNN1kA9ZZfJ-Zk-VNaDdz-vUyCCb8hkZXtuMx2w1TppaGRiw9ZSkHSr4sIq1t6HzEKkZEP_EBasDBHUCSb4TTNBMFn9zQ-urJ5e_YBzsXCSAkhQ0DnVTGyxzAMghRRPlSfixnPcWXyMIolhF6-mMD9yGUvQnd4b3DMsWzeB0d3HMvTED6Bf-_I0ACxCSBY4YqfH2SfmdfBk"
              />
            </button>
            <button className="shrink-0 snap-center w-[100px] h-[70px] md:w-[120px] md:h-[80px] rounded-xl overflow-hidden border border-white/10 opacity-50 hover:opacity-100 transition-all hover:scale-105 active:scale-95">
              <img
                className="w-full h-full object-cover"
                data-alt="Thumbnail of luxurious bathroom with freestanding tub"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAfM0vuARTTuwj58Qtt3NW_q5YNEBtdRBUHZOoB-xiIm8dP-dZG_AsFgnzktRIXptHoKqQgQUDTeeThv0ELVw12eHyi784F8tLvTxkacQXeQN-BwgP0xf50L0fEG8uj_rIrKsACOKfK-SW5mrvdKAksf8qrGmJeHVz8vwaTzTqoCLJHSvEuhwmceEP86yH6AEgsvVTqcTYgS3iICQlHP09-9VV-ZEpL6BYoQ1boIOEYLry3rmJ5wtuex3z4QgISeSBW0BOTGR_3bwaR"
              />
            </button>
            <button className="shrink-0 snap-center w-[100px] h-[70px] md:w-[120px] md:h-[80px] rounded-xl overflow-hidden border border-white/10 opacity-60 hover:opacity-100 transition-all hover:scale-105 active:scale-95 relative group">
              <img
                className="w-full h-full object-cover"
                data-alt="Thumbnail of walk in closet"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuADZ40YStBG_GianZzSodMpI4O_vOC4x9B1VfP8r8NCDDLDmpOZIT2_cex_4owLp1O_3YyNQ0BsECU3WqdLP9phwQIHIoqWbw7t_LVSQaaFdHq_6yYToMdIfb0ReILZgXQgunhrBomjOW0qtqYP11ioxjAYWfiBgsf5nttt9wRcKTc1EiHzxzOH8rV5ryRKJr7PlhnNg4gNUy1NB7-wzJDD8uOyYaVCQepdycTFqjfYxBG-UWHMRppWHiWTxwk5Qf5iplsn6lebm5iB"
              />
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center group-hover:bg-black/40 transition-colors backdrop-blur-[2px]">
                <span className="text-[10px] md:text-xs font-semibold tracking-widest text-white/90 drop-shadow-sm">
                  +8 MORE
                </span>
              </div>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default ImageGallery;
