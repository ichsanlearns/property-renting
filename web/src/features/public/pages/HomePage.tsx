import Footer from "../../../shared/ui/Footer";
import { usePropertyAllBasic } from "../../tenant/property/hooks/useProperty";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import LoaderFetching from "../../../shared/ui/LoaderFetching";
import PropertyCard from "../components/PropertyCard";
import HeroCarousel from "../components/home-page/HeroCarousel";

import { heroData } from "../components/home-page/hero.data";

function HomePage() {
  const navigate = useNavigate();
  const { data: properties, isLoading } = usePropertyAllBasic();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <main>
      <HeroCarousel heroData={heroData} />
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
        {isLoading && <LoaderFetching />}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {properties && <PropertyCard properties={properties} />}
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
