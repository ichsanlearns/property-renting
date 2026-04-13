import { useState } from "react";

// --- Sub-Components ---

const ReviewCard = ({ id, guest, property, date, rating, comment, reply, avatar, onReplyClick, activeReplyId, replyText, setReplyText }: any) => (
  <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl border border-slate-50 dark:border-slate-800 group">
    <div className="flex flex-col md:flex-row gap-6">
      <div className="shrink-0">
        <img src={avatar} alt={guest} className="w-14 h-14 rounded-full object-cover border border-slate-100" />
      </div>
      <div className="grow">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <div>
            <h4 className="text-lg font-bold text-slate-900 dark:text-white inline-block mr-2">{guest}</h4>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-600">Verified Guest</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex text-primary">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="material-symbols-outlined text-sm" style={{ fontVariationSettings: i < rating ? "'FILL' 1" : "'FILL' 0" }}>
                  star
                </span>
              ))}
            </div>
            <span className="text-xs text-slate-400 font-medium">{date}</span>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-xs font-bold text-primary flex items-center gap-1 mb-3">
            <span className="material-symbols-outlined text-sm">location_city</span>
            {property}
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{comment}</p>
        </div>

        <div className="flex items-center justify-between border-t border-slate-50 dark:border-slate-800 pt-4">
          <div className="flex gap-4">
            <button className="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-sm">thumb_up</span> Helpful
            </button>
            <button className="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-sm">flag</span> Report
            </button>
          </div>
          <button onClick={() => onReplyClick(id)} className="flex items-center gap-2 px-4 py-2 bg-slate-50 dark:bg-slate-800 text-primary font-bold rounded-lg text-xs hover:bg-primary hover:text-white transition-all">
            <span className="material-symbols-outlined text-sm">reply</span>
            Reply
          </button>
        </div>

        {activeReplyId === id && (
          <div className="mt-4 bg-slate-50 dark:bg-slate-800 p-4 rounded-xl">
            <textarea value={replyText} onChange={(e) => setReplyText(e.target.value)} placeholder="Write your reply..." className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm" />

            <div className="flex justify-end gap-2 mt-3">
              <button onClick={() => setReplyText("")} className="px-3 py-1 text-xs text-slate-500">
                Cancel
              </button>

              <button
                onClick={() => {
                  console.log("Reply:", replyText);
                  setReplyText("");
                  activeReplyId(null);
                }}
                className="px-4 py-1.5 bg-primary text-white text-xs rounded-lg"
              >
                Send
              </button>
            </div>
          </div>
        )}

        {reply && (
          <div className="mt-6 pl-6 border-l-2 border-primary/20">
            <div className="flex items-start gap-4 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl">
              <div className="shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-[10px] font-bold">TP</div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-slate-900 dark:text-white">Tenant Portal (You)</span>
                  <span className="text-[10px] text-slate-400">2 days ago</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400">{reply}</p>
                <button className="mt-2 text-[10px] font-bold text-primary hover:underline">Edit Reply</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
);

// --- Main Page Component ---

export default function DetailReviewPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeReplyId, setActiveReplyId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");

  return (
    <div className="min-h-screen bg-[#f8f9fb] dark:bg-slate-950">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md flex justify-between items-center w-full px-8 py-4 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-6">
          <div className="relative">
            <span className="absolute inset-y-0 left-3 flex items-center text-slate-400">
              <span className="material-symbols-outlined text-lg">search</span>
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary/20 w-64"
              placeholder="Search reviews..."
            />
          </div>
        </div>
      </header>

      <section className="p-8 max-w-7xl mx-auto">
        {/* Page Title Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">Property Reviews</h1>
            <div className="flex items-center gap-3">
              <div className="flex text-primary">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                    {i === 4 ? "star_half" : "star"}
                  </span>
                ))}
              </div>
              <span className="text-xl font-bold text-slate-900 dark:text-white">
                4.8 <span className="text-slate-400 font-medium text-sm">/ 5</span>
              </span>
              <span className="text-slate-400 text-sm">• 120 verified reviews</span>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-semibold rounded-lg hover:bg-slate-50 transition-colors text-sm">
              Export Report
            </button>
            <button className="px-4 py-2 bg-primary text-white font-bold rounded-lg shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform text-sm">Manage Properties</button>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-100 dark:border-slate-800">
          <p className="text-sm text-slate-500 mb-2">Overall Rating</p>

          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl font-black text-slate-900 dark:text-white">4.8</span>
            <span className="material-symbols-outlined text-[#ffb300] text-2xl">star</span>
          </div>

          <p className="text-sm text-slate-500 mb-4">Based on all reviews</p>

          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
            <div className="bg-primary h-2 rounded-full" style={{ width: "96%" }}></div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-slate-100 dark:bg-slate-900/50 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="flex bg-white dark:bg-slate-800 rounded-xl p-1 gap-1">
              <button className="px-3 py-1.5 text-xs font-bold rounded-lg bg-primary text-white">All Reviews</button>
              <button className="px-3 py-1.5 text-xs font-bold rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">5 ★</button>
              <button className="px-3 py-1.5 text-xs font-bold rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">4 ★</button>
            </div>
            <div className="h-6 w-px bg-slate-300 dark:bg-slate-700"></div>
            <select className="bg-transparent border-none text-xs font-bold text-slate-500 focus:ring-0 cursor-pointer">
              <option>Sort by: Most Recent</option>
              <option>Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Reviews List */}
        <div className="space-y-6">
          <ReviewCard
            id="1"
            guest="Elena Rodriguez"
            property="The Azure Loft"
            date="October 24, 2023"
            rating={5}
            avatar="https://lh3.googleusercontent.com/aida-public/AB6AXuCekzJ1ze5QQGryfPdGW1YNoGn8liNTTYEkv_NKyWiEwE_oi7OuVey-vruNHj66Ptbz5QgmHGWIGgO_3x9BFl0BNLIcFSggcEQIIIM3Y5f6g9mXRjgfR6-cJ4rBTZSJ4YhZJYOsvwmQ6wo5nsd6wgCbPs_-GJ1pQ-IztkqrlCquUHW8-PqmLH1j5H1-btpOTgiEQxwlSJe2OtNm1K-5P_xfe4s5f-BoUto7m8HQABebhuG6kDiC0n6tr7v_x7S4CdZrSGU8ACBDGQQ"
            comment="Absolutely stunning stay! The attention to detail in the interior design made this feel more like a luxury boutique hotel than an apartment. Everything was spotless upon arrival."
            onReplyClick={(id: string) => setActiveReplyId(id)}
            activeReplyId={activeReplyId}
            replyText={replyText}
            setReplyText={setReplyText}
          />

          {/* <ReviewCard
            id="2"
            guest="Sophia Chen"
            property="Eco-Luxe Studio"
            date="October 18, 2023"
            rating={5}
            avatar="https://lh3.googleusercontent.com/aida-public/AB6AXuAh_n00rPJbKnFt1UUA_omMBdxtB0M3B4vCwAr-JHaXGBUAYSLBgr_27S90fO3o1zOYMnHTrheBpYgj6P6ldJ1-POTsveS3J3EtlS8pPrua-Ci_hEatNVFFTmr2O5vxVORqvem-TH3Wvgj5uQhQF-7p_R7efTVg-etObAw08ChgrBqR9eeQEVLZFVr82TcrkPDNWNBs7GiIMHtv1vb9yzDnjT4X2GL3nZ8I2lYZSrhsO6l7_U63MkfRPippzg4KSkh9M2IrkN70i6E"
            comment="The sustainable features of this property are what drew me in, but the comfort is what will bring me back. The organic bedding was a dream."
            reply="Thank you for your kind words, Sophia! We strive to make our eco-luxe studios a true sanctuary. We look forward to hosting you again soon."
          /> */}
        </div>

        {/* Pagination */}
        <div className="mt-12 flex items-center justify-center gap-2">
          <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-100 transition-colors">
            <span className="material-symbols-outlined">chevron_left</span>
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary text-white font-bold shadow-md">1</button>
          <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 text-slate-600 font-bold hover:bg-slate-100 transition-colors">2</button>
          <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-100 transition-colors">
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
      </section>
    </div>
  );
}
