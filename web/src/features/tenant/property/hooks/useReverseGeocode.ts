import { useRef, useState } from "react";
import { geocodingService } from "../api/geocoding.service";

export const useReverseGeoCode = () => {
  const [isFetching, setIsFetching] = useState(false);

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const controllerRef = useRef<AbortController | null>(null);
  const requestIdRef = useRef(0);

  const reverseGeoCode = async (
    { lat, lng }: { lat: number; lng: number },
    onSuccess: (data: any) => void,
  ) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setIsFetching(true);
    timeoutRef.current = setTimeout(async () => {
      if (controllerRef.current) {
        controllerRef.current.abort();
      }

      const controller = new AbortController();
      controllerRef.current = controller;

      const currentRequestId = ++requestIdRef.current;

      try {
        const address = await geocodingService({ lat, lng });
        onSuccess({
          fullAddress: address.fullAddress,
          city: address.city,
          province: address.province,
          country: address.country,
        });
      } catch (error: any) {
        if (error.name === "AbortError") return;
        console.error("Error fetching address:", error);
      } finally {
        if (currentRequestId === requestIdRef.current) {
          setIsFetching(false);
          controllerRef.current = null;
        }
      }
    }, 500);
  };

  return { reverseGeoCode, isFetching };
};
