import React, { useState } from 'react';
import { graphql } from 'gatsby';
import { Helmet } from 'react-helmet';
import * as styles from '../styles/index.style';
import Layout from '../components/layout';
import LightboxWrapper from '../components/lightbox/wrapper';
import Modal from '../components/modal';
import Image from '../components/image';
import Thumbnail from '../components/thumbnail';
import useModalOpen from '../utils/use-modal-open';
import useWindowSize from '../utils/use-window-size';
import lightboxOpen from '../recoil/lightbox-open';

export default function Home({ data }) {
  const siteTitle = data.site.siteMetadata.title;
  const pawtraits = data.allContentfulPawtrait.nodes;

  const { isMobile } = useWindowSize();

  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isOpenLightbox, setIsOpenLightbox] = useModalOpen(lightboxOpen);

  const handleThumbClick = (index) => {
    setLightboxIndex(index);
    setIsOpenLightbox(true);
  };

  return (
    <Layout>
      <Helmet title={siteTitle} />
      {isMobile && <h1 css={styles.mobileHeading}>Sydney Pawtraits</h1>}
      <div css={styles.gallery}>
        {pawtraits.map(({ image, name }, index) => (
          <Thumbnail
            key={index + name + 'thumb'}
            name={name}
            onClick={() => handleThumbClick(index)}
            src={image[0].fluid.src}
            alt={image[0].title}
            srcSet={image[0].fluid.srcSet}
            srcSetWebp={image[0].fluid.srcSetWebp}
            sizes={image[0].fluid.sizes}
          />
        ))}
      </div>
      <Modal
        index={lightboxIndex}
        setIndex={setLightboxIndex}
        isOpen={isOpenLightbox}
        setIsOpen={setIsOpenLightbox}
        Wrapper={LightboxWrapper}
        screens={pawtraits.map(({ image, name }, index) => (
          <Image
            key={index + name}
            name={name}
            src={image[0].fluid.src}
            alt={image[0].title}
            srcSet={image[0].fluid.srcSet}
            srcSetWebp={image[0].fluid.srcSetWebp}
            sizes={image[0].fluid.sizes}
          />
        ))}
      />
    </Layout>
  );
}

export const pageQuery = graphql`
  query HomeQuery {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulPawtrait {
      nodes {
        name
        breed
        description {
          description
        }
        location {
          lat
          lon
        }
        age
        artworkSize
        image {
          fluid(maxWidth: 800, maxHeight: 800) {
            srcSet
            src
            sizes
            srcSetWebp
          }
          title
        }
      }
    }
  }
`;
