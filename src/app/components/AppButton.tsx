type AppButtonProps = {
  children: string;
  onClick?: () => void;
};

export default function AppButton({ children, onClick }: AppButtonProps) {
  return (
    <button
      className="bg-blue-500 text-white py-8 px-4 rounded-full text-6xl w-120"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
