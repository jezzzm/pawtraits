const React = require('react');
const { RecoilRoot } = require('recoil/dist/recoil.production');

export const wrapRootElement = ({ element }) => {
  return <RecoilRoot>{element}</RecoilRoot>;
};
