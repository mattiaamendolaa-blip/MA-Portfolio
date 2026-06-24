"use client";

interface MarqueeProps {
  items: string[];
  speed?: number;
}

export function Marquee({ items, speed = 30 }: MarqueeProps) {
  const content = items.join(" · ");

  return (
    <div className="relative overflow-hidden py-6 select-none" aria-hidden="true">
      <div
        className="flex whitespace-nowrap"
        style={{ animation: `marquee ${speed}s linear infinite` }}
      >
        <span className="text-sm font-medium tracking-widest uppercase text-neutral-400 dark:text-neutral-500 px-4">
          {content} &nbsp;·&nbsp; {content} &nbsp;·&nbsp; {content} &nbsp;·&nbsp; {content}
        </span>
      </div>
    </div>
  );
}
