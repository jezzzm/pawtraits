import React, { Fragment, useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import * as styles from './form.style';
import ButtonWrapper from './button-wrapper';
import * as shared from '../../styles/shared.style';
import Input from '../input';
import { requestPawtrait } from '../../services/contenful';
import useWindowSize from '../../utils/use-window-size';

export default function Form() {
  const { register, handleSubmit, getValues, errors } = useForm();
  const [currentPage, setCurrentPage] = useState(0);
  const { size } = useWindowSize();

  const onSubmit = async () => {
    if (errors.length) {
      console.log(errors);
      return;
    }
    const {
      requesterName,
      requesterEmail,
      requesterPhone,
      petName,
      breed,
      description,
      referenceImage,
      rushed,
      // extraPrints,
      additionalComments,
    } = getValues();

    await requestPawtrait({
      requesterName,
      requesterEmail,
      requesterPhone,
      petName,
      breed,
      description,
      referenceImage,
      rushed,
      // extraPrints,
      additionalComments,
    });
  };

  const next = () => {
    console.log(errors);
    if (!Object.keys(errors).length) {
      setCurrentPage((current) => current + 1);
    }
  };

  const previous = () => {
    setCurrentPage((current) => current - 1);
  };

  return (
    <Fragment>
      <motion.div
        animate={{ x: -1 * currentPage * size.width }}
        css={[shared.modalContentScrollable, styles.wrapper(3)]}
      >
        <form onSubmit={handleSubmit(onSubmit)} css={styles.form}>
          <div css={styles.page(0)}>
            <h2>
              About You{' '}
              <span role="img" aria-label="human emoji">
                👩‍💻
              </span>
            </h2>
            <Input
              name="requesterName"
              label="Name"
              placeholder="Charlie Brown"
              error={errors.requesterName}
              ref={register({ required: 'Your name is required' })}
            />
            <Input
              name="requesterEmail"
              label="Email"
              placeholder="charlie@brown.com"
              error={errors.requesterEmail}
              ref={register({
                required: 'Your email is required',
                pattern: /^\w[\w.-]*@([\w-]+\.)+[\w-]+$/,
              })}
            />
            <Input
              name="requesterPhone"
              label="Best contact number"
              placeholder="0400 000 000"
              error={errors.requesterPhone}
              ref={register({
                required: 'Your phone number is required',
                pattern: /^(?:\+?61|0)[2-478](?:[ -]?[0-9]){8}$/,
              })}
            />
          </div>
          <div css={styles.page(1)}>
            <h2>
              About Your Pet{' '}
              <span role="img" aria-label="pet emoji">
                🐶
              </span>
            </h2>
            <Input
              name="petName"
              label="Name"
              placeholder="Snoopy"
              ref={register({ required: "Pet's name is required" })}
              error={errors.petName}
            />
            <Input
              name="breed"
              label="Breed"
              placeholder="Beagle"
              ref={register({ required: "Pet's breed is required" })}
              error={errors.breed}
            />
            <Input
              name="description"
              label="Description"
              placeholder="Tell us a little bit about your pet so we can capture this in the Pawtrait!"
              type="textarea"
              ref={register}
            />
            <Input
              name="referenceImage"
              label="Reference Image"
              type="file"
              ref={register}
              error={errors.referenceImage}
            />
          </div>
          <div css={styles.page(2)}>
            <h2>
              Extras{' '}
              <span role="img" aria-label="extras image">
                💅
              </span>
            </h2>
            <Input
              name="rushed"
              label="Do you need this rushed?"
              type="checkbox"
              error={errors.rushed}
              ref={register}
            />
            <Input
              name="additionalComments"
              label="Comments"
              placeholder="Anything else you'd like to add?"
              type="textarea"
              ref={register}
            />
          </div>
        </form>
      </motion.div>

      <ButtonWrapper
        currentPage={currentPage}
        onPrevious={previous}
        onNext={next}
        onSubmit={handleSubmit(onSubmit)}
      />
    </Fragment>
  );
}
