import { atom } from 'recoil';

export const initialFormState = {
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
    twoPets: false,
  },
  currentPage: 0,
};

const formState = atom({
  key: 'formState',
  default: initialFormState,
});

export default formState;
