import { Suspense } from "react";
import InnerGame from "../components/InnerGame";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <InnerGame />
    </Suspense>
  );
}
