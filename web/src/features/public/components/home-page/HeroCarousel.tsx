import { useState, useEffect } from "react";
import SearchBar from "./SearchBar";

const data = [
  {
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBDvScxN3ZKwrpko-r8nWgN7Ppm8keEhJe4xBo3Egr5zWPihCjyyyBBLeRXl4faC8QKSpnu7hMjzy1eLIdY1NikIIIGQAWy8xq_QY3AJz6VHt9o7SHwlmShammFTZi9khzTLIK73VWR5myMPWSaQCTpplI0MA9tldv9rPLKkfuy12g-G7jiFyUph9PAMNil3Uue33Rkddk6y2BYN-83R5CqApkMIbH3EU19ZEXc7gnKVX0Z13sqpkMEZi3cX2tFnvozFKPyhEJOm-tw",
    title: "Escape to the",
    title2: "Peaks",
    subtitle:
      "Discover unique homes and unforgettable experiences in over 190 countries.",
  },
  {
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAwA-18xNeHhrnf3rMWjHf3KZwuSNcjLT6FeOg3bv2YWBGfx-XCKNeWJs8OnPFZn6hNDjrFNpv-i8Rx60K_yjSi5kthdYCZSSdnq5ZjCFi-_pCEf70HHv0rJaensp7PncpVLdQz-yxHiN_UHqq55x6R-GQExvjJ3tMqjSndmYILwRhcpR0MnignnIAqCyvpES3UI6RVYYIk3MOg8LvHCmGbZPthMV5pF0EhaoWquQGb4ToY1DDcFNaafTatM2p6qsT3cY77xfg2cFWY",
    title: "Your Private",
    title2: "Paradise",
    subtitle:
      "Find your perfect coastal escape and let the sound of waves recharge you.",
  },
  {
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBJJ8t7I1fMx-mQueciYd3G_x1x5ko4uAAsR9TPpovzrqelwSYMEswzeZYZtfXiaY0yR53uZsb1v0Gs2Wbpm_z9tBMdToH1qlKqGON2l5uIl4-z6eEVrtZK7tR1Ho-laUSLUYMEfycXLyl2KwItr10VPPz6yrU1DtQMEoCjG1mls5gxBAzweGgrSkVkG2Qvlv7I9LsJ-81Gy8DaRe6AasINGYmme2Tqjybn6nw1EuaDB7D7ns195Mf09ZfNPm5sW3kEKfXTWrmm5OGQ",
    title: "Urban",
    title2: "Masterpieces",
    subtitle:
      "Live like a local in breathtaking lofts situated in the heart of global cities.",
  },
];

function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % data.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % data.length);

  const prevSlide = () =>
    setCurrentIndex((prev) => (prev - 1 + data.length) % data.length);

  const changeSlide = (index: number) => setCurrentIndex(index);

  return (
    <section className="relative h-[870px] min-h-[600px] w-full flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        {data.map((item, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentIndex
                ? "opacity-100 z-10 scale-100"
                : "opacity-0 z-0 scale-105"
            }`}
          >
            <img
              alt={item.title}
              className="w-full h-full object-cover"
              src={item.image}
            />

            <div className="absolute inset-0 hero-gradient"></div>

            <div className="absolute inset-0 flex items-center justify-center pb-24 px-6">
              <div
                className={`text-center w-full max-w-5xl transition-all duration-700 ${
                  index === currentIndex
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
              >
                <h1 className="text-4xl md:text-7xl font-extrabold text-white mb-6 tracking-tight leading-[1.1]">
                  {item.title}{" "}
                  <span className="text-[#ff5c61]">{item.title2}</span>.
                </h1>
                <p className="text-lg md:text-xl text-white/90 mb-12 max-w-2xl mx-auto font-medium">
                  {item.subtitle}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="relative z-20 w-full max-w-5xl px-6 mt-48">
        <SearchBar />
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 hover:bg-white/30 backdrop-blur text-white"
      >
        ‹
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 hover:bg-white/30 backdrop-blur text-white"
      >
        ›
      </button>

      <div className="absolute bottom-16 z-20 flex gap-3">
        {data.map((_, index) => (
          <button
            key={index}
            onClick={() => changeSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentIndex
                ? "bg-white scale-110"
                : "bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

export default HeroCarousel;
