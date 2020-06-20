import { useLayoutEffect, useRef } from 'react';
import { useRecoilState } from 'recoil';
import useIsMounted from './use-is-mounted';

export default function useModalOpen(atom) {
  const [isOpen, setIsOpen] = useRecoilState(atom);
  const isMounted = useIsMounted();
  const actualWidth = useRef(() =>
    isMounted ? document.body.scrollWidth : null
  );

  useLayoutEffect(() => {
    const width = document.body.scrollWidth;
    if (isOpen) {
      const padding = actualWidth.current - width;
      document.body.style.cssText = `overflow: hidden; padding-right: ${padding}px; height: 100%;`;
      document.getElementById('header').style.paddingRight = `${padding}px`;
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
      document.body.style.height = '';
      document.getElementById('header').style.paddingRight = '';
      actualWidth.current = width;
    }
  }, [isOpen]);

  return [isOpen, setIsOpen];
}
