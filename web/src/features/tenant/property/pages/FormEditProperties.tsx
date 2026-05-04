import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  createPropertySchema,
  type CreatePropertyPayload,
} from "../schemas/property.schema";

import Map from "../components/Map";
import { useReverseGeoCode } from "../hooks/useReverseGeocode";
import ImageUpload from "../components/ImageUpload";
import type { ImagesType } from "../types/image.type";
import AmenityList from "../components/AmenityList";
import { useCategories } from "../hooks/useCategories";
import { useNavigate, useParams } from "react-router-dom";
import LoaderFetching from "../../../../shared/ui/LoaderFetching";
import { usePropertyDetailFullInfo } from "../hooks/useProperty";
import { useUpdateProperty } from "../hooks/property.mutation";

type Category = {
  id: string;
  name: string;
};

function FormEditProperties() {
  const { propertyId } = useParams();
  const { data: categories = [], isLoading, error } = useCategories();

  const { data: property, isLoading: isLoadingProperty } =
    usePropertyDetailFullInfo({
      propertyId: propertyId || "",
    });

  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  const { reverseGeoCode, isFetching } = useReverseGeoCode();

  const [images, setImages] = useState<ImagesType[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreatePropertyPayload>({
    resolver: zodResolver(createPropertySchema),
    defaultValues: {
      numberOfBathrooms: 1,
    },
  });

  const navigate = useNavigate();

  const updateMutation = useUpdateProperty(propertyId!);

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
      if (image.file !== undefined) {
        formData.append("images", image.file);
      }
    });

    formData.append(
      "imagesMeta",
      JSON.stringify(
        images
          .filter((image) => image.file !== undefined)
          .map((image) => ({
            isCover: image.isCover,
            order: image.order,
          })),
      ),
    );

    selectedAmenities.forEach((amenity) => {
      formData.append("amenities", amenity);
    });

    updateMutation.mutate(formData);
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

  useEffect(() => {
    if (property) {
      setValue("categoryId", property.categoryId);
      setValue("name", property.name);
      setValue("description", property.description);
      setValue("fullAddress", property.fullAddress);
      setValue("city", property.city);
      setValue("province", property.province);
      setValue("country", property.country);
      setValue("latitude", property.latitude);
      setValue("longitude", property.longitude);

      setValue("numberOfBathrooms", property.numberOfBathrooms);
      setSelectedAmenities(
        property.propertyAmenities.map((amenity) => amenity.amenityId),
      );
      setImages(
        property.propertyImages.map((image) => ({
          id: image.id,
          file: undefined,
          preview: image.imageUrl,
          isCover: image.isCover,
          order: image.order,
        })),
      );
    }
  }, [property]);

  if (isLoading || isLoadingProperty) {
    return <LoaderFetching />;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <main className="flex-1 p-8">
      <header className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-2 text-slate-500 text-sm mb-1">
            <button
              type="button"
              onClick={() => navigate("/tenant/properties")}
              className="hover:text-primary transition-colors"
            >
              Properties
            </button>
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
      </header>
      <form onSubmit={handleSubmit(onSubmit)}>
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
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.name.message}
                    </p>
                  )}
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
                  {errors.categoryId && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.categoryId.message}
                    </p>
                  )}
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
                  {errors.description && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.description.message}
                    </p>
                  )}
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
                  {property?.latitude && property?.longitude && (
                    <Map
                      onSelect={handleMapSelect}
                      initialLocation={{
                        lat: property?.latitude!,
                        lng: property?.longitude!,
                      }}
                    />
                  )}
                  {errors.latitude && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.latitude.message}
                    </p>
                  )}

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
            <div className="sticky top-24 lg:col-span-4 space-y-6">
              <div className=" bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-6">
                  Status &amp; Settings
                </h3>
                <div className="mt-8 space-y-3">
                  <button
                    type="submit"
                    className="w-full bg-primary text-white py-3.5 rounded-xl font-bold hover:opacity-90 transition-all shadow-sm cursor-pointer"
                  >
                    Save Property
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate("/tenant/properties")}
                    className="w-full bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 py-3.5 rounded-xl font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors cursor-pointer"
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
                      New created property is in draft mode. It will not be
                      visible to public until you create published room(s).
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

export default FormEditProperties;
