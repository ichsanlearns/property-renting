type RoomTypePrice = {
  roomTypeId: string;
  date: string;
  price: number;
  availableRooms: number;
  isClosed: boolean;
};

type RoomType = {
  id: string;
  basePrice: number;
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
  roomTypes: RoomType[],
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
        basePrice:
          roomTypes.find((roomType) => roomType.id === item.roomTypeId)
            ?.basePrice ?? 0,
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
