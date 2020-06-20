import React, { useState } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { Global } from '@emotion/core';
import * as styles from './layout.style';
import Navigation from '../navigation';
import Form from '../form';
import Modal from '../modal';
import useModalOpen from '../../utils/use-modal-open';
import formOpen from '../../recoil/form-open';

export default function Layout({ children }) {
  const data = useStaticQuery(graphql`
    query HeaderQuery {
      derek: contentfulAsset(title: { eq: "Derek" }) {
        fluid(maxHeight: 420, maxWidth: 360) {
          sizes
          src
          srcSet
          srcSetWebp
        }
        title
      }
      smallLogo: contentfulAsset(title: { eq: "spLogo" }) {
        fluid(maxWidth: 200) {
          sizes
          src
          srcSet
          srcSetWebp
        }
        title
      }
    }
  `);
  console.log(data);

  const [formIndex, setFormIndex] = useState(0);
  const [isOpenForm, setIsOpenForm] = useModalOpen(formOpen);

  return (
    <div css={styles.pageContainer}>
      <Global styles={styles.layout} />
      <Navigation logo={data.smallLogo} />

      {children}

      <Modal
        index={formIndex}
        setIndex={setFormIndex}
        isOpen={isOpenForm}
        setIsOpen={setIsOpenForm}
        screens={<Form derek={data.derek} />}
      />
    </div>
  );
}
