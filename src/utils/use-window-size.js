import { useState, useLayoutEffect } from 'react';
import useIsMounted from './use-is-mounted';

const isBrowser = typeof window !== undefined;
const getWidth = () => (isBrowser && window.innerWidth) || 0;
const getHeight = () => (isBrowser && window.innerHeight) || 0;

export default function useWindowSize() {
  const isMounted = useIsMounted();
  const [size, setSize] = useState(() =>
    isMounted ? { width: getWidth(), height: getHeight() } : 0
  );

  useLayoutEffect(() => {
    const update = () => {
      setSize({ width: getWidth(), height: getHeight() });
    };
    window.addEventListener('resize', update);

    return () => window.removeEventListener('resize', update);
  }, []);

  return size;
}
