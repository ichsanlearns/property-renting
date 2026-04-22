type Props = {
  timeLeft: string;
};

function CountdownCard({ timeLeft }: Props) {
  return (
    <div className="rounded-3xl p-px bg-linear-to-r from-primary via-indigo-500 to-pink-500">
      <div className="bg-white rounded-3xl p-5 flex justify-between items-center">
        <div>
          <p className="text-sm text-slate-500 mb-1">Time remaining to complete payment</p>

          <p className="text-2xl font-black text-rose-500 tracking-wider">{timeLeft}</p>
        </div>

        <div className="h-14 w-14 rounded-2xl bg-rose-50 flex items-center justify-center">
          <span className="material-symbols-outlined text-rose-500 text-3xl">timer</span>
        </div>
      </div>
    </div>
  );
}

export default CountdownCard;
