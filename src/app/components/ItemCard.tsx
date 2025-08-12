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

  return (
    <div
      onClick={disabled ? undefined : onClick}
      className={`relative w-[400px] h-[700px] border-2 flex flex-col rounded-2xl overflow-hidden transition-opacity duration-200 ${
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
      {typeof rating === "number" && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none animate-pulse">
          <span
            className={`text-6xl font-extrabold ] ${
              highlight === "correct"
                ? "text-green-500"
                : highlight === "wrong"
                ? "text-red-500"
                : "text-green-500 [text-shadow:0_0_6px_#22c55e,0_0_2px_#22c55e]"
            }`}
          >
            {rating}
          </span>
        </div>
      )}

      <div className="flex-grow w-full bg-[#23064e]" />
      <div className="h-[60px] w-full bg-[#170435] flex items-center justify-center">
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
