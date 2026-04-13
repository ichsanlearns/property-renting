import { useState } from "react";

export default function ReviewReplyForm({ onSubmit }: { onSubmit: (reply: string) => void }) {
  const [reply, setReply] = useState("");

  return (
    <div className="mt-3">
      <textarea value={reply} onChange={(e) => setReply(e.target.value)} placeholder="Balas review..." className="w-full border border-slate-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />

      <button
        onClick={() => {
          if (!reply.trim()) return;
          onSubmit(reply);
          setReply("");
        }}
        className="mt-2 bg-primary text-white px-4 py-2 rounded-lg text-sm hover:bg-primary/90 transition"
      >
        Kirim Balasan
      </button>
    </div>
  );
}
