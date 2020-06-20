import React from 'react';
import { graphql, Link } from 'gatsby';
import { Helmet } from 'react-helmet';
import Layout from '../components/layout';

export default function ErrorPage({ data }) {
  const siteTitle = data.site.siteMetadata.title;

  return (
    <Layout>
      <Helmet title={siteTitle} />
      <h1>Oops! Page cannot be found</h1>
      <Link to="/">Home</Link>
    </Layout>
  );
}

export const pageQuery = graphql`
  query ErrorQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
