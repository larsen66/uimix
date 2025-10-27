"use client";

import React from "react";

type MasonryProps = {
  children: React.ReactNode;
  className?: string;
  /**
   * Tailwind utility classes for responsive columns.
   * Example: "columns-1 sm:columns-2 lg:columns-3 xl:columns-4".
   */
  columnsClassName?: string;
  /** Gap between items (applies to column-gap and item margin-bottom). */
  gapClassName?: string;
};

/**
 * Masonry layout using CSS multi-column layout. Items of different heights
 * flow naturally while keeping column balance. Each child is wrapped to
 * prevent column breaks within items.
 */
export function Masonry({
  children,
  className,
  columnsClassName = "columns-1 sm:columns-2 lg:columns-3 xl:columns-4",
  gapClassName = "gap-4",
}: MasonryProps) {
  const containerClass = [columnsClassName, gapClassName, className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={containerClass}>
      {React.Children.map(children, (child, idx) => (
        <div
          key={idx}
          className="mb-4"
          style={{
            breakInside: "avoid",
            pageBreakInside: "avoid",
          } as React.CSSProperties}
        >
          {child}
        </div>
      ))}
    </div>
  );
}

export default Masonry;

