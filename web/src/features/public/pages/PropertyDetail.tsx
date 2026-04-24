import { useNavigate, useParams } from "react-router-dom";
import { usePropertyDetail } from "../../tenant/property/hooks/useProperty";
import { toTitleCase } from "../../../shared/utils/string.util";
import DatePicker from "../components/DatePicker";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { formatRupiah } from "../../../shared/utils/price.util";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createReservationSchema,
  type CreateReservationInput,
} from "../../reservations/schema/reservations.schema";
import toast from "react-hot-toast";
import { createReservationRequest } from "../../reservations/api/reservations.service";
import { useAuthStore } from "../../auth/stores/auth.store";
import LoaderFetching from "../../../shared/ui/LoaderFetching";
import PropertyImageGallery from "../components/property-images/PropertyImagesGallery";
import ImageGallery from "../components/ImageGallery";

type SelectedDateRoomAvailability = {
  id: string;
  price: number;

  name: string;
  capacity: number;
  bedType: string;
  bedCount: number;
  viewType: string;
  bathroomType: string;

  averageRating: number;
  reviewCount: number;

  roomTypeImages: {
    imageUrl: string;
  }[];
  roomAmenities: {
    amenity: {
      icon: string;
    };
  }[];
};

function PropertyDetail() {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const { propertyId } = useParams() as { propertyId: string };

  const { data: property, isLoading } = usePropertyDetail({ propertyId });

  const [noRoomAvailable, setNoRoomAvailable] = useState(false);
  const [showPropertyGallery, setShowPropertyGallery] = useState(false);
  const [showRoomGallery, setShowRoomGallery] = useState(false);

  const [dateRange, setDateRange] = useState<{
    checkInDate: Date | null;
    checkOutDate: Date | null;
    numberOfNights: number;
  }>({
    checkInDate: null,
    checkOutDate: null,
    numberOfNights: 0,
  });
  const [selectedRoom, setSelectedRoom] =
    useState<SelectedDateRoomAvailability | null>(null);
  const [selectedDateRoomAvailability, setSelectedDateRoomAvailability] =
    useState<SelectedDateRoomAvailability[]>([]);

  const {
    setValue,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<CreateReservationInput>({
    resolver: zodResolver(createReservationSchema),
  });

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const handleSelectDateRoom = (selectedDateRoom: {
    checkInDate: Date | null;
    checkOutDate: Date | null;
    numberOfNights: number;
    availableRooms: {
      roomTypeId: string;
      averagePrice: number;
    }[];
  }) => {
    if (selectedDateRoom.checkInDate && selectedDateRoom.checkOutDate) {
      if (selectedDateRoom.availableRooms.length > 0) {
        const availableMap = new Map(
          selectedDateRoom.availableRooms.map((room) => [
            room.roomTypeId,
            room,
          ]),
        );

        const roomTypeAvailability = property?.roomTypes
          .filter((roomType) => availableMap.has(roomType.id))
          .map((roomType) => {
            const data = availableMap.get(roomType.id);

            return {
              ...roomType,
              price: data?.averagePrice ?? Number(roomType.price),
            };
          });

        if (roomTypeAvailability?.length === 0) {
          setSelectedDateRoomAvailability([
            {
              viewType: "NO_DATA",
            } as SelectedDateRoomAvailability,
          ]);
          setNoRoomAvailable(true);
        } else {
          setSelectedDateRoomAvailability(roomTypeAvailability!);
          setNoRoomAvailable(false);
        }
      } else {
        setSelectedDateRoomAvailability([
          {
            viewType: "NO_DATA",
          } as SelectedDateRoomAvailability,
        ]);
        setNoRoomAvailable(true);
      }
    } else {
      setSelectedDateRoomAvailability([]);
      setNoRoomAvailable(false);
    }

    setDateRange({
      checkInDate: selectedDateRoom.checkInDate,
      checkOutDate: selectedDateRoom.checkOutDate,
      numberOfNights: selectedDateRoom.numberOfNights,
    });

    setValue(
      "checkInDate",
      format(selectedDateRoom.checkInDate!, "yyyy-MM-dd"),
      { shouldValidate: true },
    );
    setValue(
      "checkOutDate",
      format(selectedDateRoom.checkOutDate!, "yyyy-MM-dd"),
      { shouldValidate: true },
    );
    setValue("numberOfNights", selectedDateRoom.numberOfNights, {
      shouldValidate: selectedDateRoom.numberOfNights > 0,
    });
  };

  const roomAvailability =
    selectedDateRoomAvailability.length > 0 &&
    selectedDateRoomAvailability[0]?.viewType !== "NO_DATA"
      ? selectedDateRoomAvailability
      : (property?.roomTypes ?? []);

  const handleSelectRoom = (roomType: SelectedDateRoomAvailability) => {
    if (selectedRoom?.id === roomType.id) {
      setSelectedRoom(null);
      setValue("roomTypeId", "");
      setValue("roomNameSnapshot", "", { shouldValidate: true });
      setValue("averageRoomPerNightSnapshot", 0, {
        shouldValidate: true,
      });
      return;
    }
    setSelectedRoom(roomType);
    setValue("roomTypeId", roomType.id, { shouldValidate: true });
    setValue("roomNameSnapshot", roomType.name, { shouldValidate: true });
    setValue("averageRoomPerNightSnapshot", Number(roomType.price), {
      shouldValidate: true,
    });
  };

  const onSubmit = async (data: CreateReservationInput) => {
    if (!user) {
      toast.error("Please login to create a reservation");
      return;
    }

    if (!selectedRoom) {
      toast.error("Please select a room");
      return;
    }

    const totalAmount = selectedRoom?.price * data.numberOfNights;
    try {
      toast.loading("Creating reservation...");

      if (!data.checkInDate || !data.checkOutDate) {
        return;
      }

      const response = await createReservationRequest({
        ...data,
        totalAmount,
        propertyNameSnapshot: property?.name ?? "",
      });
      toast.dismiss();
      toast.success("Reservation created successfully");
      navigate(`/reservations/${response.data.reservationCode}`);
    } catch (error: any) {
      toast.dismiss();
      toast.error(
        error.response?.data.message || "Failed to create reservation",
      );
    }
  };

  const handleRoomImageClick = (roomType: SelectedDateRoomAvailability) => {
    setSelectedRoom(roomType);
    setShowRoomGallery(true);
  };

  if (isLoading) {
    return <LoaderFetching />;
  }

  return (
    <div className="bg-background text-on-surface antialiased">
      <main className="max-w-7xl mx-auto px-6 pt-16 pb-24">
        <header className="mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-on-surface mb-2">
            {property?.name}
          </h1>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-sm font-semibold">
              <span className="flex items-center gap-1">
                <span
                  className="material-symbols-outlined text-primary text-lg"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star
                </span>
                {property?.averageRating ?? 0} ·{" "}
                <span className="underline cursor-pointer">
                  {property?.reviewCount ?? 0} reviews
                </span>
              </span>
              <span className="text-on-surface-variant">·</span>
              <span className="underline cursor-pointer">
                {property?.city}, {property?.province}, {property?.country}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-2 px-3 py-2 hover:bg-surface-container rounded-lg transition-colors">
                <span className="material-symbols-outlined text-lg">
                  ios_share
                </span>
                <span className="text-sm font-bold">Share</span>
              </button>
              <button className="flex items-center gap-2 px-3 py-2 hover:bg-surface-container rounded-lg transition-colors">
                <span className="material-symbols-outlined text-lg">
                  favorite
                </span>
                <span className="text-sm font-bold">Save</span>
              </button>
            </div>
          </div>
        </header>
        {/* <section
          className={`grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-3 h-125 mb-12 rounded-2xl overflow-hidden group`}
        >
          {property?.propertyImages.map((image, index) => (
            <div
              key={index}
              className={`${image.isCover && "md:col-span-2 md:row-span-2"} overflow-hidden relative`}
            >
              <img
                alt="Main villa view"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                data-alt="Modern white beachfront villa with palm trees"
                src={image.imageUrl}
              />
            </div>
          ))}
        </section> */}
        <PropertyImageGallery
          images={property?.propertyImages}
          handleImageClick={() => setShowPropertyGallery(true)}
        />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 space-y-12">
            <section>
              <div className="flex justify-between items-start border-b border-primary/10 pb-8 mb-8">
                <div>
                  <h2 className="text-2xl font-bold">
                    Entire {property?.category.name} hosted by{" "}
                    {property?.tenant.firstName}
                  </h2>
                  <p className="text-on-surface-variant font-medium mt-1">
                    10 guests · 5 bedrooms · 6 beds ·{" "}
                    {property?.numberOfBathrooms} baths
                  </p>
                </div>
                <div className="relative">
                  <img
                    className="w-14 h-14 rounded-full object-cover border border-primary/10"
                    data-alt="Friendly female host portrait Sarah"
                    src={
                      property?.tenant.profileImage ||
                      `https://ui-avatars.com/api/?name=${property?.tenant.firstName}`
                    }
                  />
                  <div className="absolute -bottom-1 -right-1 bg-primary text-white rounded-full p-1 border-2 border-white">
                    <span
                      className="material-symbols-outlined text-[12px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      verified
                    </span>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                {property?.propertyAmenities.map((amenity, index) => (
                  <div key={index} className="flex gap-6">
                    <span className="material-symbols-outlined text-2xl text-on-surface">
                      {amenity.amenity.icon}
                    </span>
                    <div>
                      <h3 className="font-bold">{amenity.amenity.name}</h3>
                      <p className="text-on-surface-variant text-sm mt-0.5">
                        {amenity.amenity.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
            <section className="border-b border-primary/10 pb-8 mb-8">
              <p className="text-slate-700 leading-relaxed">
                {property?.description}
              </p>
            </section>
            {errors.numberOfNights?.message && (
              <div className="bg-primary-container border border-primary/20 px-4 py-3 rounded-lg flex items-center gap-3 mb-6">
                <span
                  className="material-symbols-outlined text-primary"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  error
                </span>
                <p className="text-primary text-sm font-bold uppercase tracking-wide">
                  Please select check in and check out dates to continue
                </p>
              </div>
            )}
            <DatePicker
              propertyId={propertyId}
              propertyName={property?.name}
              handleSelectDateRoom={handleSelectDateRoom}
              selectedRoomTypeId={selectedRoom?.id ?? null}
            />
            <section
              className={`${noRoomAvailable ? "text-center" : ""} border-b border-primary/10 pb-8 mb-8`}
            >
              <h2 className="text-2xl font-bold ">{`${selectedDateRoomAvailability.length > 0 ? (noRoomAvailable ? "No rooms available for " : "Available rooms for ") : "Where you'll stay"}`}</h2>
              {selectedDateRoomAvailability.length > 0 ? (
                <p className="text-primary text-sm mt-0.5 mb-6 font-bold">
                  {format(dateRange.checkInDate!, "dd MMMM yyyy")} -{" "}
                  {format(dateRange.checkOutDate!, "dd MMMM yyyy")}
                </p>
              ) : (
                <p className="text-red-500 italic text-sm mt-0.5 mb-6 font-bold">
                  (* Select dates to see available rooms )
                </p>
              )}
              {errors.roomTypeId?.message && (
                <div className="bg-primary-container border border-primary/20 px-4 py-3 rounded-lg flex items-center gap-3 mb-6">
                  <span
                    className="material-symbols-outlined text-primary"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    error
                  </span>
                  <p className="text-primary text-sm font-bold uppercase tracking-wide">
                    Please select a room to continue
                  </p>
                </div>
              )}
              {!noRoomAvailable && (
                <div className="flex flex-col gap-4">
                  {roomAvailability?.map((roomType, index) => (
                    <div
                      key={index}
                      className={`flex  rounded-xl border overflow-hidden cursor-pointer hover:shadow-md transition-shadow ${selectedRoom?.id === roomType.id ? "border-primary bg-primary/2 border-2" : "border-primary/10 bg-white"}`}
                    >
                      <div
                        onClick={() => handleRoomImageClick(roomType)}
                        className="w-1/3 aspect-4/3 relative"
                      >
                        <img
                          className="w-full h-full object-cover"
                          data-alt="Luxury master suite with ocean view"
                          src={roomType.roomTypeImages[0].imageUrl}
                        />
                        <div className="absolute bottom-2 right-2 bg-black/60 text-white text-[10px] font-bold px-1.5 py-0.5 rounded backdrop-blur-sm">
                          {roomType.roomTypeImages.length > 1 &&
                            `+${roomType.roomTypeImages.length - 1} photos`}
                        </div>
                      </div>
                      <div
                        onClick={() => handleSelectRoom(roomType)}
                        className="p-4 flex flex-col justify-between w-2/3"
                      >
                        <div>
                          <div className="flex justify-between items-start">
                            <h3 className="font-bold text-lg">
                              {roomType.name}
                            </h3>
                            <span className="text-primary font-bold text-sm">
                              {formatRupiah(roomType.price)}/night
                            </span>
                          </div>
                          <p className="text-on-surface-variant text-sm mt-1">
                            {toTitleCase(roomType.bedType)} bed ·{" "}
                            {toTitleCase(roomType.viewType)} view ·{" "}
                            {toTitleCase(roomType.bathroomType)} bathroom
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          {roomType.roomAmenities.map((amenity, index) => (
                            <span
                              key={index}
                              className="material-symbols-outlined text-on-surface-variant text-lg"
                            >
                              {amenity.amenity.icon}
                            </span>
                          ))}
                          {selectedRoom?.id === roomType.id && (
                            <span className="bg-primary text-white px-2.5 py-1 rounded-lg text-[11px] font-extrabold uppercase tracking-wide ml-auto">
                              Selected
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>
          <div className="lg:col-span-1">
            <div className="sticky top-28 bg-white rounded-2xl p-6 shadow-xl shadow-primary/5 border border-primary/10">
              <div className="flex justify-between items-baseline mb-6">
                {selectedRoom ? (
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-extrabold text-on-surface">
                      {formatRupiah(selectedRoom?.price)}
                    </span>
                    <span className="text-on-surface-variant text-sm font-medium">
                      /night
                    </span>
                  </div>
                ) : (
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-extrabold text-on-surface">
                      Select room
                    </span>
                  </div>
                )}
                {selectedRoom && selectedRoom?.reviewCount > 0 ? (
                  <div className="flex items-center gap-1 text-sm font-bold">
                    <span
                      className="material-symbols-outlined text-primary text-sm"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                    {selectedRoom?.averageRating || 0}
                  </div>
                ) : (
                  ""
                )}
              </div>

              <div className="border border-slate-300 rounded-xl mb-6 overflow-hidden">
                <div className="grid grid-cols-2 border-b border-slate-300">
                  <div className="p-3 border-r border-slate-300 hover:bg-slate-50 cursor-pointer">
                    <label className="block text-[10px] font-extrabold text-on-surface uppercase tracking-wider">
                      Check-in
                    </label>
                    <span className="text-sm font-medium">
                      {dateRange.checkInDate
                        ? format(dateRange.checkInDate, "MMM dd, yyyy")
                        : "Select date"}
                    </span>
                  </div>
                  <div className="p-3 hover:bg-slate-50 cursor-pointer">
                    <label className="block text-[10px] font-extrabold text-on-surface uppercase tracking-wider">
                      Check-out
                    </label>
                    <span className="text-sm font-medium">
                      {dateRange.checkOutDate
                        ? format(dateRange.checkOutDate, "MMM dd, yyyy")
                        : "Select date"}
                    </span>
                  </div>
                </div>
                <div className="p-3 hover:bg-slate-50 cursor-pointer">
                  <label className="block text-[10px] font-extrabold text-on-surface uppercase tracking-wider">
                    Selected Room
                  </label>
                  <span className="text-sm font-bold text-primary">
                    {selectedRoom?.name || "Select room"}
                  </span>
                </div>
              </div>
              <button
                disabled={isSubmitting}
                onClick={handleSubmit(onSubmit, (errors) => {
                  console.error(errors);
                })}
                className={`w-full bg-primary text-on-primary py-3.5 rounded-xl font-extrabold text-lg shadow-md active:scale-[0.98] transition-all  mb-6 ${isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:opacity-95 cursor-pointer"}`}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Creating reservation...
                  </div>
                ) : (
                  "Reserve Room"
                )}
              </button>
              <p className="text-center text-on-surface-variant text-sm mb-6">
                You won't be charged yet
              </p>
              {selectedRoom?.price && dateRange.numberOfNights > 0 && (
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="underline text-on-surface-variant font-medium">
                      {formatRupiah(selectedRoom?.price)} x{" "}
                      {dateRange.numberOfNights} nights
                    </span>
                    <span className="font-medium">
                      {formatRupiah(
                        selectedRoom?.price * dateRange.numberOfNights,
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="underline text-on-surface-variant font-medium">
                      Occupancy taxes &amp; fees
                    </span>
                    <span className="font-medium">
                      {formatRupiah(
                        selectedRoom?.price * dateRange.numberOfNights * 0.1,
                      )}
                    </span>
                  </div>
                  <hr className="border-primary/10" />
                  <div className="flex justify-between text-lg font-extrabold">
                    <span>Total</span>
                    <span>
                      {formatRupiah(
                        selectedRoom?.price * dateRange.numberOfNights +
                          selectedRoom?.price * dateRange.numberOfNights * 0.1,
                      )}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      {showRoomGallery && (
        <ImageGallery
          images={selectedRoom?.roomTypeImages!}
          setShowImageGallery={setShowRoomGallery}
          title={selectedRoom?.name || ""}
          location={property?.name || ""}
        />
      )}
      {showPropertyGallery && (
        <ImageGallery
          images={property?.propertyImages!}
          setShowImageGallery={setShowPropertyGallery}
          title={property?.name || ""}
          location={property?.city || ""}
        />
      )}
    </div>
  );
}

export default PropertyDetail;
