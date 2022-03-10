import qs from 'query-string';

import type {
  KeyString,
  SmartPayOptions,
  CheckoutSessionResult,
  GetSessionUrlOptions,
  SessionUrlParams,
} from './types';
import { isValidPublicApiKey } from './utils.js';

const CHECKOUT_URL = 'https://checkout.smartpay.co';

class Smartpay {
  _publicKey: KeyString;
  _checkoutURL: string;

  constructor(key: KeyString, options: SmartPayOptions = {}) {
    if (!key) {
      throw new Error('Secret API Key is required.');
    }

    if (!isValidPublicApiKey(key)) {
      throw new Error('Public API Key is invalid.');
    }

    this._publicKey = key;
    this._checkoutURL = options.checkoutURL || CHECKOUT_URL;
  }

  static getSessionURL(
    session: CheckoutSessionResult,
    options: GetSessionUrlOptions = {}
  ): string {
    if (!session) {
      throw new Error('Checkout Session is required.');
    }

    const { promotionCode } = options;
    const params: SessionUrlParams = {};

    if (promotionCode) {
      params['promotion-code'] = promotionCode;
    }

    return qs.stringifyUrl({
      url: session.url,
      query: params,
    });
  }

  static launchCheckout(session: CheckoutSessionResult, options = {}) {
    if (!session) {
      throw new Error('Session required');
    }

    document.location.href = Smartpay.getSessionURL(session, options);
  }
}

export default Smartpay;
