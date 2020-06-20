import * as contentful from 'contentful-management';

const client = contentful.createClient({
  accessToken: process.env.GATSBY_CONTENTFUL_MANAGEMENT_TOKEN,
});

export const requestPawtrait = async ({
  requesterName,
  requesterEmail,
  requesterPhone = undefined,
  petName,
  breed = undefined,
  description = undefined,
  referenceImage = undefined,
  rushed,
  extraPrints,
  additionalComments = undefined,
  quotedPrice,
  size,
}) => {
  try {
    const space = await client.getSpace(process.env.GATSBY_CONTENTFUL_SPACE_ID);
    const env = await space.getEnvironment('master');

    let newAsset = undefined;
    const file = referenceImage.length ? referenceImage[0] : null;
    if (file) {
      const buffer = await file.arrayBuffer();
      const imagePost = await env.createAssetFromFiles({
        fields: {
          title: {
            'en-US': `${petName} - ${requesterName}`,
          },
          description: {
            'en-US': `Uploaded by ${requesterName} for their pet ${petName}. Their email is ${requesterEmail}${
              requesterPhone
                ? ` and can be contacted at ${requesterPhone}`
                : '.'
            } `,
          },
          file: {
            'en-US': {
              contentType: file.type,
              fileName: file.name,
              file: buffer,
            },
          },
        },
      });

      await imagePost.processForAllLocales();
      newAsset = {
        referenceImages: {
          'en-US': [
            {
              sys: {
                id: imagePost.sys.id,
                linkType: 'Asset',
                type: 'Link',
              },
            },
          ],
        },
      };
    }

    const fields = {
      requesterName: {
        'en-US': requesterName,
      },
      requesterEmail: {
        'en-US': requesterEmail,
      },
      requesterPhone: {
        'en-US': requesterPhone,
      },
      petName: {
        'en-US': petName,
      },
      breed: {
        'en-US': breed,
      },
      description: {
        'en-US': description,
      },
      rushed: {
        'en-US': rushed,
      },
      size: {
        'en-US': size,
      },
      additionalComments: {
        'en-US': additionalComments,
      },
      quotedPrice: {
        'en-US': quotedPrice,
      },
      ...newAsset,
    };

    const post = await env.createEntry('pawtraitRequest', {
      fields,
    });
  } catch (err) {
    console.log('failed :', err);
  }
};
