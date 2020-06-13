import { useState, useLayoutEffect, useRef } from 'react';
import useIsMounted from './use-is-mounted';

export default function useModalOpen(initialState) {
  const [isOpen, setIsOpen] = useState(initialState);
  const isMounted = useIsMounted();
  const actualWidth = useRef(() =>
    isMounted ? document.body.scrollWidth : null
  );

  useLayoutEffect(() => {
    const width = document.body.scrollWidth;
    if (isOpen) {
      const padding = actualWidth.current - width;
      document.body.style.cssText = `overflow: hidden; padding-right: ${padding}px; height: 100%;`;
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
      document.body.style.height = '';
      actualWidth.current = width;
    }
  }, [isOpen]);

  return [isOpen, setIsOpen];
}
