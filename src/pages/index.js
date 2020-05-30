import React from 'react';
import { graphql } from 'gatsby';
import { Helmet } from 'react-helmet';

export default function Home({ data }) {
  const siteTitle = data.site.siteMetadata.title;
  const pawtraits = data.allContentfulPawtrait.nodes;
  console.log(data);

  return (
    <div>
      <Helmet title={siteTitle} />
      {pawtraits.map(({ petName, image }) => {
        return (
          <div key={petName}>
            <p>{petName}</p>
            {image.map((img) => (
              <img
                key={img.fluid.src}
                srcSet={img.fluid.srcSet}
                src={img.fluid.src}
                sizes={img.fluid.sizes}
              />
            ))}
          </div>
        );
      })}
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
        petName
        image {
          fluid {
            srcSet
            src
            sizes
          }
        }
      }
    }
  }
`;
