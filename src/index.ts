import qs from 'query-string';

import type {
  KeyString,
  SmartPayOptions,
  CheckoutSessionResult,
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

  getSessionURL(session: CheckoutSessionResult): string {
    if (!session) {
      throw new Error('Checkout Session is required.');
    }

    if (!this._publicKey) {
      throw new Error('Public API Key is required.');
    }

    const params = {
      'session-id': session.id,
      'public-key': this._publicKey,
    };

    return qs.stringifyUrl({
      url: `${this._checkoutURL}/login`,
      query: params,
    });
  }

  launchCheckout(session: CheckoutSessionResult) {
    if (!session) {
      throw new Error('Session required');
    }

    document.location.href = session.checkoutURL || this.getSessionURL(session);
  }
}

export default Smartpay;
