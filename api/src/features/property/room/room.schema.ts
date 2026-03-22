import { z } from "zod";

const BedTypeRequest = z.enum([
  "king_size",
  "queen_size",
  "double_twin",
  "single",
]);
const ViewTypeRequest = z.enum([
  "ocean_front",
  "garden_view",
  "city_skyline",
  "pool_side",
  "none",
]);
const BathroomTypeRequest = z.enum(["private", "shared"]);

const bedToDb = BedTypeRequest.transform((value) => {
  const map = {
    king_size: "KING_SIZE",
    queen_size: "QUEEN_SIZE",
    double_twin: "DOUBLE_TWIN",
    single: "SINGLE",
  };
  return map[value];
});

const viewToDb = ViewTypeRequest.transform((value) => {
  const map = {
    ocean_front: "OCEAN_FRONT",
    garden_view: "GARDEN_VIEW",
    city_skyline: "CITY_SKYLINE",
    pool_side: "POOL_SIDE",
    none: "NONE",
  };
  return map[value];
});

const bathroomToDb = BathroomTypeRequest.transform((value) => {
  const map = {
    private: "PRIVATE",
    shared: "SHARED",
  };
  return map[value];
});

export const createRoomSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  basePrice: z.number().min(1, "Base price is required"),
  quantity: z.number().min(1, "Quantity is required"),

  bedType: bedToDb,
  bedCount: z.number().min(1, "Bed count is required"),
  viewType: viewToDb,
  bathroomType: bathroomToDb,
  capacity: z.number().min(1, "Capacity is required"),

  isVerified: z.boolean().default(false),
  isPublished: z.boolean().default(false),
});

export type CreateRoomPayload = z.infer<typeof createRoomSchema>;
