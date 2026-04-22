import { useEffect, useState } from "react";

export default function useCountdown(deadline?: string) {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    if (!deadline) return;

    const interval = setInterval(() => {
      const now = Date.now();
      const target = new Date(deadline).getTime();

      const diff = target - now;

      if (diff <= 0) {
        setTimeLeft("Expired");
        clearInterval(interval);
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft(`${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`);
    }, 1000);

    return () => clearInterval(interval);
  }, [deadline]);

  return timeLeft;
}
