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

  return (
    <div
      onClick={disabled ? undefined : onClick}
      style={{ width: 2 * scale, height: 3 * scale }}
      className={`relative border-2 flex flex-col rounded-2xl overflow-hidden transition-opacity duration-200 ${
        disabled ? "opacity-50 pointer-events-none cursor-not-allowed" : ""
      } 
      ${highlight === "wrong" ? "border-[#ff053b]" : "border-[#05ffa1]"}  
      ${
        highlight === "correct"
          ? "ring-2 ring-green-500/80 ring-offset-1 ring-offset-neutral-900 shadow-[0_0_38px_rgba(34,197,94,0.65)] transition-shadow pointer-events-none cursor-not-allowed"
          : highlight === "wrong"
          ? "ring-2 ring-red-500/80 ring-offset-1 ring-offset-neutral-900 shadow-[0_0_38px_rgba(239,68,68,0.65)] transition-shadow pointer-events-none cursor-not-allowed"
          : "transition-transform duration-500 ease-in-out hover:-translate-y-1 hover:scale-102"
      }`}
    >
      {/* IMAGE AREA */}
      <div className="relative flex-grow w-full overflow-hidden flex items-center justify-center pointer-events-none">
        {/* background (behind) */}
        <img
          src={imageUrl}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover scale-105 blur-[3px] opacity-50 z-0 pointer-events-none"
        />
        {/* foreground (sharp) */}
        <img
          src={imageUrl}
          alt={name}
          className="relative z-10 block w-full h-auto"
          loading="lazy"
        />
      </div>

      {/* RATING OVERLAY*/}
      {typeof rating === "number" && (
        <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
          <span
            className={`text-6xl font-extrabold drop-shadow-[0_0_8px_rgba(0,0,0,0.7)] ${
              highlight === "correct"
                ? "text-green-500"
                : highlight === "wrong"
                ? "text-red-500"
                : "text-green-500"
            }`}
          >
            {rating}
          </span>
        </div>
      )}

      <div className="h-[60px] w-full bg-[#351353] flex items-center justify-center">
        <span
          className={`text-[#00dffc] font-semibold text-center ${
            nameLength > 50 ? "" : "text-xl"
          } `}
        >
          {name}
        </span>
      </div>
    </div>
  );
}
