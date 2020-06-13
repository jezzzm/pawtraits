import { useState, useLayoutEffect } from 'react';
import useIsMounted from './use-is-mounted';

const isBrowser = typeof window !== undefined;
const getWidth = () => (isBrowser && window.innerWidth) || 0;

export default function useWindowWidth() {
  const isMounted = useIsMounted();
  const [width, setWidth] = useState(() => (isMounted ? getWidth() : 0));

  useLayoutEffect(() => {
    const update = () => setWidth(getWidth());
    window.addEventListener('resize', update);

    return () => window.removeEventListener('resize', update);
  }, []);

  return width;
}
