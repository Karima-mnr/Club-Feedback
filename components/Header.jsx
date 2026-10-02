import Image from 'next/image';

export default function Header() {
  return (
    <div className="flex items-center gap-4">
      <div className="flex shrink-0 items-center justify-center overflow-hidden mb-3">
        <Image
          src="/infobrainsClubLogo.png"
          alt="InfoBrains"
          width={90}
          height={90}
          priority
          className=" object-contain"
        />
      </div>

    </div>
  );
}