import { useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function ClientOnlyPortal({ selector, children }: { children: any, selector: string }) {
  let ref = useRef() as any;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    ref.current = document.querySelector(selector)
    setMounted(true);
  }, [selector]);

  return mounted ? createPortal(children, ref.current) : null;
}