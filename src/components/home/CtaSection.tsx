export const CtaSection = () => {
  return (
    <>
      <div className="w-full bg-slate-50 py-20 px-4 flex items-center justify-center">
        <div className="w-full max-w-275 rounded-3xl relative overflow-hidden flex flex-col items-center justify-center text-center py-12 px-6 bg-[url('https://assets.prebuiltui.com/components/newsletter/newsletter-bg-image.png')] bg-cover bg-center">
          <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-white/50 mb-5 bg-white/10">
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.917 12.25v-3.5M7 12.25v-7m4.083 7V1.75"
                stroke="#fff"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-white text-xs">Experience the future</span>
          </div>
          <h2 className="text-[42px] font-medium leading-tight text-white mb-2">
            Ready to start learning?
          </h2>
          <p className="text-sm md:text-base text-zinc-200 mb-6 mx-auto">
            Don't miss the chance to learn the trends, join us today
          </p>
          <div className="flex items-center gap-3.5">
            <button className="px-6 py-2.5 rounded-full bg-white text-zinc-800 text-sm font-medium hover:bg-zinc-100 transition-colors cursor-pointer">
              Sign In
            </button>
            <button className="px-6 py-2.5 rounded-full border border-white/50 text-gray-50 text-sm font-medium hover:bg-white/10 transition-colors cursor-pointer">
              Explore courses
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
