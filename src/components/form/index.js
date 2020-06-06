import React from 'react';
import useForm from 'react-hook-form';

export default function Form({isOpen, onClose}) {
  return isOpen ? <div><button onClick={onClose}>Close</button>form</div> : null;
}