const React = require('react');
const { RecoilRoot } = require('recoil');

export const wrapRootElement = ({ element }) => {
  return <RecoilRoot>{element}</RecoilRoot>;
};
