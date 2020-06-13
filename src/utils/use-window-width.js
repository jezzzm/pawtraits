import { useState, useLayoutEffect } from 'react';

const isBrowser = typeof window !== undefined;
const getWidth = () => (isBrowser ? window.innerWidth : undefined);

export default function useWindowWidth() {
  const [width, setWidth] = useState(getWidth);
  useLayoutEffect(() => {
    if (!isBrowser) {
      return null;
    }
    const update = () => setWidth(getWidth());
    window.addEventListener('resize', update);

    return () => window.removeEventListener('resize', update);
  }, []);

  return width;
}
