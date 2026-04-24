import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { searchSchema, type SearchSchema } from "../../schema/search.schema";
import { useNavigate } from "react-router-dom";

function SearchBar() {
  const navigate = useNavigate();

  const { register, handleSubmit, watch } = useForm<SearchSchema>({
    resolver: zodResolver(searchSchema),
  });

  const handleSearch = (data: SearchSchema) => {
    navigate(`/search?search=${data.param}`);
  };

  return (
    <form
      onSubmit={handleSubmit(handleSearch, (errors) => console.error(errors))}
      className="glass-search max-w-3xl mx-auto rounded-full shadow-2xl flex flex-col md:flex-row items-center gap-2 group transition-all duration-500 hover:h-20  h-16 p-2"
    >
      <div className="flex-1 w-full flex items-center px-6 py-3 border-r border-slate-200/50">
        <span
          className="material-symbols-outlined text-slate-400 mr-3"
          data-icon="search"
        >
          search
        </span>
        <input
          {...register("param")}
          className="w-full bg-transparent border-none outline-none focus:ring-0 text-slate-800 placeholder-slate-400 font-medium text-base"
          placeholder="Search city, country, or property"
          type="text"
        />
      </div>

      <button
        disabled={!watch("param")}
        type="submit"
        className="w-full md:w-auto bg-[#ff5c61] text-white p-3 rounded-full flex items-center justify-center hover:bg-[#e64a50] transition-colors shadow-lg shadow-[#ff5c61]/30 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span className="material-symbols-outlined" data-icon="search">
          search
        </span>
        <span className="md:hidden ml-2 font-bold">Search</span>
      </button>
    </form>
  );
}

export default SearchBar;
