import {
  PriceAdjustmentDirection,
  PriceAdjustmentType,
} from "../../../generated/prisma/enums.js";

export function calculateAdjustedPrice(params: {
  basePrice: number;
  adjustmentType: PriceAdjustmentType;
  adjustmentDirection: PriceAdjustmentDirection;
  adjustmentValue: number;
}) {
  const { basePrice, adjustmentType, adjustmentDirection, adjustmentValue } =
    params;

  let result = basePrice;

  if (adjustmentType === "NOMINAL") {
    result =
      adjustmentDirection === "INCREASE"
        ? basePrice + adjustmentValue
        : basePrice - adjustmentValue;
  }

  if (adjustmentType === "PERCENTAGE") {
    const delta = basePrice * (adjustmentValue / 100);

    result =
      adjustmentDirection === "INCREASE"
        ? basePrice + delta
        : basePrice - delta;
  }

  return Math.max(result, 0);
}
