import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import * as styles from './form.style';
import * as shared from '../../styles/shared.style';
import ButtonWrapper from './button-wrapper';
import PaperSize from './paper-size';
import Picture from '../picture';
import Input from '../input';
import ErrorMessage from '../input/error-message';
import { requestPawtrait } from '../../services/contentful';
import useWindowSize from '../../utils/use-window-size';
import { hasAnyProperty } from '../../utils';
import formState, { initialFormState } from '../../recoil/form';
import formOpenState from '../../recoil/form-open';

const pageIndex = [
  // [], //info page to be completed
  ['petName', 'breed', 'description', 'referenceImage'], //pet
  ['size', 'additionalComments'], // artwork
  ['requesterName', 'requesterEmail', 'requesterPhone'], //human
  [], //success message
];

const pricing = {
  A6: { one: 169, dims: '105 x 148 mm' },
  A5: { one: 296, two: 370, dims: '148 x 210 mm' },
  A4: { one: 518, two: 647, dims: '210 x 297 mm' },
  A3: { one: 906, two: 1132, dims: '297 x 420 mm' },
  A2: { one: 1585, two: 1981, dims: '420 x 594 mm' },
};

export default function Form({ derek }) {
  const { title, fluid: img } = derek;

  const [state, setState] = useRecoilState(formState);
  const [formOpen, setFormOpen] = useRecoilState(formOpenState);
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    errors,
    trigger,
  } = useForm({ defaultValues: state.data });
  const { twoPets } = watch(['twoPets']);
  const { windowSize } = useWindowSize();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paperHover, setPaperHover] = useState(null);
  const isSuccessPage = state.currentPage === pageIndex.length - 1;

  const next = async () => {
    await trigger(pageIndex[state.currentPage]);
    const stepErrors = hasAnyProperty(errors, pageIndex[state.currentPage]);
    if (!stepErrors) {
      setState({ ...state, currentPage: state.currentPage + 1 });
    }
  };

  const previous = () => {
    setState({ ...state, currentPage: state.currentPage - 1 });
  };
  const onSubmit = async () => {
    const values = getValues();
    setIsSubmitting(true);
    await requestPawtrait(values);
    setIsSubmitting(false);
    next();
  };

  const onChange = event => {
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

  const onBlur = async event => {
    await trigger([event.target.name]);
  };

  const handlePaperClick = size => {
    console.log(size);
    setState({
      ...state,
      data: {
        ...state.data,
        size,
      },
    });
  };

  useEffect(() => {
    // make sure we send back to page 0 if they are on the last page
    // and hit the close button in header
    if (!formOpen && isSuccessPage) {
      setState(initialFormState);
    }
  }, [formOpen, state.currentPage, setState, isSuccessPage]);

  return (
    <>
      <motion.div
        animate={{ x: -1 * state.currentPage * windowSize.width }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 200,
        }}
        css={[shared.modalContentScrollable, styles.wrapper(pageIndex.length)]}
      >
        <form onSubmit={handleSubmit(onSubmit)} css={styles.form}>
          {/* <section css={styles.page(0)}>
            <h2>Ordering a Pawtrait</h2>
          </section> */}

          <section css={styles.page(0)}>
            <h2>
              About Your Pet
              {' '}
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
              placeholder="Tell us something about your pet that we can capture in the Pawtrait"
              type="textarea"
              onChange={onChange}
              onBlur={onBlur}
              ref={register}
            />
            <Input
              name="referenceImage"
              label="Reference Photo"
              type="file"
              onChange={onChange}
              onBlur={onBlur}
              ref={register}
              error={errors.referenceImage}
            />
            <aside css={styles.tips}>
              <h4>
                Photo Tips
                {' '}
                <span role="img" aria-label="lightbulb image">
                  💡
                </span>
              </h4>
              <ul>
                <li>
                  A high resolution image is preferred (no larger than 10mb)
                </li>
                <li>Make sure your pet&apos;s head is in focus</li>
                <li>
                  The photo should have adequate lighting: not washed out, not
                  too dark
                </li>
              </ul>
            </aside>
          </section>
          <section css={styles.page(1)}>
            <h2>
              About the Pawtrait
              {' '}
              <span role="img" aria-label="artwork image">
                🖼️
              </span>
            </h2>
            <div css={styles.price}>
              <h3>What size should the Pawtrait be?</h3>
              <Input
                name="twoPets"
                label="I'd like two pets in this Pawtrait"
                type="checkbox"
                onChange={onChange}
                ref={register}
              />
              <PaperSize selected={state.data.size} twoPets={twoPets} hovering={paperHover} onPaperClick={handlePaperClick} onHoverChange={setPaperHover} />
              <div css={styles.table}>
                <header css={[styles.tableHeader, styles.tableRow]}>
                  <h4>Paper Size</h4>
                  <h4>Dimensions</h4>
                  <h4>Price</h4>
                  <h4>{' '}</h4>
                </header>
                {Object.entries(pricing).map(
                  ([paperSize, prices]) => {
                    const label = `$${
                      twoPets ? prices.two : prices.one
                    }`;

                    if ((twoPets && prices.two) || (!twoPets && prices.one)) {
                      return (
                        <label
                          css={[styles.tableLabel(paperSize === paperHover, paperSize === state.data.size), styles.tableRow]}
                          onMouseEnter={() => setPaperHover(paperSize)}
                          onMouseLeave={() => setPaperHover(null)}
                        >
                          <span>{paperSize}</span>
                          <span>{prices.dims}</span>
                          <span>{label}</span>
                          <input
                            key={paperSize}
                            name="size"
                            ref={register({
                              required: 'You must choose a Pawtrait size',
                            })}
                            type="radio"
                            onChange={onChange}
                            onBlur={onBlur}
                            defaultValue={paperSize}
                            checked={paperSize === state.data.size}
                          />

                        </label>

                      );
                    }
                    return null;
                  },
                )}
              </div>

              <ErrorMessage message={errors.size} />

              {/* <Input
              name="rushed"
              label="Do you need this rushed?"
              type="checkbox"
              error={errors.rushed}
              onChange={onChange}
              onBlur={onBlur}
              ref={register}
            /> */}
            </div>
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
          <section css={styles.page(2)}>
            <h2>
              About You
              {' '}
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
          <section css={[styles.page(3, true), styles.success]}>
            <h1>Success!</h1>
            <Picture
              srcSetWebp={img.srcSetWebp}
              srcSet={img.srcSet}
              src={img.src}
              sizes={img.sizes}
              alt={title}
            />
            <p>
              Thanks for making your Pawtrait request. We will follow up within
              24 hours to finalise your order.
            </p>
            <button
              css={shared.ctaButton('info')}
              type="button"
              onClick={() => {
                setState(initialFormState);
                setFormOpen(false);
              }}
            >
              Okay!
            </button>
          </section>
        </form>
      </motion.div>

      {!isSuccessPage && (
        <ButtonWrapper
          currentPage={state.currentPage}
          onPrevious={previous}
          onNext={next}
          disableProgress={hasAnyProperty(errors, pageIndex[state.currentPage]) || isSubmitting}
          onSubmit={handleSubmit(onSubmit)}
          numPages={pageIndex.length}
          isLoading={isSubmitting}
        />
      )}
    </>
  );
}
