import { useState, useEffect } from "react";

type ItemCardProps = {
  item: {
    name: string;
    imageUrl: string;
  };
  onClick?: () => void;
  disabled?: boolean;
  highlight?: "correct" | "wrong";
  rating?: number;
};

export default function ItemCard({
  item,
  onClick,
  disabled,
  highlight,
  rating,
}: ItemCardProps) {
  const { name, imageUrl } = item;
  const nameLength = name.length;
  const scale = 240;

  const [loaded, setLoaded] = useState(false);

  // reset loading state
  useEffect(() => {
    setLoaded(false);
  }, [imageUrl]);

  return (
    <div
      onClick={disabled ? undefined : onClick}
      style={{ width: 2 * scale, height: 3 * scale }}
      className={`relative border-3 flex flex-col rounded-2xl overflow-hidden transition-opacity duration-200 ${
        disabled ? "opacity-75 pointer-events-none cursor-not-allowed" : ""
      } 
      ${
        highlight === "wrong" ? "border-[#ff053b]" : "border-[rgb(5,255,161)]"
      }  
      ${
        highlight === "correct"
          ? "ring-2 ring-green-500/80 ring-offset-1 ring-offset-neutral-900 shadow-[0_0_38px_rgba(34,197,94,0.65)] transition-shadow pointer-events-none cursor-not-allowed"
          : highlight === "wrong"
          ? "ring-2 ring-red-500/80 ring-offset-1 ring-offset-neutral-900 shadow-[0_0_38px_rgba(239,68,68,0.65)] transition-shadow pointer-events-none cursor-not-allowed"
          : "transition-transform duration-500 ease-in-out hover:-translate-y-1 hover:scale-102"
      }`}
    >
      <div className="relative flex-grow w-full overflow-hidden flex items-center justify-center pointer-events-none">
        {/* background image */}
        <img
          src={imageUrl}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover scale-105 blur-[15px] opacity-50 z-0 pointer-events-none"
        />

        {/* dim overlay */}
        <div
          className={`absolute inset-0 z-30 pointer-events-none transition-opacity duration-200
                      ${loaded ? "opacity-0" : "opacity-100"}`}
        >
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-white/5 via-white/10 to-white/5" />
        </div>

        {/* foreground image fade in  */}
        <img
          src={imageUrl}
          alt={name}
          loading="eager"
          onLoad={() => setLoaded(true)}
          className={`relative z-10 block w-full h-auto transition-opacity duration-500
                      ${loaded ? "opacity-100" : "opacity-0"}`}
        />
      </div>

      {/* RATING OVERLAY*/}
      {typeof rating === "number" && (
        <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
          <span
            className={`text-7xl font-extrabold
        ${
          highlight === "correct"
            ? "text-green-500 [-webkit-text-stroke:2px_rgb(20,83,45)] [text-shadow:0_0_32px_rgba(34,197,94,0.8),0_2px_8px_rgba(0,0,0,0.7)]"
            : highlight === "wrong"
            ? "text-red-500 [-webkit-text-stroke:2px_rgb(127,29,29)] [text-shadow:0_0_32px_rgba(239,68,68,0.8),0_2px_8px_rgba(0,0,0,0.7)]"
            : "text-green-500 [-webkit-text-stroke:2px_rgb(20,83,45)] [text-shadow:0_0_32px_rgba(34,197,94,0.8),0_2px_8px_rgba(0,0,0,0.7)]"
        }
      `}
          >
            {rating}
          </span>
        </div>
      )}

      <div className="h-[60px] w-full bg-[#351353] flex items-center justify-center">
        <span
          className={`text-[#00dffc] font-semibold text-center [text-shadow:0_0_2px_rgba(5,255,161,0.8),0_2px_8px_rgba(0,0,0,0.7)] ${
            nameLength > 50 ? "" : "text-xl"
          } `}
        >
          {name}
        </span>
      </div>
    </div>
  );
}
