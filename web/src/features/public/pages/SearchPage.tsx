import { usePropertySearch } from "../../tenant/property/hooks/useProperty";
import { useNavigate, useSearchParams } from "react-router-dom";
import type { SearchSchema } from "../schema/search.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { searchSchema } from "../schema/search.schema";
import PropertyCard from "../components/PropertyCard";

function SearchPage() {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { isLoading },
  } = useForm<SearchSchema>({
    resolver: zodResolver(searchSchema),
  });

  const { data: properties } = usePropertySearch({
    search: search || "",
  });

  const handleSearch = (data: SearchSchema) => {
    navigate(`/search?search=${data.param}`);
  };

  return (
    <>
      <div className="fixed top-[73px] w-full z-40 bg-white shadow-sm">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 py-4 mt-2">
          <div className="flex items-center justify-center gap-4">
            <div className="relative w-full max-w-lg">
              <form onSubmit={handleSubmit(handleSearch)}>
                <input
                  {...register("param")}
                  className="w-full h-12 pl-6 pr-14 bg-white border border-outline rounded-full shadow-sm hover:shadow-md focus:ring-2 focus:ring-primary focus:border-primary transition-shadow cursor-text text-sm font-medium text-on-surface"
                  id="search-input"
                  placeholder="Search city, country, or property"
                  type="text"
                />
              </form>
              <button
                type="submit"
                disabled={!watch("param") || isLoading}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary p-2 rounded-full flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span
                  className="material-symbols-outlined text-white text-sm"
                  data-icon="search"
                >
                  search
                </span>
              </button>
            </div>
            <button className="flex items-center space-x-2 border border-outline rounded-xl px-4 py-2.5 text-sm font-medium hover:border-black transition-colors whitespace-nowrap">
              <span
                className="material-symbols-outlined text-sm"
                data-icon="tune"
              >
                tune
              </span>
              <span>Filters</span>
            </button>
          </div>
        </div>
      </div>
      <main className="pt-[170px] flex min-h-screen">
        <div className="w-full lg:w-[60%] px-6 md:px-12 pb-12 overflow-y-auto">
          <div className="mb-6">
            <h1
              className="text-sm font-medium text-on-surface-variant"
              id="results-heading"
            >
              {properties?.length} stays found
            </h1>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-10">
            {properties && (
              <PropertyCard properties={properties} page="search" />
            )}

            {/* <div
              className="group cursor-pointer"
              data-location="Topanga Canyon, Malibu"
            >
              <div className="relative aspect-4/3 rounded-xl overflow-hidden mb-3">
                <img
                  alt="Modern glass house"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  data-alt="minimalist modern glass house nestled in malibu hills with canyon views and soft morning mist"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAO3xsUMIqJfnrF6sbZ7f2iPBEvlk8LbKzsFfMYzYzLwNMd2181hfProJE3jIo57GLPyktAl9Gbyh136_bSFG4MWew3QrGkkahcqeKQg4kQdlke7XSurCPAxyWmU1U4EijCVVdT9t1yJKmofuqF5yZIsouaidDdIpOGtivYmwELKo8XZ6vb4OPrVm0-rOMl5qwfGKKDFbF8hQy4fQ21fjdqVkF4u37b0M2ZxDQi1uMaFXh15Ywt6vigTFAPSlnMG0tOtp7u4Q_hUgvr"
                />
                <div className="absolute top-3 left-3 bg-primary text-white px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                  New Arrival
                </div>
                <button className="absolute top-3 right-3 text-white drop-shadow-md hover:scale-110 transition-transform">
                  <span
                    className="material-symbols-outlined"
                    data-icon="favorite"
                  >
                    favorite
                  </span>
                </button>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-on-surface">
                    The Glass Pavilion
                  </h3>
                  <p className="text-on-surface-variant text-sm">
                    Topanga Canyon, Malibu
                  </p>
                  <p className="mt-1 font-semibold text-sm">
                    <span className="font-bold">$1,200</span> / night
                  </p>
                </div>
                <div className="flex items-center space-x-1">
                  <span
                    className="material-symbols-outlined text-sm"
                    data-icon="star"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  <span className="text-sm font-medium">5.0</span>
                </div>
              </div>
            </div>
            <div
              className="group cursor-pointer"
              data-location="Point Dume, Malibu"
            >
              <div className="relative aspect-4/3 rounded-xl overflow-hidden mb-3">
                <img
                  alt="Cozy cottage"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  data-alt="charming coastal cottage with white picket fence and blooming jasmine vines under bright summer sun"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC6UnMA5rKKE355GH1NrEYqoVSyjwCA7Dv-QJsqoPSS_wsJU0WP3WosCx7rpguVnZwXtNNo_7RLNQVKCNobH9CZD9Y9sGG4JZjJK4x7V6taegdnADgae_iVYBPE_sFxxsw4c_xPqVFKrmp4jJ6q1yk3Htu4zqFFt-Pn05PIkH8xUOkFq7gG6i2CBqM9QEGbBaEEWsjhWmJqqpFAF3jx4zbqZ2W8fo_sdqfPPswh2qZ5Zv2D0u71Pb8YJNCodXnGSeJ_Xfsi7wmcrxZJ"
                />
                <button className="absolute top-3 right-3 text-white drop-shadow-md hover:scale-110 transition-transform">
                  <span
                    className="material-symbols-outlined"
                    data-icon="favorite"
                  >
                    favorite
                  </span>
                </button>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-on-surface">
                    Coastal Cottage Retreat
                  </h3>
                  <p className="text-on-surface-variant text-sm">
                    Point Dume, Malibu
                  </p>
                  <p className="mt-1 font-semibold text-sm">
                    <span className="font-bold">$450</span> / night
                  </p>
                </div>
                <div className="flex items-center space-x-1">
                  <span
                    className="material-symbols-outlined text-sm"
                    data-icon="star"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  <span className="text-sm font-medium">4.85</span>
                </div>
              </div>
            </div>
            <div className="animate-pulse">
              <div className="aspect-4/3 bg-surface-container-highest rounded-xl mb-3"></div>
              <div className="flex justify-between items-start">
                <div className="space-y-2 w-full">
                  <div className="h-4 bg-surface-container-highest rounded w-3/4"></div>
                  <div className="h-3 bg-surface-container-highest rounded w-1/2"></div>
                  <div className="h-4 bg-surface-container-highest rounded w-1/4 mt-2"></div>
                </div>
                <div className="h-4 bg-surface-container-highest rounded w-8"></div>
              </div>
            </div>
            <div
              className="group cursor-pointer"
              data-location="Carbon Beach, Malibu"
            >
              <div className="relative aspect-4/3 rounded-xl overflow-hidden mb-3">
                <img
                  alt="Luxury beach house"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  data-alt="contemporary wood and concrete beach house built directly on the sand with glass railings and soft blue sky"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCXcSAJOHQWqDu64eyQRNo0FjLij_W_VALPhZkJH2LOezMTr-TOB7IkcrxsXKHyQoqjIOW5fwVBU0xnR2KhBjaJtGhtkMPupyqIEmrpEtkoFt7dH1k34x07mk-GvTzGcqN1C9lnFn2JuxtNpIE62tJ9gbz7fuDjsmzG8QHbusCZ6_ppnWrRkcf0xemlICLe8LqkZsfh9Znybyx6d7IpJ9cYx_PbnN6_xrccYOPq2MQEMnvif_ShaQe2tAb3k_Q4nqt0em9rg-Wz4yIe"
                />
                <button className="absolute top-3 right-3 text-white drop-shadow-md hover:scale-110 transition-transform">
                  <span
                    className="material-symbols-outlined"
                    data-icon="favorite"
                  >
                    favorite
                  </span>
                </button>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-on-surface">
                    Driftwood Modern House
                  </h3>
                  <p className="text-on-surface-variant text-sm">
                    Carbon Beach, Malibu
                  </p>
                  <p className="mt-1 font-semibold text-sm">
                    <span className="font-bold">$1,550</span> / night
                  </p>
                </div>
                <div className="flex items-center space-x-1">
                  <span
                    className="material-symbols-outlined text-sm"
                    data-icon="star"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  <span className="text-sm font-medium">4.92</span>
                </div>
              </div>
            </div>
            <div
              className="group cursor-pointer"
              data-location="Zuma Beach Area"
            >
              <div className="relative aspect-4/3 rounded-xl overflow-hidden mb-3">
                <img
                  alt="Architectural home"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  data-alt="stunning architectural home with cantilevered decks and lush tropical landscaping in bright daylight"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB79ltXg_k5mvdPY8oeplp_Ns9ImuoNB7g9vpJ2-tSvwJX6MjfD6OSiYCuRsUWLYlWDuwSA4tUKLdaibDOo_LAyHtaGqpHxZ6UPx27_4SeU3Zc30J7hV_ptG8CPBr1hEKsCk5lsZXtwKH6TBwVFFholFNe2zLWr5h34tw9DEHylLMItdxW9yB1Gch_G7_NfaEMOyjX67EC4jm3Ey6IRn3mGoUOu68jjLEZa7e0WpaAMerFsrks0zlOYAvwWCCWqOdwSg-iWKWdeQo8z"
                />
                <button className="absolute top-3 right-3 text-white drop-shadow-md hover:scale-110 transition-transform">
                  <span
                    className="material-symbols-outlined"
                    data-icon="favorite"
                  >
                    favorite
                  </span>
                </button>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-on-surface">
                    The Malibu Skybox
                  </h3>
                  <p className="text-on-surface-variant text-sm">
                    Zuma Beach Area
                  </p>
                  <p className="mt-1 font-semibold text-sm">
                    <span className="font-bold">$780</span> / night
                  </p>
                </div>
                <div className="flex items-center space-x-1">
                  <span
                    className="material-symbols-outlined text-sm"
                    data-icon="star"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  <span className="text-sm font-medium">4.79</span>
                </div>
              </div>
            </div> */}
          </div>
        </div>
        <div className="hidden lg:block lg:w-[40%] sticky top-[220px] h-[calc(100vh-220px)] bg-surface-container overflow-hidden">
          <div className="relative w-full h-full">
            <img
              alt="Map of Malibu"
              className="w-full h-full object-cover opacity-60 grayscale-[0.2]"
              data-alt="stylized architectural map texture of malibu coastline with topographic lines and clean minimalist layout"
              data-location="Malibu, California"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA5hsb2mrXo9BYY-XV5pN18zuKc9bTp1hzvdcrIdQ_uh6Om_A26pLFmW5w2hELVDfJxiGXvqIrKVA0RgtBzFkH6YYPMCjhjllqUnE_-EEBdM4RkrEhcYFxT9kS_Rm2RU2YxOmnwK3kKJnwBqNLp-UPmjcwh5GSlTPij1itIS2p_ZOb1gHbh47VrPuipCXWqGc0CkPAO1mOWo0bGVC0buBAdSjIYEJD2pmrTNQdDns5OOvnA9giGQ6DS-QRmRWpHgIws_mq7bMRLk_p4"
            />
            <div className="absolute top-[30%] left-[40%] bg-white px-3 py-1.5 rounded-full shadow-lg font-bold text-sm border border-outline hover:scale-110 transition-transform cursor-pointer z-10">
              $850
            </div>
            <div className="absolute top-[45%] left-[65%] bg-primary text-white px-3 py-1.5 rounded-full shadow-lg font-bold text-sm hover:scale-110 transition-transform cursor-pointer z-20">
              $1,200
            </div>
            <div className="absolute top-[60%] left-[20%] bg-white px-3 py-1.5 rounded-full shadow-lg font-bold text-sm border border-outline hover:scale-110 transition-transform cursor-pointer z-10">
              $450
            </div>
            <div className="absolute top-[20%] left-[75%] bg-white px-3 py-1.5 rounded-full shadow-lg font-bold text-sm border border-outline hover:scale-110 transition-transform cursor-pointer z-10">
              $1,550
            </div>
            <div className="absolute top-[55%] left-[45%] bg-white px-3 py-1.5 rounded-full shadow-lg font-bold text-sm border border-outline hover:scale-110 transition-transform cursor-pointer z-10">
              $780
            </div>
            <div className="absolute bottom-6 right-6 flex flex-col space-y-2">
              <button className="w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors">
                <span className="material-symbols-outlined" data-icon="add">
                  add
                </span>
              </button>
              <button className="w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors">
                <span className="material-symbols-outlined" data-icon="remove">
                  remove
                </span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default SearchPage;
