import { Game } from "../models";

interface GameBannerProps {
  game: Pick<Game, "bannerUrl" | "title" | "_count">;
}

export function GameBanner({
  game: {
    bannerUrl,
    title,
    _count: { ads },
  },
}: GameBannerProps) {
  return (
    <a href="" className="relative rounded-lg overflow-hidden">
      <img src={bannerUrl} alt="" />

      <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0">
        <strong className="font-bold text-white block">{title}</strong>
        <span className="text-zinc-300 text-sm block">{ads} anúncio(s)</span>
      </div>
    </a>
  );
}
