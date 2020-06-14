import React, { useState } from 'react';
import { graphql } from 'gatsby';
import { Helmet } from 'react-helmet';
import { css } from '@emotion/core';
import Layout from '../components/layout';
import Lightbox from '../components/lightbox';
import Image from '../components/image';
import Thumbnail from '../components/thumbnail';
import useModalOpen from '../utils/use-modal-open';

const gallery = css`
  column-gap: 24px;
  columns: auto 12rem;
`;

export default function Home({ data }) {
  const siteTitle = data.site.siteMetadata.title;
  const pawtraits = data.allContentfulPawtrait.nodes;

  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isOpenLightbox, setIsOpenLightbox] = useModalOpen(false);

  const handleThumbClick = (index) => {
    setLightboxIndex(index);
    setIsOpenLightbox(true);
  };

  return (
    <Layout>
      <Helmet title={siteTitle} />
      <div css={gallery}>
        {pawtraits.map(({ image, name }, index) => (
          <Thumbnail
            key={index + name + 'thumb'}
            name={name}
            onClick={() => handleThumbClick(index)}
            src={image[0].fluid.src}
            alt={image[0].title}
            srcSet={image[0].fluid.srcSet}
            sizes={image[0].fluid.sizes}
          />
        ))}
      </div>
      <Lightbox
        content={pawtraits.map(({ image, name }, index) => (
          <Image
            key={index + name}
            name={name}
            src={image[0].fluid.src}
            alt={image[0].title}
            srcSet={image[0].fluid.srcSet}
            sizes={image[0].fluid.sizes}
          />
        ))}
        index={lightboxIndex}
        setIndex={setLightboxIndex}
        isOpen={isOpenLightbox}
        setIsOpen={setIsOpenLightbox}
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
          fluid {
            srcSet
            src
            sizes
          }
          title
        }
      }
    }
  }
`;
