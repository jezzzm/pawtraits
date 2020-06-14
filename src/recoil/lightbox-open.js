import { atom } from 'recoil';

const lightboxOpen = atom({
  key: 'lightboxOpen',
  default: false,
});

export default lightboxOpen;
