import { atom } from 'recoil';

const formState = atom({
  key: 'formState',
  default: {
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
});

export default formState;
