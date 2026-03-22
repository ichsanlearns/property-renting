import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  createPropertySchema,
  type CreatePropertyPayload,
} from "../schemas/property.schema";

import { getAllCategories } from "../api/category.service";
import { createProperty } from "../api/property.service";
import toast from "react-hot-toast";
import { getAmenities } from "../api/amenity.service";
import Map from "../components/Map";
import { useReverseGeoCode } from "../hooks/useReverseGeocode";
import ImageUpload from "../components/ImageUpload";
import type { ImageType } from "../types/image.type";
import type { Amenity } from "../types/amenity.type";

type Category = {
  id: string;
  name: string;
};

function Properties() {
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [amenities, setAmenities] = useState<Amenity[]>([]);

  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  const { reverseGeoCode, isFetching } = useReverseGeoCode();

  const [images, setImages] = useState<ImageType[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        const resCategories = await getAllCategories();
        const resAmenities = await getAmenities("PROPERTY");

        setCategories(resCategories.data);
        setAmenities(resAmenities.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const { register, handleSubmit, setValue } = useForm<CreatePropertyPayload>({
    resolver: zodResolver(createPropertySchema),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const onSubmit = async (data: CreatePropertyPayload) => {
    const payload = {
      categoryId: data.categoryId,
      title: data.title,
      description: data.description,
      latitude: data.latitude,
      longitude: data.longitude,
      numberOfBathrooms: data.numberOfBathrooms,
    };

    const formData = new FormData();

    Object.entries(payload).forEach(([key, value]) => {
      formData.append(key, String(value));
    });

    images.forEach((image) => {
      formData.append("images", image.file);
    });

    formData.append(
      "imagesMeta",
      JSON.stringify(
        images.map((image) => ({
          isCover: image.isCover,
          order: image.order,
        })),
      ),
    );

    selectedAmenities.forEach((amenity) => {
      formData.append("amenities", amenity);
    });

    try {
      toast.loading("Creating property...");

      await createProperty(formData);

      toast.dismiss();
      toast.success("Property created successfully");
    } catch (error: any) {
      toast.dismiss();
      toast.error(error.response?.data?.message || "Failed to create property");
    }
  };

  const handleAmenityClick = (amenityId: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenityId)
        ? prev.filter((id) => id !== amenityId)
        : [...prev, amenityId],
    );
  };

  const handleMapSelect = async (location: { lat: number; lng: number }) => {
    setValue("latitude", location.lat);
    setValue("longitude", location.lng);

    reverseGeoCode(location, (address) => {
      setValue("fullAddress", address.fullAddress);
      setValue("city", address.city);
      setValue("province", address.province);
      setValue("country", address.country);
    });
  };

  return (
    <main className="flex-1 p-8">
      <header className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-2 text-slate-500 text-sm mb-1">
            <a className="hover:text-primary transition-colors" href="#">
              Properties
            </a>
            <span className="material-symbols-outlined text-xs">
              chevron_right
            </span>
            <span className="text-slate-900 dark:text-slate-100 font-medium">
              Add/Edit Property
            </span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Property Management
          </h2>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 transition-colors">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <button
            type="button"
            className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl font-bold hover:bg-primary/90 transition-all shadow-sm"
          >
            <span className="material-symbols-outlined text-[20px]">save</span>
            Save Changes
          </button>
        </div>
      </header>
      <form onSubmit={handleSubmit(onSubmit, (errors) => console.log(errors))}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-slate-900 dark:text-white">
                <span className="material-symbols-outlined text-primary">
                  info
                </span>
                General Information
              </h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 ">
                    Property Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Sunset Heights Apartment"
                    {...register("title")}
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800 focus:border-primary focus:ring-primary transition-all p-3.5"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    Category
                  </label>

                  <select
                    {...register("categoryId")}
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800 focus:border-primary focus:ring-primary p-3.5"
                  >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    Description
                  </label>
                  <textarea
                    placeholder="Describe the property highlights, amenities, and surroundings..."
                    {...register("description")}
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800 focus:border-primary focus:ring-primary p-3.5 min-h-[120px]"
                    rows={4}
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-slate-900 dark:text-white">
                <span className="material-symbols-outlined text-primary">
                  location_on
                </span>
                Location
              </h3>
              <div className="space-y-2">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                      City
                    </label>
                    <input
                      disabled
                      type="text"
                      placeholder="e.g. Seattle"
                      {...register("city")}
                      className="w-full rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800 focus:border-primary focus:ring-primary p-3.5 bg-slate-50 cursor-not-allowed text-slate-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                      Province
                    </label>
                    <input
                      disabled
                      type="text"
                      placeholder="e.g. Washington"
                      {...register("province")}
                      className="w-full rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800 focus:border-primary focus:ring-primary p-3.5 bg-slate-50 cursor-not-allowed text-slate-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                      Country
                    </label>
                    <input
                      disabled
                      type="text"
                      placeholder="e.g. United States"
                      {...register("country")}
                      className="w-full rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800 focus:border-primary focus:ring-primary p-3.5 bg-slate-50 cursor-not-allowed text-slate-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    Full Address
                  </label>
                  <input
                    disabled
                    type="text"
                    placeholder="e.g. 123 Maple St, ZIP 98101"
                    {...register("fullAddress")}
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800 focus:border-primary focus:ring-primary p-3.5 bg-slate-50 cursor-not-allowed text-slate-500"
                  />
                </div>

                <div className="relative">
                  <Map onSelect={handleMapSelect} />

                  {isFetching && (
                    <div className="absolute inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-1000">
                      <p className="text-white text-sm">
                        Detecting location...
                      </p>
                    </div>
                  )}
                </div>

                {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                      Latitude
                    </label>
                    <input
                      disabled
                      type="number"
                      step="0.0001"
                      placeholder="47.6062"
                      {...register("latitude")}
                      className="w-full rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800 focus:border-primary focus:ring-primary p-3.5 bg-slate-50 cursor-not-allowed text-slate-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                      Longitude
                    </label>
                    <input
                      disabled
                      type="number"
                      step="0.0001"
                      placeholder="-122.3321"
                      {...register("longitude")}
                      className="w-full rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800 focus:border-primary focus:ring-primary p-3.5 bg-slate-50 cursor-not-allowed text-slate-500"
                    />
                  </div>
                </div> */}
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-slate-900 dark:text-white">
                <span className="material-symbols-outlined text-primary">
                  featured_play_list
                </span>
                Amenities
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {amenities.map((amenity) => (
                  <button
                    type="button"
                    key={amenity.id}
                    onClick={() => handleAmenityClick(amenity.id)}
                    className={`group flex flex-col items-center gap-3 p-5 rounded-2xl text-white   transition-all ${selectedAmenities.includes(amenity.id) ? "bg-primary text-white shadow-primary/20 shadow-xl" : "bg-primary-20 hover:bg-white text-slate-500 border-slate-100 hover:border-primary/30 border-3"}`}
                  >
                    <span
                      className={`material-symbols-outlined text-3xl  ${selectedAmenities.includes(amenity.id) ? "text-white" : "text-slate-500 group-hover:text-primary"}`}
                    >
                      {amenity.icon}
                    </span>
                    <span
                      className={` text-[10px] font-bold uppercase tracking-widest ${selectedAmenities.includes(amenity.id) ? "text-white" : "text-slate-500 group-hover:text-primary"}`}
                    >
                      {amenity.name}
                    </span>
                  </button>
                ))}
              </div>
              <div className="mt-6">
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Number of Bathrooms
                </label>
                <input
                  type="number"
                  placeholder="e.g. 2"
                  {...register("numberOfBathrooms", {
                    valueAsNumber: true,
                  })}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800 focus:border-primary focus:ring-primary p-3.5  text-slate-500"
                />
              </div>
            </div>
            <ImageUpload value={images} onChange={setImages} />
          </div>
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">
                Location Preview
              </h3>
              <div className="w-full aspect-square rounded-xl overflow-hidden relative border border-slate-200 dark:border-slate-700">
                <img
                  alt="Mini map view"
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCwo3bT2Dse-rXfKGaZvylKcanlpO7YGCaZ0A67Sxqwk5daFWZBAfE5otahLSqlEPgMAX41x7mhCWJ-2_8UyEb5CdQ_RemRVSzSAW46tSlD4jZ0KYFdS-OQ4DPX17s9bRc-Ln39ITVOYnYHL2JD26wlM9NZUZz4hDGrVoqsuKbAWOoRQWoRwIouXfdxseUIVTRq3vB8AFOe5yOkST84FpOwvWPI1YPm5Npw68xMAlySlfjQKcj_ZO1SbZBz3eAUW2-X__iGA8_71s3W"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-primary size-4 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
                </div>
              </div>
              <p className="mt-3 text-xs text-slate-500 text-center">
                Seattle, WA 98101
              </p>
            </div>
            <div className="sticky top-48 lg:col-span-4 space-y-6">
              <div className=" bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-6">
                  Status &amp; Settings
                </h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">
                      Publish Status
                    </label>
                    <select className="w-full rounded-xl border-slate-200 dark:border-slate-700 dark:bg-slate-800 focus:border-primary focus:ring-primary p-3 text-sm font-medium">
                      <option>Draft</option>
                      <option selected>Publish</option>
                      <option>Archive</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
                      Accept Inquiries
                    </span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        checked
                        className="sr-only peer"
                        type="checkbox"
                        value=""
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                </div>
                <div className="mt-8 space-y-3">
                  <button
                    type="submit"
                    className="w-full bg-primary text-white py-3.5 rounded-xl font-bold hover:opacity-90 transition-all shadow-sm"
                  >
                    Save Property
                  </button>
                  <button
                    type="button"
                    className="w-full bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 py-3.5 rounded-xl font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
              <div className="bg-primary/5 rounded-xl p-6 border border-primary/20">
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary">
                    lightbulb
                  </span>
                  <div>
                    <p className="text-slate-900 dark:text-white font-bold text-sm">
                      Quick Tip
                    </p>
                    <p className="text-slate-600 dark:text-slate-400 text-xs mt-1 leading-relaxed">
                      Listing with at least 5 high-quality photos receive 60%
                      more tenant inquiries on average.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </main>
  );
}

export default Properties;
