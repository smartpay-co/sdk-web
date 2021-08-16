import type { KeyString } from './types';

const publicKeyRegExp = /^pk_(test|live)_[0-9a-zA-Z]+$/;

export const isValidPublicApiKey = (apiKey: KeyString) => {
  return publicKeyRegExp.test(apiKey);
};
