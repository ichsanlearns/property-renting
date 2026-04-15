type RoomTypePrice = {
  roomTypeId: string;
  date: string;
  price: number;
  availableRooms: number;
  isClosed: boolean;
};

type DatePrice = {
  price: number;
  availableRooms: number;
  isClosed: boolean;
};

type Transformed = Record<
  string,
  {
    basePrice: number;
    dates: Record<string, DatePrice>;
  }
>;

export const transformRoomTypePrices = (
  roomTypePrices: RoomTypePrice[],
): Transformed => {
  // return roomTypePrices.reduce(
  //   (acc, item) => {
  //     acc[item.roomTypeId] = {
  //       ...acc[item.roomTypeId],
  //       basePrice: item.price,
  //       [item.date]: {
  //         price: item.price,
  //         availableRooms: item.availableRooms,
  //         isClosed: item.isClosed,
  //       },
  //     };
  //     return acc;
  //   },
  //   {} as Record<string, any>,
  // );

  return roomTypePrices.reduce((acc, item) => {
    if (!acc[item.roomTypeId]) {
      acc[item.roomTypeId] = {
        basePrice: item.price,
        dates: {},
      };
    }

    acc[item.roomTypeId]!.dates[item.date] = {
      price: item.price,
      availableRooms: item.availableRooms,
      isClosed: item.isClosed,
    };

    return acc;
  }, {} as Transformed);
};
