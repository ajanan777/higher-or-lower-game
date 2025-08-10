type ItemCardProps = {
  item: {
    name: string;
    imageUrl: string;
  };
  onClick?: () => void;
  disabled?: boolean;
};

export default function ItemCard({ item, onClick, disabled }: ItemCardProps) {
  const { name, imageUrl } = item;

  return (
    <div
      onClick={disabled ? undefined : onClick}
      className={`w-[400px] h-[700px] border-2 border-gray-600 flex flex-col rounded-2xl overflow-hidden transition-opacity duration-200 ${
        disabled ? "opacity-50 pointer-events-none cursor-not-allowed" : ""
      }`}
    >
      <div className="flex-grow w-full bg-gray-800" />
      <div className="h-[60px] w-full bg-gray-900 flex items-center justify-center">
        <span className="text-white text-xl font-semibold">{name}</span>
      </div>
    </div>
  );
}
