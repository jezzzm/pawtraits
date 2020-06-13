import { css } from '@emotion/core';

export const MAX_MOBILE_WIDTH = 850;
export const MIN_DESKTOP_WIDTH = 851;

export const isMobile = `@media (max-width: ${MAX_MOBILE_WIDTH}px)`;
export const isDesktop = `@media (min-width: ${MIN_DESKTOP_WIDTH}px)`;
