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

  return (
    <div
      onClick={disabled ? undefined : onClick}
      className={`relative w-[400px] h-[700px] border-2 border-gray-600 flex flex-col rounded-2xl overflow-hidden transition-opacity duration-200 ${
        disabled ? "opacity-50 pointer-events-none cursor-not-allowed" : ""
      } ${
        highlight === "correct"
          ? "ring-2 ring-green-500/80 ring-offset-1 ring-offset-neutral-900 shadow-[0_0_38px_rgba(34,197,94,0.65)] transition-shadow pointer-events-none cursor-not-allowed"
          : highlight === "wrong"
          ? "ring-2 ring-red-500/80 ring-offset-1 ring-offset-neutral-900 shadow-[0_0_38px_rgba(239,68,68,0.65)] transition-shadow pointer-events-none cursor-not-allowed"
          : "transition-transform duration-500 ease-in-out hover:-translate-y-1 hover:scale-102"
      }`}
    >
      {typeof rating === "number" && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none animate-pulse">
          <span className="text-6xl font-extrabold text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]">
            {rating.toFixed(1)}
          </span>
        </div>
      )}

      <div className="flex-grow w-full bg-gray-800" />
      <div className="h-[60px] w-full bg-gray-900 flex items-center justify-center">
        <span className="text-white text-xl font-semibold">{name}</span>
      </div>
    </div>
  );
}
