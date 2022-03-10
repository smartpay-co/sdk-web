import qs from 'query-string';
import { isValidPublicApiKey } from './utils.js';
var CHECKOUT_URL = 'https://checkout.smartpay.co';
var Smartpay = /** @class */ (function () {
    function Smartpay(key, options) {
        if (options === void 0) { options = {}; }
        if (!key) {
            throw new Error('Secret API Key is required.');
        }
        if (!isValidPublicApiKey(key)) {
            throw new Error('Public API Key is invalid.');
        }
        this._publicKey = key;
        this._checkoutURL = options.checkoutURL || CHECKOUT_URL;
    }
    Smartpay.getSessionURL = function (session, options) {
        if (options === void 0) { options = {}; }
        if (!session) {
            throw new Error('Checkout Session is required.');
        }
        var promotionCode = options.promotionCode;
        var params = {};
        if (promotionCode) {
            params['promotion-code'] = promotionCode;
        }
        return qs.stringifyUrl({
            url: session.url,
            query: params,
        });
    };
    Smartpay.launchCheckout = function (session, options) {
        if (options === void 0) { options = {}; }
        if (!session) {
            throw new Error('Session required');
        }
        document.location.href = Smartpay.getSessionURL(session, options);
    };
    return Smartpay;
}());
export default Smartpay;
