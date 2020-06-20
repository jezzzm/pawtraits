import React, { Fragment } from 'react';
import { useRecoilState } from 'recoil';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import * as styles from './form.style';
import * as shared from '../../styles/shared.style';
import ButtonWrapper from './button-wrapper';
import Input from '../input';
import ErrorMessage from '../input/error-message';
import { requestPawtrait } from '../../services/contentful';
import useWindowSize from '../../utils/use-window-size';
import { hasAnyProperty } from '../../utils';
import formState from '../../recoil/form';

const pageIndex = [
  [], //info page
  ['requesterName', 'requesterEmail', 'requesterPhone'], //human
  ['petName', 'breed', 'description', 'referenceImage'], //pet
  ['size', 'additionalComments'], // artwork
  [], //success message
];

const pricing = {
  A6: { one: 169 },
  A5: { one: 296, two: 370 },
  A4: { one: 518, two: 647 },
  A3: { one: 906, two: 1132 },
  A2: { one: 1585, two: 1981 },
};

export default function Form() {
  const [state, setState] = useRecoilState(formState);
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    errors,
    trigger,
  } = useForm({ defaultValues: state.data });
  const { twoPets } = watch(['twoPets']);
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
      size,
      rushed,
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
      size,
      rushed,
      additionalComments,
    });
  };

  const next = async () => {
    console.log(state);
    console.log('before', errors);
    await trigger(pageIndex[state.currentPage]);
    const stepErrors = hasAnyProperty(errors, pageIndex[state.currentPage]);
    console.log('after', errors);
    if (!stepErrors) {
      setState({ ...state, currentPage: state.currentPage + 1 });
    }
  };

  const previous = () => {
    setState({ ...state, currentPage: state.currentPage - 1 });
  };

  const onChange = (event) => {
    // we cannot keep uploaded files in state, let browser handle
    if (event.target.type !== 'file') {
      setState({
        ...state,
        data: {
          ...state.data,
          [event.target.name]: event.target.value,
        },
      });
    } else {
      setState({
        ...state,
        data: {
          ...state.data,
          [event.target.name]: event.target.files[0],
        },
      });
    }
  };

  const onBlur = async (event) => {
    await trigger([event.target.name]);
  };

  return (
    <Fragment>
      <motion.div
        animate={{ x: -1 * state.currentPage * size.width }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 200,
        }}
        css={[shared.modalContentScrollable, styles.wrapper(pageIndex.length)]}
      >
        <form onSubmit={handleSubmit(onSubmit)} css={styles.form}>
          <section css={styles.page(0)}>
            <h2>Ordering a Pawtrait</h2>
          </section>
          <section css={styles.page(1)}>
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
              required
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
                pattern: {
                  value: /^\w[\w.-]*@([\w-]+\.)+[\w-]+$/,
                  message:
                    'You must enter a valid email. Are you missing an @ or . ?',
                },
              })}
              required
            />
            <Input
              name="requesterPhone"
              label="Best contact number"
              placeholder="0400 000 000"
              error={errors.requesterPhone}
              onChange={onChange}
              onBlur={onBlur}
              ref={register({
                pattern: {
                  value: /^(?:\+?61|0)[2-478](?:[ -]?[0-9]){8}$/,
                  message:
                    'Please enter a valid Australian landline with area code, or mobile phone number',
                },
              })}
            />
          </section>
          <section css={styles.page(2)}>
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
              required
            />
            <Input
              name="breed"
              label="Breed"
              placeholder="Beagle"
              onChange={onChange}
              onBlur={onBlur}
              ref={register({ required: "Pet's breed is required" })}
              error={errors.breed}
              required
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
            <aside css={styles.tips}>
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
            </aside>
            <Input
              name="referenceImage"
              label="Reference Photo"
              type="file"
              onChange={onChange}
              onBlur={onBlur}
              ref={register}
              error={errors.referenceImage}
            />
          </section>
          <section css={styles.page(3)}>
            <h2>
              About the Pawtrait{' '}
              <span role="img" aria-label="artwork image">
                🖼️
              </span>
            </h2>
            <h3>What size should the Pawtrait be?</h3>
            <Input
              name="twoPets"
              label="I'd like two pets in this Pawtrait"
              type="checkbox"
              onChange={onChange}
              ref={register}
            />
            <div css={styles.priceTable}>
              {Object.entries(pricing).map(
                ([paperSize, prices], index, array) => {
                  const lastItem = index === array.length - 1;
                  console.log(lastItem);
                  if ((twoPets && prices.two) || (!twoPets && prices.one)) {
                    return (
                      <Input
                        key={paperSize}
                        childKey={paperSize}
                        name="size"
                        label={`${paperSize}: $${
                          twoPets ? prices.two : prices.one
                        }`}
                        type="radio"
                        onChange={onChange}
                        onBlur={onBlur}
                        ref={register({
                          required: 'You must choose a Pawtrait size',
                        })}
                      />
                    );
                  }
                }
              )}
              <ErrorMessage message={errors.size} />
            </div>
            {/* <Input
              name="rushed"
              label="Do you need this rushed?"
              type="checkbox"
              error={errors.rushed}
              onChange={onChange}
              onBlur={onBlur}
              ref={register}
            /> */}
            <Input
              name="additionalComments"
              label="Comments"
              placeholder="Anything else you'd like to add?"
              type="textarea"
              onChange={onChange}
              onBlur={onBlur}
              ref={register}
            />
          </section>
          <section css={styles.page(4)}>
            <h2>Success!</h2>
            <p>submitted, hear back via emiail in X</p>
          </section>
        </form>
      </motion.div>

      <ButtonWrapper
        currentPage={state.currentPage}
        onPrevious={previous}
        onNext={next}
        onSubmit={handleSubmit(onSubmit)}
        numPages={pageIndex.length}
      />
    </Fragment>
  );
}
