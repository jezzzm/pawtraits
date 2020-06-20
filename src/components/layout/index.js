import React, { useState } from 'react';
import { Global } from '@emotion/core';
import * as styles from './layout.style';
import Navigation from '../navigation';
import Form from '../form';
import Modal from '../modal';
import useModalOpen from '../../utils/use-modal-open';
import formOpen from '../../recoil/form-open';

export default function Layout({ children }) {
  const [formIndex, setFormIndex] = useState(0);
  const [isOpenForm, setIsOpenForm] = useModalOpen(formOpen);

  return (
    <div css={styles.pageContainer}>
      <Global styles={styles.layout} />
      <Navigation />

      {children}

      {isOpenForm && (
        <Modal
          index={formIndex}
          setIndex={setFormIndex}
          isOpen={isOpenForm}
          setIsOpen={setIsOpenForm}
          screens={<Form />}
        />
      )}
    </div>
  );
}
