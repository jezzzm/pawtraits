const dotenv = require('dotenv');

const { parsed } = dotenv.config({ path: '.env' });

const options = {
  spaceId: parsed.CONTENTFUL_SPACE_ID,
  accessToken: parsed.CONTENTFUL_ACCESS_TOKEN,
  managementToken: parsed.CONTENTFUL_MANAGEMENT_TOKEN,
};

const { spaceId, accessToken } = options;

if (!options.spaceId || !options.accessToken) {
  throw new Error(
    'Contentful spaceId and the access token need to be provided.'
  );
}

module.exports = options;