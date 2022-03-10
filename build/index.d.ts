import type { KeyString, SmartPayOptions, CheckoutSessionResult, GetSessionUrlOptions } from './types';
declare class Smartpay {
    _publicKey: KeyString;
    _checkoutURL: string;
    constructor(key: KeyString, options?: SmartPayOptions);
    static getSessionURL(session: CheckoutSessionResult, options?: GetSessionUrlOptions): string;
    static launchCheckout(session: CheckoutSessionResult, options?: {}): void;
}
export default Smartpay;
