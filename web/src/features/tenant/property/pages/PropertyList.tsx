import LoaderFetching from "../../../../shared/ui/LoaderFetching";
import { useDeleteProperty } from "../hooks/property.mutation";
import { usePropertyByTenantId } from "../hooks/useProperty";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ConfirmModal from "../../../../shared/ui/ConfirmModal";
import { formatRupiah } from "../../../../shared/utils/price.util";

function PropertyList() {
  const { data: properties, isLoading } = usePropertyByTenantId();
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const deleteMutation = useDeleteProperty();
  const navigate = useNavigate();

  const handleDeleteProperty = (propertyId: string) => {
    deleteMutation.mutate(propertyId, {
      onSuccess: () => {
        setConfirmDelete(null);
      },
    });
  };

  const handleNavigateToPropertyDetail = (propertyId: string) => {
    const property = properties?.find((property) => property.id === propertyId);

    if (!property) return;

    navigate(`/tenant/property/${propertyId}`, {
      state: {
        property,
      },
    });
  };

  if (isLoading) {
    return <LoaderFetching />;
  }

  return (
    <main className="pt-24 pb-12 px-6 md:px-12 md:pt-12 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div className="flex flex-col gap-2">
          <h1 className="text-[30px] font-extrabold tracking-tight text-slate-900">
            Properties
          </h1>
          <p className="text-[14px] font-medium text-secondary">
            Manage your portfolio of luxury listings.
          </p>
        </div>
        <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto">
          <div className="flex items-center gap-1 p-1 bg-surface-container-highest rounded-xl">
            <button className="px-4 py-2 text-[14px] font-semibold bg-surface text-primary rounded-lg shadow-sm">
              All ({properties?.length})
            </button>
          </div>
          <button
            type="button"
            onClick={() => navigate(`/tenant/properties/create`)}
            className="hidden md:flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl font-semibold shadow-md shadow-primary/20 hover:shadow-lg active:scale-[0.98] transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">add</span>
            Add Property
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {properties?.map((property) => (
          <div
            key={property.id}
            onClick={() => handleNavigateToPropertyDetail(property.id)}
            className="flex flex-col md:flex-row bg-surface rounded-xl border border-outline-variant p-4 hover:shadow-xl hover:shadow-primary/5 transition-all group shadow-sm hover:-translate-y-0.5 hover:bg-slate-50/50 duration-300 md:gap-10 cursor-pointer"
          >
            <div className="relative w-full md:w-48 h-48 md:h-auto rounded-lg overflow-hidden shrink-0">
              <img
                alt="Villa Azul"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                data-alt="Luxurious coastal villa exterior with infinity pool overlooking the Aegean sea in Santorini at sunset"
                src={property.coverImage}
              />
              <div className="absolute top-3 left-3 bg-surface/90 backdrop-blur-sm text-primary px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider shadow-sm border border-slate-200/10">
                {property.isPublished}
              </div>
            </div>
            <div className="flex flex-col justify-center flex-1 py-2">
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 bg-surface-container-highest text-secondary text-[10px] font-bold uppercase rounded-md tracking-wider">
                  {property.category}
                </span>
              </div>
              <h2 className="text-[24px] text-slate-900 tracking-tight mb-1 font-extrabold">
                {property.name}
              </h2>
              <p className="text-[14px] font-medium mb-4 flex items-center gap-1 text-slate-500/80">
                <span className="material-symbols-outlined text-[16px]">
                  location_on
                </span>
                {property.city}, {property.country}
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                {property.roomTypes.map((roomType) => (
                  <div className="flex items-center gap-2 px-2.5 py-1 bg-surface-container-highest rounded-lg text-[11px] font-medium text-secondary border border-outline-variant/30 shadow-sm">
                    <span className="font-bold text-on-surface">
                      {roomType.name}
                    </span>
                    <span>•</span>
                    <span>{roomType.capacity} Guests</span>
                    <span>•</span>
                    <span className="text-primary font-bold">
                      {formatRupiah(roomType.basePrice)}
                    </span>
                  </div>
                ))}
                {property.roomTypes.length > 2 && (
                  <div className="flex items-center px-2.5 py-1 bg-surface-container-low rounded-lg text-[11px] font-bold text-primary border border-primary/10">
                    +{property.roomTypes.length - 2} more
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col justify-center md:items-end gap-3 md:w-64 shrink-0 py-2 md:border-l border-outline-variant md:pl-6">
              <div className="flex flex-col md:items-end gap-4">
                <div className="flex items-center gap-1 bg-primary/5 px-3 py-1.5 rounded-lg w-fit border border-primary/10">
                  <span
                    className={`material-symbols-outlined text-[18px] ${property.averageRating ? "text-primary" : "text-slate-400"}`}
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  <span
                    className={` text-[15px] ${property.averageRating ? "font-extrabold text-primary" : "font-bold text-slate-400"}`}
                  >
                    {property.averageRating ? property.averageRating : "-"}
                  </span>
                  <span
                    className={`text-[12px] font-medium ml-1 ${property.averageRating ? "text-slate-500" : "text-slate-400"}`}
                  >
                    ({property.reviewCount ? property.reviewCount : "No"}{" "}
                    Reviews)
                  </span>
                </div>
                <div className="flex flex-col gap-0.5 md:items-end">
                  <span className="text-[14px] font-bold text-slate-900">
                    {property.numberOfBathrooms} Baths
                  </span>
                  <span className="text-[12px] font-medium text-slate-400">
                    Last updated{" "}
                    {new Date(property.updatedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex md:flex-col items-center justify-center gap-2 md:w-16 shrink-0 border-t md:border-t-0 md:border-l border-outline-variant pt-4 md:pt-0 md:pl-4">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setConfirmDelete(property.id);
                }}
                className="p-3 cursor-pointer w-full text-error hover:text-white hover:bg-error rounded-xl transition-all flex items-center justify-center"
                title="Delete"
              >
                <span className="material-symbols-outlined text-xl">
                  delete
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>
      <ConfirmModal
        isOpen={confirmDelete !== null}
        onCancel={() => setConfirmDelete(null)}
        onConfirm={() => handleDeleteProperty(confirmDelete!)}
        buttonTitle="Delete"
        title="Delete Property"
        description="Are you sure you want to delete this property?"
        isLoading={deleteMutation.isPending}
      />
    </main>
  );
}

export default PropertyList;
