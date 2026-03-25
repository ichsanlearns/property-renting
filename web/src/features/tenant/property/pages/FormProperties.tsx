import { useState } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  createPropertySchema,
  type CreatePropertyPayload,
} from "../schemas/property.schema";

import { createProperty } from "../api/property.service";
import toast from "react-hot-toast";

import Map from "../components/Map";
import { useReverseGeoCode } from "../hooks/useReverseGeocode";
import ImageUpload from "../components/ImageUpload";
import type { ImageType } from "../types/image.type";
import AmenityList from "../components/AmenityList";
import { useCategories } from "../hooks/useCategories";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../../../shared/lib/queryKeys.lib";
import { useNavigate } from "react-router-dom";

type Category = {
  id: string;
  name: string;
};

function Properties() {
  const { data: categories = [], isLoading, error } = useCategories();

  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  const { reverseGeoCode, isFetching } = useReverseGeoCode();

  const [images, setImages] = useState<ImageType[]>([]);

  const { register, handleSubmit, setValue, watch } =
    useForm<CreatePropertyPayload>({
      resolver: zodResolver(createPropertySchema),
    });

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: createProperty,
    onMutate: () => {
      toast.loading("Creating property...");
    },
    onSuccess: (property) => {
      toast.dismiss();
      toast.success("Property created successfully");

      queryClient.setQueryData(queryKeys.property.basic(property.data.id), {
        data: property.data,
      });
      navigate(`/tenant/properties/${property.data.id}/rooms/create`);
    },
    onError: (error: any) => {
      toast.dismiss();
      toast.error(error.response?.data?.message || "Failed to create property");
    },
  });

  const onSubmit = async (data: CreatePropertyPayload) => {
    const payload = {
      categoryId: data.categoryId,
      name: data.name,
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

    mutation.mutate(formData);
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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

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
      <form
        onSubmit={handleSubmit(onSubmit, (errors) => console.error(errors))}
      >
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
                    {...register("name")}
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
                    {categories.map((category: Category) => (
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
                <AmenityList
                  selectedAmenities={selectedAmenities}
                  onChange={setSelectedAmenities}
                  type="PROPERTY"
                />
              </div>
              <div className="mt-6">
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Number of Bathrooms
                </label>
                <div className="flex gap-4">
                  <input
                    {...register("numberOfBathrooms", {
                      valueAsNumber: true,
                    })}
                    className="w-full accent-primary h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer mt-4"
                    type="range"
                    defaultValue={1}
                    min={1}
                    max={100}
                    step={1}
                  />
                  <input
                    value={watch("numberOfBathrooms")}
                    onChange={(e) =>
                      setValue("numberOfBathrooms", Number(e.target.value))
                    }
                    className="w-12 h-12 bg-primary text-white flex text-center justify-center font-bold rounded-xl shrink-0 shadow-lg shadow-primary/20"
                  />
                </div>
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
                      <option defaultValue={"PUBLISHED"}>Publish</option>
                      <option>Draft</option>
                      <option>Archive</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
                      Accept Inquiries
                    </span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
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
