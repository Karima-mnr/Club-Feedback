import Image from 'next/image';

export default function Header() {
  return (
    <div className="flex items-center gap-4">
      <div className="flex shrink-0 items-center justify-center overflow-hidden mb-3">
        <Image
          src="/infobrainsClubLogo.png"
          alt="InfoBrains"
          width={100}
          height={100}
          priority
          className=" object-contain"
        />
      </div>

      <div className="flex flex-col leading-tight">
        <span className="text-[16px] font-medium tracking-[-0.01em] text-white">
          InfoBrains
        </span>
        <span className="mt-1 text-[12px] font-light tracking-wide text-slate-500">
          Scientific Club
        </span>
      </div>
    </div>
  );
}