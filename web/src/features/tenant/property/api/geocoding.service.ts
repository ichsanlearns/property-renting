export type ReverseGeocodeResult = {
  fullAddress: string;
  city: string;
  province: string;
  country: string;
};

export const geocodingService = async ({
  lat,
  lng,
}: {
  lat: number;
  lng: number;
}): Promise<ReverseGeocodeResult> => {
  const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&accept-language=id`;

  const res = await fetch(url, { headers: { "User-Agent": "property-app" } });

  if (!res.ok) {
    throw new Error("Failed to fetch location");
  }

  const data = await res.json();
  const address = data.address || {};

  return {
    fullAddress: data.display_name || "",
    city:
      address.city || address.county || address.town || address.village || "",
    province: address.province || address.state || address.region || "",
    country: address.country || "",
  };
};
