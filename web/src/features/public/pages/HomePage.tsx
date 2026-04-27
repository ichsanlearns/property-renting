import Footer from "../../../shared/ui/Footer";
import { usePropertyAllBasic } from "../../tenant/property/hooks/useProperty";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import LoaderFetching from "../../../shared/ui/LoaderFetching";
import PropertyCard from "../components/PropertyCard";
import HeroCarousel from "../components/home-page/HeroCarousel";

import { heroData } from "../components/home-page/hero.data";

function HomePage() {
  const navigate = useNavigate();
  const { data: properties, isLoading } = usePropertyAllBasic();

  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({
      left: -320,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({
      left: 320,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <main>
      <HeroCarousel heroData={heroData} />
      <section className="relative py-16 px-6 md:px-12 max-w-[1440px] mx-auto z-20">
        <button
          onClick={scrollLeft}
          className="absolute -left-4 top-[50%] z-10 bg-white/80 backdrop-blur-md shadow-lg border border-primary/50 w-12 h-12 rounded-full hidden md:flex items-center justify-center hover:bg-white hover:scale-105 hover:shadow-xl transition-all duration-300 cursor-pointer"
        >
          <span className="material-symbols-outlined text-primary ">
            chevron_left
          </span>
        </button>
        <button
          onClick={scrollRight}
          className="absolute -right-4 top-[50%] z-10 bg-white/80 backdrop-blur-md shadow-lg border border-primary/50 w-12 h-12 rounded-full hidden md:flex items-center justify-center hover:bg-white hover:scale-105 hover:shadow-xl transition-all duration-300 cursor-pointer"
        >
          <span className="material-symbols-outlined text-primary ">
            chevron_right
          </span>
        </button>
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-extrabold text-on-background tracking-tight">
              Stay somewhere unique
            </h2>
            <p className="text-on-surface-variant mt-1">
              Hand-picked homes for every traveler.
            </p>
          </div>
          <button
            onClick={() => navigate("/search")}
            className="text-[#ff5c61] font-bold flex items-center hover:underline cursor-pointer"
          >
            View all
            <span
              className="material-symbols-outlined ml-1 text-sm"
              data-icon="arrow_forward"
            >
              arrow_forward
            </span>
          </button>
        </div>

        {isLoading && <LoaderFetching />}
        <div ref={scrollRef} className="flex gap-8 overflow-x-auto">
          {properties?.map((p) => (
            <div key={p.id} className="min-w-[300px] shrink-0">
              <PropertyCard property={p} />
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 px-6 text-center max-w-4xl mx-auto">
        <h2 className="text-4xl font-extrabold text-on-background mb-6 tracking-tight">
          Ready to start your journey?
        </h2>
        <p className="text-lg text-on-surface-variant mb-10 font-medium">
          Join over 10 million travelers discovering the world's most unique
          stays with SewaHunian.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => navigate("/search")}
            className="w-full sm:w-auto bg-[#ff5c61] text-white px-10 py-4 rounded-full text-lg font-bold shadow-xl shadow-[#ff5c61]/20 hover:opacity-90 active:scale-95 transition-all cursor-pointer"
          >
            Start Searching
          </button>
        </div>
      </section>
      <Footer />
    </main>
  );
}

export default HomePage;
