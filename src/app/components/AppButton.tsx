type AppButtonProps = {
  children: string;
};

export default function AppButton({ children }: AppButtonProps) {
  return (
    <button className="bg-blue-500 text-white py-8 px-4 rounded-full text-9xl w-120">
      {children}
    </button>
  );
}
