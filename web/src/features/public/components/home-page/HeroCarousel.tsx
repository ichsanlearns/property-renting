import { useState, useEffect, useRef } from "react";
import SearchBar from "./SearchBar";

interface HeroCarouselProps {
  heroData: {
    image: string;
    title: string;
    title2: string;
    subtitle: string;
  }[];
}

function HeroCarousel(
  { heroData }: HeroCarouselProps,
  interval: number = 5000,
) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const nextSlide = () =>
    setCurrentIndex((prev) => (prev + 1) % heroData.length);

  const prevSlide = () =>
    setCurrentIndex((prev) => (prev - 1 + heroData.length) % heroData.length);

  const changeSlide = (index: number) => setCurrentIndex(index);

  const startAutoSlide = () => {
    stopAutoSlide();
    intervalRef.current = setInterval(nextSlide, interval);
  };

  const stopAutoSlide = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const resetAutoSlide = () => {
    stopAutoSlide();
    startAutoSlide();
  };

  useEffect(() => {
    startAutoSlide();
    return stopAutoSlide;
  }, []);

  const handleNext = () => {
    nextSlide();
    resetAutoSlide();
  };

  const handlePrev = () => {
    prevSlide();
    resetAutoSlide();
  };

  const handleDotClick = (index: number) => {
    changeSlide(index);
    resetAutoSlide();
  };

  return (
    <section className="relative z-30 h-[80vh] w-full flex flex-col items-center justify-center">
      <div
        onMouseEnter={stopAutoSlide}
        onMouseLeave={startAutoSlide}
        className="absolute inset-0 z-0"
      >
        {heroData.map((item, index) => (
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
        onClick={handlePrev}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 hover:bg-white/30 backdrop-blur text-white cursor-pointer hover:scale-110 transition-all duration-300 ease-in-out"
      >
        ‹
      </button>

      <button
        onClick={handleNext}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 hover:bg-white/30 backdrop-blur text-white cursor-pointer hover:scale-110 transition-all duration-300 ease-in-out"
      >
        ›
      </button>

      <div className="absolute bottom-16 z-20 flex gap-3">
        {heroData.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`w-3 h-3 rounded-full transition-all cursor-pointer hover:scale-130 transition-duration-300 ${
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
