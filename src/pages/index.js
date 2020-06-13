import React from 'react';
import { graphql } from 'gatsby';
import { Helmet } from 'react-helmet';
import { css } from '@emotion/core';
import Layout from '../components/layout';
import useLightbox from '../components/lightbox';
import Image from '../components/image';

const gallery = css`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
  grid-gap: 24px;
`;

export default function Home({ data }) {
  const siteTitle = data.site.siteMetadata.title;
  const pawtraits = data.allContentfulPawtrait.nodes;

  const handleImageClick = (e) => {
    const index = e.target.attributes['data-index'].value;
    setIndex(Number(index));
    setIsOpen(true);
  };

  const images = ({ isThumbnail = false } = {}) =>
    pawtraits.map(({ image, name }, index) => (
      <Image
        key={index + name}
        isThumbnail={isThumbnail}
        name={name}
        index={index}
        onClick={handleImageClick}
        src={image[0].fluid.src}
        alt={image[0].title}
        srcSet={image[0].fluid.srcSet}
        sizes={image[0].fluid.sizes}
      />
    ));

  const [Lightbox, setIndex, setIsOpen] = useLightbox(images());

  return (
    <Layout>
      <Helmet title={siteTitle} />
      <div css={gallery}>{images({ isThumbnail: true })}</div>
      <Lightbox />
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
