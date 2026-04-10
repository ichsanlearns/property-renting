import { useParams } from "react-router-dom";
import { usePropertyDetail } from "../../tenant/property/hooks/useProperty";
import { toTitleCase } from "../../../shared/utils/string.util";
import DatePicker from "../components/DatePicker";
import { useState } from "react";
import { format } from "date-fns";

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
  const { propertyId } = useParams() as { propertyId: string };
  const { data: property } = usePropertyDetail({ propertyId });
  const [dateRange, setDateRange] = useState<{
    startDate: Date | null;
    endDate: Date | null;
  }>({
    startDate: null,
    endDate: null,
  });
  const [selectedRoom, setSelectedRoom] =
    useState<SelectedDateRoomAvailability | null>(null);

  const [selectedDateRoomAvailability, setSelectedDateRoomAvailability] =
    useState<SelectedDateRoomAvailability[]>([]);

  const handleSelectDateRoom = (selectedDateRoom: {
    startDate: Date | null;
    endDate: Date | null;
    availableRooms: {
      roomTypeId: string;
      averagePrice: number;
    }[];
  }) => {
    setSelectedRoom(null);
    const roomTypeAvailability = property?.roomTypes.map((roomType) => {
      const data = selectedDateRoom.availableRooms.find(
        (room) => room.roomTypeId === roomType.id,
      );
      return {
        ...roomType,
        price: data?.averagePrice ?? Number(roomType.price),
      };
    });
    setSelectedDateRoomAvailability(roomTypeAvailability || []);
    setDateRange(selectedDateRoom);
  };

  const roomAvailability =
    selectedDateRoomAvailability.length > 0
      ? selectedDateRoomAvailability
      : (property?.roomTypes ?? []);

  return (
    <div className="bg-background text-on-surface antialiased">
      <main className="max-w-7xl mx-auto px-6 pt-28 pb-24">
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
        <section
          className={`grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-3 h-[500px] mb-12 rounded-2xl overflow-hidden group`}
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
        </section>
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
            <DatePicker
              propertyId={propertyId}
              handleSelectDateRoom={handleSelectDateRoom}
            />
            <section>
              <h2 className="text-2xl font-bold mb-6">Where you'll sleep</h2>
              <div className="flex flex-col gap-4">
                {roomAvailability?.map((roomType, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedRoom(roomType)}
                    className={`flex bg-surface-container-lowest rounded-xl border overflow-hidden cursor-pointer hover:shadow-md transition-shadow ${
                      selectedRoom?.id === roomType.id
                        ? "border-primary"
                        : "border-primary/10"
                    }`}
                  >
                    <div className="w-1/3 aspect-4/3 relative">
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
                    <div className="p-4 flex flex-col justify-between w-2/3">
                      <div>
                        <div className="flex justify-between items-start">
                          <h3 className="font-bold text-lg">{roomType.name}</h3>
                          <span className="text-primary font-bold text-sm">
                            IDR {roomType.price?.toLocaleString()}/night
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
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
          <div className="lg:col-span-1">
            <div className="sticky top-28 bg-white rounded-2xl p-6 shadow-xl shadow-primary/5 border border-primary/10">
              <div className="flex justify-between items-baseline mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-extrabold text-on-surface">
                    $380
                  </span>
                  <span className="text-on-surface-variant text-sm font-medium">
                    night
                  </span>
                </div>
                <div className="flex items-center gap-1 text-sm font-bold">
                  <span
                    className="material-symbols-outlined text-primary text-sm"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  4.92
                </div>
              </div>
              <div className="border border-slate-300 rounded-xl mb-6 overflow-hidden">
                <div className="grid grid-cols-2 border-b border-slate-300">
                  <div className="p-3 border-r border-slate-300 hover:bg-slate-50 cursor-pointer">
                    <label className="block text-[10px] font-extrabold text-on-surface uppercase tracking-wider">
                      Check-in
                    </label>
                    <span className="text-sm font-medium">
                      {dateRange.startDate
                        ? format(dateRange.startDate, "MMM dd, yyyy")
                        : "Select date"}
                    </span>
                  </div>
                  <div className="p-3 hover:bg-slate-50 cursor-pointer">
                    <label className="block text-[10px] font-extrabold text-on-surface uppercase tracking-wider">
                      Check-out
                    </label>
                    <span className="text-sm font-medium">
                      {dateRange.endDate
                        ? format(dateRange.endDate, "MMM dd, yyyy")
                        : "Select date"}
                    </span>
                  </div>
                </div>
                <div className="p-3 hover:bg-slate-50 cursor-pointer">
                  <label className="block text-[10px] font-extrabold text-on-surface uppercase tracking-wider">
                    Selected Room
                  </label>
                  <span className="text-sm font-bold text-primary">
                    Guest Suite
                  </span>
                </div>
              </div>
              <button className="w-full bg-primary text-on-primary py-3.5 rounded-xl font-extrabold text-lg shadow-md active:scale-[0.98] transition-all hover:opacity-95 mb-6">
                Reserve Room
              </button>
              <p className="text-center text-on-surface-variant text-sm mb-6">
                You won't be charged yet
              </p>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="underline text-on-surface-variant font-medium">
                    $380 x 5 nights
                  </span>
                  <span className="font-medium">$1,900</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="underline text-on-surface-variant font-medium">
                    Oceanic service fee
                  </span>
                  <span className="font-medium">$285</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="underline text-on-surface-variant font-medium">
                    Occupancy taxes &amp; fees
                  </span>
                  <span className="font-medium">$205</span>
                </div>
                <hr className="border-primary/10" />
                <div className="flex justify-between text-lg font-extrabold">
                  <span>Total</span>
                  <span>$2,390</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default PropertyDetail;
