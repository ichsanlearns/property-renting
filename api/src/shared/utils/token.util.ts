import crypto from "crypto";

export const hashToken = ({ token }: { token: string }) => {
  return crypto.createHash("sha256").update(token).digest("hex");
};

export const generateToken = () => {
  const raw = crypto.randomBytes(32).toString("hex");

  const hashed = hashToken({ token: raw });

  return { raw, hashed };
};
