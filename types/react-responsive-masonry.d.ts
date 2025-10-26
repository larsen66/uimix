declare module 'react-responsive-masonry' {
  import React from 'react';

  interface MasonryProps {
    columnsCount?: number;
    gutter?: string | number;
    children: React.ReactNode;
    className?: string;
  }

  interface ResponsiveMasonryProps {
    columnsCountBreakPoints?: Record<number, number>;
    children: React.ReactNode;
    className?: string;
  }

  const Masonry: React.FC<MasonryProps>;
  const ResponsiveMasonry: React.FC<ResponsiveMasonryProps>;

  export { Masonry, ResponsiveMasonry };
}
