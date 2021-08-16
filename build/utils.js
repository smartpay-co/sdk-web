var publicKeyRegExp = /^pk_(test|live)_[0-9a-zA-Z]+$/;
export var isValidPublicApiKey = function (apiKey) {
    return publicKeyRegExp.test(apiKey);
};
