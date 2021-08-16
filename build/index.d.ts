import type { KeyString, SmartPayOptions, CheckoutSessionResult } from './types';
declare class Smartpay {
    _publicKey: KeyString;
    _apiPrefix: string;
    _checkoutURL: string;
    constructor(key: KeyString, options?: SmartPayOptions);
    getSessionURL(session: CheckoutSessionResult): string;
    launchCheckout(session: CheckoutSessionResult): void;
}
export default Smartpay;
