import crypto from "crypto";

export function hashToken({ token }: { token: string }) {
  return crypto.createHash("sha256").update(token).digest("hex");
}
