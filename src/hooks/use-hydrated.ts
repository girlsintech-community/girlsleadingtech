import { useEffect, useState } from "react";

/** True after the component has mounted on the client (safe for Motion useScroll targets). */
export function useHydrated() {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  return hydrated;
}
