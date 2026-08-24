"use client";

import { useEffect, useRef, useState } from "react";

/**
 * IntersectionObserver-driven entrance, matching the reference's
 * fade-up-on-enter behaviour. Fires once per element.
 */
export default function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  className = "",
}: {
  children: React.ReactNode;
  delay?: 1 | 2 | 3 | 0;
  as?: React.ElementType;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${delay ? `reveal-delay-${delay}` : ""} ${
        shown ? "in" : ""
      } ${className}`}
    >
      {children}
    </Tag>
  );
}
