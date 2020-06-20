import React, { useState } from 'react';
import { graphql } from 'gatsby';
import { Helmet } from 'react-helmet';
import * as styles from '../styles/index.style';
import Layout from '../components/layout';
import LightboxWrapper from '../components/lightbox/wrapper';
import Modal from '../components/modal';
import Image from '../components/image';
import Picture from '../components/picture';
import Thumbnail from '../components/thumbnail';
import useModalOpen from '../utils/use-modal-open';
import lightboxOpen from '../recoil/lightbox-open';

export default function Home({ data }) {
  const siteTitle = data.site.siteMetadata.title;
  const pawtraits = data.allContentfulPawtrait.nodes;
  const { title, fluid: img } = data.bigLogo;

  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isOpenLightbox, setIsOpenLightbox] = useModalOpen(lightboxOpen);

  const handleThumbClick = (index) => {
    setLightboxIndex(index);
    setIsOpenLightbox(true);
  };

  return (
    <Layout>
      <Helmet title={siteTitle} />
      <div css={styles.hero}>
        <h1>
          <span>Sydney's premier pet portraiture</span>
        </h1>
        <Picture
          src={img.src}
          srcSet={img.srcSet}
          srcSetWebp={img.srcSetWebp}
          alt={title}
          sizes={img.sizes}
        />
      </div>
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
    bigLogo: contentfulAsset(title: { eq: "spLogoFull" }) {
      fluid(maxHeight: 420, maxWidth: 360) {
        sizes
        src
        srcSet
        srcSetWebp
      }
      title
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
