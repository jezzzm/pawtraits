const { spaceId, accessToken } = require('./contentful-config');

module.exports = {
  siteMetadata: {
    title: 'Sydney Pawtraits',
  },
  pathPrefix: '/sydney-pawtraits',
  plugins: [
    'gatsby-transformer-sharp',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sharp',
    'gatsby-plugin-emotion',
    {
      resolve: 'gatsby-source-contentful',
      options: {
        spaceId,
        accessToken,
      },
    },
  ],
};
