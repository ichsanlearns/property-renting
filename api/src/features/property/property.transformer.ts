export const transformRoomTypePrices = (roomTypePrices: any[]) => {
  return roomTypePrices.reduce(
    (acc, item) => {
      acc[item.date] = {
        price: item.price,
        availableRooms: item.availableRooms,
        isClosed: item.isClosed,
      };
      return acc;
    },
    {} as Record<string, any>,
  );
};
