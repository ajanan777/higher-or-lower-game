type ItemCardProps = {
  item: {
    name: string;
    imageUrl: string;
  };
  onClick?: () => void;
};

export default function ItemCard({ item, onClick }: ItemCardProps) {
  const { name, imageUrl } = item;

  return (
    <div
      className="w-[400px] h-[700px] border-2 border-gray-600 flex flex-col rounded-2xl overflow-hidden"
      onClick={onClick}
    >
      <div className="flex-grow w-full bg-gray-800" />
      <div className="h-[60px] w-full bg-gray-900 flex items-center justify-center">
        <span className="text-white text-xl font-semibold">{name}</span>
      </div>
    </div>
  );
}
