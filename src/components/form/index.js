import React from 'react';
import { useForm } from 'react-hook-form';
import Input from '../input';
import { requestPawtrait } from '../../services/contenful';

export default function Form({ isOpen, onClose }) {
  const { register, handleSubmit, watch, errors } = useForm();
  const formData = watch();
  const onSubmit = async () => {
    const {
      requesterName,
      requesterEmail,
      requesterPhone,
      petName,
      breed,
      description,
      referenceImages,
      rushed,
      extraPrints,
      additionalComments,
    } = formData;

    await requestPawtrait({
      requesterName,
      requesterEmail,
      requesterPhone,
      petName,
      breed,
      description,
      referenceImages,
      rushed,
      extraPrints,
      additionalComments,
    });
    console.log(watch());
  };

  // if extra prints radio true, show options for sizes and prices

  return isOpen ? (
    <div>
      <button onClick={onClose}>Close</button>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          name="requesterName"
          error={errors.requesterName}
          ref={register({ required: 'Your name is required' })}
        />
        <Input
          name="requesterEmail"
          error={errors.requesterEmail}
          ref={register({
            required: 'Your email is required',
            pattern: /^\w[\w.-]*@([\w-]+\.)+[\w-]+$/,
          })}
        />
        <Input
          name="requesterPhone"
          error={errors.requesterPhone}
          ref={register({
            required: 'Your phone number is required',
            pattern: /^(?:\+?61|0)[2-478](?:[ -]?[0-9]){8}$/,
          })}
        />
        <Input
          name="petName"
          ref={register({ required: "Pet's name is required" })}
          error={errors.petName}
        />
        <Input
          name="breed"
          ref={register({ required: "Pet's breed is required" })}
          error={errors.breed}
        />
        <Input name="description" type="textarea" ref={register} />
        <Input
          name="referenceImages"
          type="file"
          ref={register}
          error={errors.referenceImages}
        />
        <div error={errors.rushed}>
          <Input name="rushed" type="checkbox" ref={register} />
        </div>
        <div error={errors.extraPrints}>
          <Input name="extraPrints" type="checkbox" ref={register} />
        </div>
        <Input name="additionalComments" type="textarea" ref={register} />
        <Input type="submit" />
      </form>
    </div>
  ) : null;
}
