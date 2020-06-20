import React, { Fragment, useState } from 'react';
import { useRecoilState } from 'recoil';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import * as styles from './form.style';
import * as shared from '../../styles/shared.style';
import ButtonWrapper from './button-wrapper';
import Input from '../input';
import { requestPawtrait } from '../../services/contenful';
import useWindowSize from '../../utils/use-window-size';
import formState from '../../recoil/form';

const hasAnyProperty = (obj, properties) => {
  const propertyArray =
    typeof properties === 'string' ? [properties] : properties;

  return propertyArray.some((property) => Object.keys(obj).includes(property));
};

const pageIndex = {
  0: ['requesterName', 'requesterEmail', 'requesterPhone'],
  1: ['petName', 'breed', 'description', 'referenceImage'],
  2: ['rushed', 'additionalComments'],
};

export default function Form() {
  const [state, setState] = useRecoilState(formState);
  const {
    register,
    handleSubmit,
    getValues,
    errors,
    triggerValidation,
  } = useForm({ defaultValues: state });
  const [currentPage, setCurrentPage] = useState(0);
  const { size } = useWindowSize();

  const onSubmit = async () => {
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

  const next = async () => {
    await triggerValidation(pageIndex[currentPage]);

    const stepErrors = hasAnyProperty(errors, pageIndex[currentPage]);
    console.log('stepErrors', stepErrors);

    if (!stepErrors) {
      setCurrentPage((current) => current + 1);
    }
  };

  const previous = () => {
    setCurrentPage((current) => current - 1);
  };

  const onChange = (event) => {
    // we cannot keep uploaded files in state, let browser handle
    if (event.target.type !== 'file') {
      setState({
        ...state,
        [event.target.name]: event.target.value,
      });
    }
  };

  const onBlur = async (event) => {
    await triggerValidation(event.target.name);
  };

  return (
    <Fragment>
      <motion.div
        animate={{ x: -1 * currentPage * size.width }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 200,
        }}
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
              onChange={onChange}
              onBlur={onBlur}
              ref={register({ required: 'Your name is required' })}
            />
            <Input
              name="requesterEmail"
              label="Email"
              placeholder="charlie@brown.com"
              error={errors.requesterEmail}
              onChange={onChange}
              onBlur={onBlur}
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
              onChange={onChange}
              onBlur={onBlur}
              ref={register({
                required: 'Your phone number is required',
                pattern: {
                  value: /^(?:\+?61|0)[2-478](?:[ -]?[0-9]){8}$/,
                  message:
                    'Please enter a valid Australian landline or mobile phone number',
                },
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
              onChange={onChange}
              onBlur={onBlur}
              ref={register({ required: "Pet's name is required" })}
              error={errors.petName}
            />
            <Input
              name="breed"
              label="Breed"
              placeholder="Beagle"
              onChange={onChange}
              onBlur={onBlur}
              ref={register({ required: "Pet's breed is required" })}
              error={errors.breed}
            />
            <Input
              name="description"
              label="Description"
              placeholder="Tell us a little bit about your pet so we can capture this in the Pawtrait!"
              type="textarea"
              onChange={onChange}
              onBlur={onBlur}
              ref={register}
            />
            <div css={styles.tips}>
              <h4>
                Photo Tips{' '}
                <span role="img" aria-label="lightbulb image">
                  💡
                </span>
              </h4>
              <ul>
                <li>
                  A high resolution image is preferred (no larger than 10mb)
                </li>
                <li>Make sure your pet's head is in focus</li>
                <li>
                  The photo should have adequate lighting: not washed out, not
                  too dark
                </li>
              </ul>
            </div>
            <Input
              name="referenceImage"
              label="Reference Photo"
              type="file"
              onChange={onChange}
              onBlur={onBlur}
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
              onChange={onChange}
              onBlur={onBlur}
              ref={register}
            />
            <Input
              name="additionalComments"
              label="Comments"
              placeholder="Anything else you'd like to add?"
              type="textarea"
              onChange={onChange}
              onBlur={onBlur}
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
