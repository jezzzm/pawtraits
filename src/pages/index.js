import React, { useState } from 'react';
import { graphql } from 'gatsby';
import { Helmet } from 'react-helmet';
import useLightbox from '../components/lightbox';
import Image from '../components/image';

export default function Home({ data }) {
  const siteTitle = data.site.siteMetadata.title;
  const pawtraits = data.allContentfulPawtrait.nodes;

  const handleImageClick = (e) => {
    const index = e.target.attributes['data-index'].value;
    setIndex(Number(index));
    setIsOpen(true);
  };

  const images = ({ thumbnail = false } = {}) =>
    pawtraits.map(({ image, name }, index) => (
      <Image
        thumbnail={thumbnail}
        key={index + name}
        name={name}
        index={index}
        src={image[0].fluid.src}
        alt={image[0].title}
        srcSet={image[0].fluid.srcSet}
        sizes={image[0].fluid.sizes}
        onClick={handleImageClick}
      />
    ));

  const [Lightbox, setIndex, setIsOpen] = useLightbox(images());

  return (
    <div>
      <Helmet title={siteTitle} />
      <div>{images({ thumbnail: true })}</div>
      <Lightbox />
    </div>
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
