import { useState } from "react";

import ImageUpload from "../components/ImageUpload";
import AmenityList from "../components/AmenityList";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  createRoomSchema,
  type CreateRoomPayload,
} from "../schemas/room.schema";
import type { ImageType } from "../types/image.type";
import toast from "react-hot-toast";
import { createRoom } from "../api/room.service";
import { useParams } from "react-router";

const viewTypes = [
  { value: "ocean_front", label: "Ocean Front" },
  { value: "garden_view", label: "Garden View" },
  { value: "city_skyline", label: "City Skyline" },
  { value: "pool_side", label: "Pool Side" },
  { value: "none", label: "None" },
];

const bedTypes = [
  { value: "king_size", label: "King Size Bed" },
  { value: "queen_size", label: "Queen Size Bed" },
  { value: "double_twin", label: "Double Twin Beds" },
  { value: "single", label: "Single Bed" },
];

const bathroomTypes = [
  { value: "private", label: "Private" },
  { value: "shared", label: "Shared" },
];

const publishStatuses = [
  { value: "published", label: "Publish" },
  { value: "draft", label: "Draft" },
  { value: "archived", label: "Archive" },
];

function FormRoom() {
  const { propertyId } = useParams();

  const [images, setImages] = useState<ImageType[]>([]);

  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  const [selectedBathroomType, setSelectedBathroomType] = useState<string>("");

  const { register, watch, handleSubmit, setValue } =
    useForm<CreateRoomPayload>({
      resolver: zodResolver(createRoomSchema),
    });

  const onSubmit = async (data: CreateRoomPayload) => {
    const payload = {
      name: data.name,
      description: data.description,
      basePrice: data.basePrice,
      quantity: data.quantity,
      bedType: data.bedType,
      bedCount: data.bedCount,
      viewType: data.viewType,
      bathroomType: data.bathroomType,
      capacity: data.capacity,
      isPublished: data.isPublished,
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
      toast.loading("Creating room...");

      await createRoom({ propertyId: propertyId!, data: formData });

      toast.dismiss();
      toast.success("Room created successfully");
    } catch (error: any) {
      toast.dismiss();
      toast.error(error.response?.data?.message || "Failed to create room");
    }
  };

  return (
    <main className=" m-16 min-h-[calc(100vh-4rem)]">
      <form
        onSubmit={handleSubmit(onSubmit, (error) => console.log(error))}
        className="mx-auto space-y-8"
      >
        <header className="relative overflow-hidden rounded-3xl bg-white shadow-sm border border-primary/10 flex flex-col md:flex-row items-center gap-6 p-6">
          <div className="relative w-full md:w-48 h-32 shrink-0 rounded-2xl overflow-hidden shadow-md">
            <img
              className="w-full h-full object-cover"
              data-alt="Luxury Ocean Breeze Villa Exterior"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDIoAcDN_T8iuaysK8BrMx-3SmdFEe-pnPMTg_j2qegMqEkqiPNaG5sVtqnuJkB6v2Ms9Rf53YnPXJcLReNJ1_QCMnyr3VVdPzz_Oke8dwuhAB0ht4xZo7b3IiRDIzm3OyyLyxZw9ADPbawu_y2rui-WaVyz8VB2VswELWMZVlIHkORDhMXJ8OjxpN4tU-dAgEMfysCj6tRgF_W1vlDCshjwYn9DSlOUG3HMS_pRCCMofZQKA96GW6ABvxWYsgo8LXpvXgkZRrw0Rzc"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent"></div>
          </div>
          <div className="text-center md:text-left grow">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
              Adding room to
            </span>
            <h1 className="text-3xl font-extrabold text-on-surface tracking-tight mt-1">
              Ocean Breeze Villa
              <span className="text-slate-400 font-medium">in Malibu</span>
            </h1>
            <div className="flex items-center justify-center md:justify-start gap-4 mt-2 text-slate-500 text-sm">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[18px]">
                  location_on
                </span>
                Point Dume, CA
              </span>
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[18px]">
                  star
                </span>
                4.98 (124 reviews)
              </span>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              className="px-6 py-3 rounded-xl bg-slate-50  hover:bg-slate-200 text-on-surface font-bold text-sm transition-all active:scale-95"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-8 py-3 rounded-xl bg-primary text-white font-bold text-sm shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all active:scale-95"
            >
              Save Room
            </button>
          </div>
        </header>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <section className="bg-white p-8 rounded-4xl shadow-sm border border-primary/5 space-y-6">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary bg-primary/10 p-2 rounded-lg">
                  edit_note
                </span>
                <h2 className="text-xl font-bold tracking-tight">
                  Basic Information
                </h2>
              </div>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    Room Name
                  </label>
                  <input
                    {...register("name")}
                    className="w-full p-4 bg-slate-50 hover:bg-white focus:bg-white border-slate-200 border rounded-xl text-sm font-semibold focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-slate-400"
                    placeholder="e.g. Master Oceanfront Suite"
                    type="text"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    Description
                  </label>
                  <textarea
                    {...register("description")}
                    className="w-full p-4 rounded-xl text-sm font-semibold focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-slate-400 resize-none bg-slate-50 hover:bg-white focus:bg-white border-slate-200 border"
                    placeholder="Describe the room's unique features, view, and layout to help guests choose their perfect stay..."
                    rows={4}
                  ></textarea>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    Base Price per Night
                  </label>
                  <div className="relative flex items-center">
                    <span className="absolute left-4 text-slate-400 font-bold text-sm">
                      IDR
                    </span>
                    <input
                      {...register("basePrice", {
                        valueAsNumber: true,
                      })}
                      className="w-full p-4 pl-16 bg-slate-50 hover:bg-white focus:bg-white border-slate-200 border rounded-xl text-sm font-semibold focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-slate-400"
                      placeholder="0.00"
                      step="0.01"
                      type="number"
                    />
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">
                    This is the default price. Seasonal or date-based pricing
                    can be configured later.
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    Room Total
                  </label>
                  <input
                    {...register("quantity", {
                      valueAsNumber: true,
                    })}
                    type="number"
                    placeholder="e.g. 2"
                    className="w-full p-4 bg-slate-50 hover:bg-white focus:bg-white border-slate-200 border rounded-xl text-sm font-semibold focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>
              </div>
            </section>

            <section className="bg-white p-8 rounded-4xl shadow-sm border border-primary/5 space-y-6">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary bg-primary/10 hover:bg-white focus:bg-white p-2 rounded-lg">
                  tune
                </span>
                <h2 className="text-xl font-bold tracking-tight">
                  Room Attributes
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    Bed Type
                  </label>
                  <select
                    {...register("bedType")}
                    className="w-full p-4 bg-slate-50 hover:bg-white focus:bg-white border-slate-200 border rounded-xl text-sm font-semibold focus:ring-2 focus:ring-primary/20 transition-all"
                  >
                    {bedTypes.map((bedType) => (
                      <option key={bedType.value} value={bedType.value}>
                        {bedType.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    Guest Capacity
                  </label>
                  <input
                    {...register("capacity", {
                      valueAsNumber: true,
                    })}
                    type="number"
                    placeholder="e.g. 2"
                    className="w-full p-4 bg-slate-50 hover:bg-white focus:bg-white border-slate-200 border rounded-xl text-sm font-semibold focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    View Type
                  </label>
                  <select
                    {...register("viewType")}
                    className="w-full p-4 rounded-xl text-sm font-semibold focus:ring-2 focus:ring-primary/20 transition-all bg-slate-50 hover:bg-white focus:bg-white border-slate-200 border"
                  >
                    {viewTypes.map((viewType) => (
                      <option key={viewType.value} value={viewType.value}>
                        {viewType.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    Bathroom Type
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {bathroomTypes.map((bathroomType) => (
                      <button
                        type="button"
                        key={bathroomType.value}
                        onClick={() => {
                          setSelectedBathroomType(bathroomType.value);
                          setValue("bathroomType", bathroomType.value);
                        }}
                        className={`p-4 rounded-xl border-2 border-primary bg-primary/5 text-primary text-xs font-bold uppercase tracking-wider ${bathroomType.value === selectedBathroomType ? "border-primary bg-primary/5 text-primary" : "border-slate-100 bg-slate-50 hover:bg-white focus:bg-white text-slate-400 hover:border-primary/20"}`}
                      >
                        {bathroomType.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    Bed Count
                  </label>
                  <div className="flex gap-4">
                    <input
                      {...register("bedCount", {
                        valueAsNumber: true,
                      })}
                      className="w-full accent-primary h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer mt-4"
                      type="range"
                      defaultValue={1}
                      min={1}
                      max={10}
                      step={1}
                    />
                    <span className="w-12 h-12 bg-primary text-white flex items-center justify-center font-bold rounded-xl shrink-0 shadow-lg shadow-primary/20">
                      {watch("bedCount")}
                    </span>
                  </div>
                </div>
              </div>
            </section>
            <section className="bg-white p-8 rounded-4xl shadow-sm border border-primary/5 space-y-6">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary bg-primary/10 hover:bg-white focus:bg-white p-2 rounded-lg">
                  grid_view
                </span>
                <h2 className="text-xl font-bold tracking-tight">
                  Room Amenities
                </h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <AmenityList
                  selectedAmenities={selectedAmenities}
                  onChange={setSelectedAmenities}
                  type="ROOM"
                />
              </div>
            </section>
            <ImageUpload value={images} onChange={setImages} max={3} />
          </div>

          <div className="space-y-8">
            <section className="sticky top-24 lg:col-span-4 space-y-6">
              <div className=" bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-6">
                  Status &amp; Settings
                </h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">
                      Publish Status
                    </label>
                    <select
                      {...register("isPublished")}
                      className="w-full rounded-xl border-slate-200 dark:border-slate-700 dark:bg-slate-800 focus:border-primary focus:ring-primary p-3 text-sm font-medium"
                    >
                      {publishStatuses.map((status) => (
                        <option
                          selected={status.value === "published"}
                          key={status.value}
                          value={status.value}
                        >
                          {status.label}
                        </option>
                      ))}
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
                      Listing with at least 3 high-quality photos receive 60%
                      more tenant inquiries on average.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
        <div className="md:hidden fixed bottom-0 left-0 w-full bg-white p-4 border-t border-primary/10 flex gap-3 z-50">
          <button
            type="button"
            className="flex-1 py-4 rounded-xl bg-slate-50 hover:bg-white focus:bg-white font-bold text-sm"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-2 py-4 rounded-xl bg-primary text-white font-bold text-sm shadow-lg shadow-primary/20"
          >
            Save Room
          </button>
        </div>
      </form>
    </main>
  );
}

export default FormRoom;
