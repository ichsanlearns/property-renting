import { format } from "date-fns";

function getPropertyPrefix(propertyName: string): string {
  return propertyName
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word[0]?.toUpperCase())
    .join("")
    .slice(0, 5);
}

function generateRandomCode(length = 4): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";

  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return result;
}

export function generateReservationCode(propertyName: string): string {
  const prefix = getPropertyPrefix(propertyName);

  const datePart = format(new Date(), "yyyyMMdd");

  const randomPart = generateRandomCode(4);

  return `${prefix}-${datePart}-${randomPart}`;
}
