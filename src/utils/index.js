/* eslint-disable import/prefer-default-export */
export const hasAnyProperty = (obj, properties) => {
  const propertyArray = typeof properties === 'string' ? [properties] : properties;

  return propertyArray.some(property => Object.keys(obj).includes(property));
};
