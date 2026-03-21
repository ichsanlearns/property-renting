import { AppError } from "../../shared/utils/app-error.util.js";

type LocationResult = {
  city: string;
  province: string;
  country: string;
  fullAddress: string;
};

export const reverseGeocode = async ({
  lat,
  long,
}: {
  lat: number;
  long: number;
}): Promise<LocationResult> => {
  try {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${long}&format=json&accept-language=id`;

    const res = await fetch(url, {
      headers: {
        "User-Agent": "property-app",
      },
    });

    if (!res.ok) throw new Error("Failed to reverse geocode");

    const data: any = await res.json();
    const address = data.address || {};

    return {
      fullAddress: data.display_name || "",
      city:
        address.city || address.county || address.town || address.village || "",
      province: address.province || address.state || address.region || "",
      country: address.country || "",
    };
  } catch (error) {
    throw new AppError(500, "Failed to reverse geocode");
  }
};
