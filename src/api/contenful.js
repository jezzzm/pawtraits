import * as contentful from 'contentful-management';

const client = contentful.createClient({
  accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN,
})

export const requestPawtrait = async ({
  requesterName,
  requesterEmail,
  requesterPhone,
  petName,
  breed,
  description,
  referenceImages,
  rushed,
  extraPrints,
  additionalComments
}) => {
  try {
    const space = await client.getSpace(process.env.CONTENTFUL_SPACE_ID)
    const post = await space.createEntry('pawtraitRequest', {
      fields: {
        requesterName: {
          'en-US': requesterName
        },
        requesterEmail: {
          'en-US': requesterEmail
        },
        requesterPhone: {
          'en-US': requesterPhone
        },
        petName: {
          'en-US': petName
        },
        breed: {
          'en-US': breed
        },
        description: {
          'en-US': description
        },
        referenceImages: {
          'en-US': referenceImages
        },
        rushed: {
          'en-US': rushed
        },
        extraPrints: {
          'en-US': extraPrints
        },
        additionalComments: {
          'en-US': additionalComments
        },
      }
    })
    console.log('succeeded: ', post)
  } catch (err) {
    console.log('failed :', err)
  }
}
