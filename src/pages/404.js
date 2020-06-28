import React from 'react';
import { Link } from 'gatsby';
import Layout from '../components/layout';

export default function ErrorPage() {
  return (
    <Layout>
      <h1>Oops! Page cannot be found</h1>
      <Link to="/">Home</Link>
    </Layout>
  );
}
