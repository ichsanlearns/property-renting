import Footer from "../../../shared/ui/Footer";

function HomePage() {
  return (
    <main>
      <section className="relative h-[870px] min-h-[600px] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            alt="Luxury villa with pool at sunset"
            className="w-full h-full object-cover"
            data-alt="Stunning modern villa architecture with a glowing infinity pool against a dramatic pink and purple sunset sky over a coastline"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBjpk9UDvae3f0IJJzw4-RWRD02vwOuBrCnwJx_3dc31vbmYBMr90bbXlsfCa6QCNd6QlFWsGEbrs8XOPuM7a3RhjEvKOh1CLqH_uxycHv4umft2W4o_L-VqLebec8jJ1lmqCHlW_1bCFX5twGC2qVY516_SijotPVaqXZ5rn0-2uBNTctQCzrpmiDyK34O8PilS0zCMbY2SK4BbBxSu1s4-0BRNXMS-TCsq0CWYrs0LyyZ1Zkt3WhUa8BictJqu1Zb13C28I7TXQEW"
          />
          <div className="absolute inset-0 hero-gradient"></div>
        </div>
        <div className="relative z-10 w-full max-w-5xl px-6 text-center">
          <h1 className="text-4xl md:text-7xl font-extrabold text-white mb-6 tracking-tight leading-[1.1]">
            Your gateway to <br />
            <span className="text-[#ff5c61]">extraordinary</span>
            stays.
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-12 max-w-2xl mx-auto font-medium">
            Discover unique homes and unforgettable experiences in over 190
            countries.
          </p>
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

            <button className="w-full md:w-auto bg-[#ff5c61] text-white p-4 rounded-full flex items-center justify-center hover:bg-[#e64a50] transition-colors shadow-lg shadow-[#ff5c61]/30">
              <span className="material-symbols-outlined" data-icon="search">
                search
              </span>
              <span className="md:hidden ml-2 font-bold">Search</span>
            </button>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 md:px-12 max-w-[1440px] mx-auto">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-extrabold text-on-background tracking-tight">
              Stay somewhere unique
            </h2>
            <p className="text-on-surface-variant mt-1">
              Hand-picked homes for every traveler.
            </p>
          </div>
          <a
            className="text-[#ff5c61] font-bold flex items-center hover:underline"
            href="#"
          >
            View all
            <span
              className="material-symbols-outlined ml-1 text-sm"
              data-icon="arrow_forward"
            >
              arrow_forward
            </span>
          </a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="group cursor-pointer">
            <div className="relative aspect-4/5 rounded-3xl overflow-hidden property-card-shadow transition-all duration-300 transform group-hover:scale-[1.02]">
              <img
                alt="Modern wood cabin"
                className="w-full h-full object-cover"
                data-alt="Architectural wood and glass cabin nestled in a snowy pine forest with warm interior lights glowing against the blue dusk"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBVyrzkBgCYbSXfCshAtz6fZ6Q3z1CXvjpom1BZGh5q-bX8C5Yn-vip9RWBlM_bUDfLKLn-RYKSmlbuqVlRD9opPE4va5oLSiY6MdR-HOG-UMzog35J52LKryFF3O8QEA5ZMwkPualAg6-vjJzFKPNfpngs1JwtEaQ9dFUuK_oPvKSfo2IytNkWR4Faiqox6wiQHDZ4UPKD5l4-shNJCWCkc4mCBzzuvFHShTxNnTtxIEvt9bo2z-EX6KrgMsTj3y8HuiXasYPMvwDE"
              />
              <button className="absolute top-4 right-4 bg-white/20 backdrop-blur-md p-2 rounded-full hover:bg-white transition-colors">
                <span
                  className="material-symbols-outlined text-white group-hover:text-[#ff5c61]"
                  data-icon="favorite"
                >
                  favorite
                </span>
              </button>
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-linear-to-t from-black/60 to-transparent">
                <span className="bg-white/20 backdrop-blur-md text-white text-[10px] uppercase font-bold px-3 py-1 rounded-full border border-white/30">
                  Rare find
                </span>
              </div>
            </div>
            <div className="mt-4 flex justify-between">
              <div>
                <h3 className="font-bold text-on-surface text-lg">
                  Alpine Mirror House
                </h3>
                <p className="text-on-surface-variant text-sm">
                  Chamonix, France
                </p>
                <p className="mt-2 font-bold text-[#ff5c61]">
                  $450
                  <span className="text-on-surface-variant font-normal">
                    / night
                  </span>
                </p>
              </div>
              <div className="flex items-center gap-1 h-fit">
                <span
                  className="material-symbols-outlined text-sm"
                  data-icon="star"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star
                </span>
                <span className="text-sm font-bold">4.92</span>
              </div>
            </div>
          </div>
          <div className="group cursor-pointer">
            <div className="relative aspect-4/5 rounded-3xl overflow-hidden property-card-shadow transition-all duration-300 transform group-hover:scale-[1.02]">
              <img
                alt="Beach house"
                className="w-full h-full object-cover"
                data-alt="A minimalist white beach house on stilts above turquoise ocean water with clear blue skies and tropical palm trees"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB-xSFIWBYCiMpc--CQJk-ZPPg8QDh2pOKPClP2hMCLTL6j75jn94vF1HOMGTX4s5ChaLGf1vnFlN2BJVpplOZDuIVnz9FGPmlBOXTTDqiasIX-B-0bd362njuuFingtqC6fVhsTM5Ae3MgZz_FUpomedIBtGV4rhJ3OQp1oMJD576KYnOJE-LbjlZsOQ8S7NbEIk3FBAaSy46fPbgVxHgALgVqfT_qyPWU4OrRuIzbSC_DDGFisA0FMkZJ5YbGk3Z17hMbN4R0SKfa"
              />
              <button className="absolute top-4 right-4 bg-white/20 backdrop-blur-md p-2 rounded-full hover:bg-white transition-colors">
                <span
                  className="material-symbols-outlined text-white group-hover:text-[#ff5c61]"
                  data-icon="favorite"
                >
                  favorite
                </span>
              </button>
            </div>
            <div className="mt-4 flex justify-between">
              <div>
                <h3 className="font-bold text-on-surface text-lg">
                  The Blue Lagoon Hut
                </h3>
                <p className="text-on-surface-variant text-sm">
                  Male, Maldives
                </p>
                <p className="mt-2 font-bold text-[#ff5c61]">
                  $820
                  <span className="text-on-surface-variant font-normal">
                    / night
                  </span>
                </p>
              </div>
              <div className="flex items-center gap-1 h-fit">
                <span
                  className="material-symbols-outlined text-sm"
                  data-icon="star"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star
                </span>
                <span className="text-sm font-bold">4.98</span>
              </div>
            </div>
          </div>
          <div className="group cursor-pointer">
            <div className="relative aspect-4/5 rounded-3xl overflow-hidden property-card-shadow transition-all duration-300 transform group-hover:scale-[1.02]">
              <img
                alt="Cozy apartment"
                className="w-full h-full object-cover"
                data-alt="Stylish Parisian loft apartment with floor-to-ceiling windows overlooking city rooftops, featuring eclectic mid-century furniture and soft morning light"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAeLwNZ9RyaUYf1Pr8rsR-p25ViGhzZsMbnhMBHlltTcDQnUYRVknUHy4UL7CbUqaN4P848wbjrXSq4H7QbdakHKazmSglyBY7CnQb8fnklijsiZIBE0bSV_gUx05OxkuO40kYa71fVBz2VzXYbfbTC5LX691Cp1xTNbqHS1zweG0Z3hSMSXcD36ueQeZRnDeH1G_7c8O4U8t0J9S965iKisyJT7PNJ1u_s8We64FbjfSauU4-R6shHE-OshST9G6lSX0jUQ4DEaf-8"
              />
              <button className="absolute top-4 right-4 bg-white/20 backdrop-blur-md p-2 rounded-full hover:bg-white transition-colors">
                <span
                  className="material-symbols-outlined text-white group-hover:text-[#ff5c61]"
                  data-icon="favorite"
                >
                  favorite
                </span>
              </button>
            </div>
            <div className="mt-4 flex justify-between">
              <div>
                <h3 className="font-bold text-on-surface text-lg">
                  Artist Loft Paris
                </h3>
                <p className="text-on-surface-variant text-sm">Paris, France</p>
                <p className="mt-2 font-bold text-[#ff5c61]">
                  $290
                  <span className="text-on-surface-variant font-normal">
                    / night
                  </span>
                </p>
              </div>
              <div className="flex items-center gap-1 h-fit">
                <span
                  className="material-symbols-outlined text-sm"
                  data-icon="star"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star
                </span>
                <span className="text-sm font-bold">4.85</span>
              </div>
            </div>
          </div>
          <div className="group cursor-pointer">
            <div className="relative aspect-4/5 rounded-3xl overflow-hidden property-card-shadow transition-all duration-300 transform group-hover:scale-[1.02]">
              <img
                alt="Modern villa"
                className="w-full h-full object-cover"
                data-alt="A cliffside concrete and glass villa overlooking the Mediterranean sea with a minimalist patio and sleek outdoor furniture"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuANk15lhSRgfhCj2m2a2i0xwbclwz4Gx_wsBaEeiuakUekS_tX8-n7_0EXr8ROk_kM_b6C98_oHxMzRU82QSD7xwaEXgQEKR-KAYEZypOeqTI7yq7eeM_F4DHjwpnDqwuByoxbv_WLfgCdILz0gwWMDTfP5-4OK-_usxIuhq7wCIXLwn6oVeRPWVNGufgYJ6TmQxoB-XyJg8vlfmE1igYgxp1phgu_kCrTuD7DFDL4a27OVHXK4WiDqyc0csN_jushDBJoQ1_YvPPmA"
              />
              <button className="absolute top-4 right-4 bg-white/20 backdrop-blur-md p-2 rounded-full hover:bg-white transition-colors">
                <span
                  className="material-symbols-outlined text-white group-hover:text-[#ff5c61]"
                  data-icon="favorite"
                >
                  favorite
                </span>
              </button>
              <div className="absolute top-4 left-4">
                <span className="bg-[#ff5c61] text-white text-[10px] uppercase font-extrabold px-3 py-1 rounded-full">
                  New Arrival
                </span>
              </div>
            </div>
            <div className="mt-4 flex justify-between">
              <div>
                <h3 className="font-bold text-on-surface text-lg">
                  Cliff Edge Retreat
                </h3>
                <p className="text-on-surface-variant text-sm">
                  Santorini, Greece
                </p>
                <p className="mt-2 font-bold text-[#ff5c61]">
                  $640
                  <span className="text-on-surface-variant font-normal">
                    / night
                  </span>
                </p>
              </div>
              <div className="flex items-center gap-1 h-fit">
                <span
                  className="material-symbols-outlined text-sm"
                  data-icon="star"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star
                </span>
                <span className="text-sm font-bold">5.0</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 px-6 md:px-12 max-w-[1440px] mx-auto bg-surface-variant/50 rounded-[3rem] my-12">
        <h2 className="text-3xl font-extrabold text-on-background tracking-tight mb-10 text-center">
          Popular right now
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-2 gap-4 md:gap-6 h-[600px]">
          <div className="col-span-2 row-span-2 relative rounded-3xl overflow-hidden group cursor-pointer">
            <img
              alt="Venice canals"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              data-alt="Venice canal at dusk with glowing lanterns, historic architecture reflected in the water, and a single gondola passing by"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDpZ8RaS_aSjbguz4bzTj0H3haMjU7EYw9toYePtZTpYDcfCSH6tsAn4iYRNi06veddwvqCG1oephdvHR5hamKY7RxTowjggqK3giXzXQmk2jjBk9pBNg3vA4HgdV2jG70OmspNaTnKXFO1cqKd0007fmkMYmNBUZqkPVSk76Ek44MNBNCNjLl9vx05E-_NrzxlbbyLyKa7u1md-1tqFDO2nGXOssxAYai7W5CWV-ODxM1vOCuGCVFwPoNGx5-Ym-nNle0bkiMUSxiu"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-8">
              <h4 className="text-2xl font-bold text-white">Venice</h4>
              <p className="text-white/80">Italy</p>
            </div>
          </div>
          <div className="col-span-1 row-span-1 relative rounded-3xl overflow-hidden group cursor-pointer">
            <img
              alt="Eiffel Tower"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              data-alt="Eiffel tower framed by classNameic Haussmann buildings and green spring leaves in Paris"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBAKqwX5X6kfVuDQhgB9TiZgIOnP2vp9-hLKjK8J5oBGb9Rlr_3HkPLnkOCwSq7IiB53ANOSpNIKkNAeO6RwoHM-2rG3lCsFOxH0zJfG-cbgLTNs9nh4maaQUtya6MNB2Kc6ahQXcAxeZ_fuicuEC_vEZgfs65ozsJCHAbtwGtSvi_ofXBT8iqekuQhgE9h7ZOi7RKqLF_nP4f5DCsofEqkDK1HeMSUzR9iMZ1pxZR8EVCk3vSLPJgy5zjsYHNK3RmUa0aJs_3gTHaI"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
              <h4 className="text-xl font-bold text-white">Paris</h4>
              <p className="text-white/80 text-sm">France</p>
            </div>
          </div>
          <div className="col-span-1 row-span-1 relative rounded-3xl overflow-hidden group cursor-pointer">
            <img
              alt="Bali tropical"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              data-alt="Lush green tropical jungle landscape in Bali with misty mountains in the distance and vibrant palm fronds"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCn92UVyK54Nraw0ZRkkmJXr__3QlBE1TBK2K6As9nOIuY9LHtxgOGY_pun9BEcXNgUZF5QNZVcHLbGIb-kNO9EaA-YcfNjKMubxEYtiwOD9LChmnacQgLNr75I3iE18qpdl05sGEph0smDj5cHDIq9JOLFr-KEL4FYlGDdVN1iBuNReVtmuevqN47KOphbTlwJhQ1s3oyRQPZaYXGC6AB8ndvsaHp0lOCKzwcf3CKzoJljDpk3JmSef629-xfT_DnYGR3xgB8kiRPr"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
              <h4 className="text-xl font-bold text-white">Bali</h4>
              <p className="text-white/80 text-sm">Indonesia</p>
            </div>
          </div>
          <div className="col-span-2 md:col-span-2 row-span-1 relative rounded-3xl overflow-hidden group cursor-pointer">
            <img
              alt="San Francisco Bridge"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              data-alt="Golden Gate bridge peaking through soft morning fog with deep blue ocean water below and orange towers standing tall"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBqjULRjW6LEwSjzAgK4W8pRDGRD1W3pqeUH4ocNlGV0iwjY7JVvk1ncqSBBwSHI6zmynxQmzB5Aapn16CbvOVQmrkJBcKmx09a3YMvMCLLeWPQvh0NWLKI_VlGFcuGBqRaveZWkwdbII-eK5oE54yMVrZiMnd5VGqvFXlb-iiTr2Rb2L6lrU15aPBUhlnCeAC-fhjyBWm0ssTaoUIF6w5JezQC2QOBrCmWNcnvBdOUlIhVC5mSI4_jUCLpQBCfIRhGT1qgdbmobo6g"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
              <h4 className="text-xl font-bold text-white">San Francisco</h4>
              <p className="text-white/80 text-sm">United States</p>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 px-6 text-center max-w-4xl mx-auto">
        <h2 className="text-4xl font-extrabold text-on-background mb-6 tracking-tight">
          Ready to start your journey?
        </h2>
        <p className="text-lg text-on-surface-variant mb-10 font-medium">
          Join over 10 million travelers discovering the world's most unique
          stays with StayHub.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="w-full sm:w-auto bg-[#ff5c61] text-white px-10 py-4 rounded-full text-lg font-bold shadow-xl shadow-[#ff5c61]/20 hover:opacity-90 active:scale-95 transition-all">
            Start Searching
          </button>
          <button className="w-full sm:w-auto bg-white border-2 border-slate-200 px-10 py-4 rounded-full text-lg font-bold hover:bg-slate-50 transition-colors">
            Learn More
          </button>
        </div>
      </section>
      <Footer />
    </main>
  );
}

export default HomePage;
