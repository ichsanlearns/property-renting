import { eachDayOfInterval, format, subDays } from "date-fns";
import type { GetPropertyRoomPricesDateResponse } from "../../tenant/property/api/property.response";

type SelectedDateRoom = {
  roomTypeId: string;
  averagePrice: number;
};

export function getAvailableRoomTypesForRange({
  checkInDate,
  checkOutDate,
  availabilityMap,
  roomTypeIds,
}: {
  checkInDate: Date;
  checkOutDate: Date;
  availabilityMap: Map<string, GetPropertyRoomPricesDateResponse>;
  roomTypeIds: string[];
}): SelectedDateRoom[] {
  const nights = eachDayOfInterval({
    start: checkInDate,
    end: subDays(checkOutDate, 1),
  });

  return roomTypeIds.flatMap((roomTypeId) => {
    const prices: number[] = [];

    const isAvailable = nights.every((night) => {
      const dateKey = format(night, "yyyy-MM-dd");
      const dayData = availabilityMap.get(`${roomTypeId}-${dateKey}`);

      if (!dayData || dayData.availableRooms <= 0 || dayData.isClosed) {
        return false;
      }

      prices.push(Number(dayData.price));
      return true;
    });

    if (!isAvailable) return [];

    const averagePrice =
      prices.reduce((sum, price) => sum + price, 0) / prices.length;

    return [
      {
        roomTypeId,
        averagePrice,
      },
    ];
  });
}
