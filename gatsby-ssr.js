/* eslint-disable import/prefer-default-export */
const React = require('react');
const { RecoilRoot } = require('recoil/dist/recoil.production');

export const wrapRootElement = ({ element }) => <RecoilRoot>{element}</RecoilRoot>;
