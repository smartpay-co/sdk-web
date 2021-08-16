import qs from 'query-string';
import { isValidPublicApiKey } from './utils.js';
var API_PREFIX = 'https://api.smartpay.co/checkout';
var CHECKOUT_URL = 'https://checkout.smartpay.ninja';
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
        this._apiPrefix = options.apiPrefix || API_PREFIX;
        this._checkoutURL = options.checkoutURL || CHECKOUT_URL;
    }
    Smartpay.prototype.getSessionURL = function (session) {
        if (!session) {
            throw new Error('Checkout Session is required.');
        }
        if (!this._publicKey) {
            throw new Error('Public API Key is required.');
        }
        var params = {
            session: session.id,
            key: this._publicKey,
        };
        return qs.stringifyUrl({
            url: this._checkoutURL + "/login",
            query: params,
        });
    };
    Smartpay.prototype.launchCheckout = function (session) {
        if (!session) {
            throw new Error('Session required');
        }
        document.location.href = session.checkoutURL || this.getSessionURL(session);
    };
    return Smartpay;
}());
export default Smartpay;
