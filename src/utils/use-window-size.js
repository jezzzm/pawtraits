import { useState, useLayoutEffect } from 'react';
import useIsMounted from './use-is-mounted';
import { MAX_MOBILE_WIDTH } from './breakpoints';

const getWidth = () => window.innerWidth;
const getHeight = () => window.innerHeight;

export default function useWindowSize() {
  const isMounted = useIsMounted();
  const [size, setSize] = useState(() =>
    isMounted
      ? { width: getWidth(), height: getHeight() }
      : { width: 0, height: 0 }
  );
  const [isMobile, setIsMobile] = useState(false);

  const update = () => {
    const width = getWidth();
    setSize({ width, height: getHeight() });
    setIsMobile(() => width <= MAX_MOBILE_WIDTH);
  };

  useLayoutEffect(() => {
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  useLayoutEffect(() => {
    window.addEventListener('orientationchange', update);
    return () => window.removeEventListener('orientationchange', update);
  }, []);

  useLayoutEffect(() => {
    if (size.width === 0 && isMounted) {
      update();
    }
  }, [isMounted, size.width]);

  return { size, isMobile };
}
