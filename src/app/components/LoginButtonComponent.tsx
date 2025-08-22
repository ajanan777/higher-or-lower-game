import LoginButton from "./LoginButton";
import { LogIn } from "lucide-react";
import { CircleUserRound } from "lucide-react";
import { useSession, signIn, signOut } from "next-auth/react";

type LoginButtonComponentProps = {
  onClick?: () => void;
};

export default function LoginButtonComponent({
  onClick,
}: LoginButtonComponentProps) {
  const { status } = useSession();
  const authed = status === "authenticated";

  return (
    <div className="fixed top-10 right-30 flex transition-transform duration-500 ease-in-out hover:-translate-y-0 hover:scale-101 cursor-pointer">
      <LoginButton shape="rounded" onClick={onClick}>
        <span className="flex items-center gap-2">
          {authed ? (
            <CircleUserRound size={30} strokeWidth={3} />
          ) : (
            <LogIn size={30} strokeWidth={3} />
          )}
          {authed ? "account" : "login in"}
        </span>
      </LoginButton>
    </div>
  );
}
