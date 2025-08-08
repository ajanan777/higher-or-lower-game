type ItemCardProps = {
  item: {
    name: string;
    imageUrl: string;
  };
};

export default function ItemCard({ item }: ItemCardProps) {
  const { name, imageUrl } = item;

  return (
    <div>
      <h1> {name} </h1>
    </div>
  );
}
