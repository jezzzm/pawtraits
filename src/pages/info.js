import React from 'react';
import { graphql } from 'gatsby';
import { useRecoilState } from 'recoil';
import * as styles from '../styles/info.style';
import * as shared from '../styles/shared.style';
import Layout from '../components/layout';
import formOpen from '../recoil/form-open';
import facebook from '../../static/facebook.png';
import instagram from '../../static/instagram.png';

export default function Info({ data }) {
  const { description, fluid: img } = data.contentfulAsset;

  const [, setFormOpen] = useRecoilState(formOpen);

  return (
    <Layout>
      <div css={[styles.inner, shared.modalInnerWrapper]}>
        <div css={styles.copy}>
          <h2>
            <span role="img" aria-label="artist emoji">
              👩‍🎨
            </span>
            {' '}
            The Artist
          </h2>
          <p>
            I’m Nicki, an artist living and working in Sydney, specialising in
            highly detailed pet portraiture. I love drawing and animals, and
            through my Pawtraits I am lucky enough to combine the two. I
            strongly believe in a pet’s ability to enrich our lives and it gives
            me such pleasure to embrace that with my clients. If you’re anything
            like me, your pet is an important member of your family – what
            better way to celebrate that special bond you share!
          </p>
          <img
            css={styles.image}
            src={img.src}
            srcSet={img.srcSet}
            sizes={img.sizes}
            title={description}
            alt={description}
          />
          <p>
            A Pawtrait is a great gift, monument or simply a beautiful work of
            art. You will enjoy a lifetime of memories with it on your wall. I
            have high standards and will stop at nothing to ensure I have
            perfectly captured your pal.
          </p>
          <p>
            Please have a browse of the website, and if you like, commission a
            Pawtrait of your own.
          </p>
          <button
            css={[shared.ctaButton(), styles.button]}
            type="button"
            onClick={() => {
              setFormOpen(true);
            }}
          >
            Get your own
          </button>
          <h2>
            <span role="img" aria-label="pencil emoji">
              ✎
            </span>
            {' '}
            The Process
          </h2>
          <h4>Paper</h4>
          <p>
            I use Fabriano Artistico hot pressed 300gsm paper, an acid free
            paper which guarantees long conservation and inalterability over
            time.
          </p>
          <h4>Pencils</h4>
          <p>
            I use a combination of Faber-Castell Polychromos and Prismacolor
            pencils.
          </p>
          <h1 css={styles.hi}>
            Say hi!
            {' '}
            <span role="img" aria-label="wave emoji">
              &#128075;
            </span>
          </h1>
          <a
            href="mailto:woof@sydneypawtraits.com"
            alt="Email Sydney Pawtraits"
            css={styles.email}
          >
            woof@sydneypawtraits.com
          </a>
          <div css={styles.socials}>
            <a
              href="https://www.instagram.com/sydneypawtraits/?hl=en"
              alt="Sydney Pawtraits on Instagram"
              target="_blank"
              rel="noreferrer"
              css={styles.icon}
            >
              <img src={instagram} alt="Instagram Logo" />
            </a>
            <a
              href="https://facebook.com/sydneypawtraits"
              alt="Sydney Pawtraits on Facebook"
              target="_blank"
              rel="noreferrer"
              css={styles.icon}
            >
              <img src={facebook} alt="Facebook Logo" />
            </a>
          </div>
        </div>
      </div>
      <p css={styles.copyright}>
        Copyright &copy;
        {' '}
        {new Date().getFullYear()}
        {' '}
        Sydney Pawtraits. All rights
        reserved.
      </p>
    </Layout>
  );
}

export const pageQuery = graphql`
  query AboutQuery {
    contentfulAsset(title: { eq: "nicki" }) {
      fluid(
        cropFocus: TOP
        maxHeight: 420
        maxWidth: 360
        resizingBehavior: CROP
      ) {
        sizes
        src
      }
      description
    }
  }
`;
