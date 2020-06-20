import { atom } from 'recoil';

const formState = atom({
  key: 'formState',
  default: {
    data: {
      requesterName: '',
      requesterEmail: '',
      requesterPhone: '',

      petName: '',
      breed: '',
      description: '',
      // referenceImage must be uncontrolled

      rushed: false,
      additionalComments: '',
      size: '',
    },
    currentPage: 0,
  },
});

export default formState;
