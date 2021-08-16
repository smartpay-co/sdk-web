import test from 'tape';

import Smartpay from '../build/index.js';

const CHECKOUT_URL = 'https://checkout.smartpay.co';

const TEST_PUBLIC_KEY = 'pk_test_albwlejgsekcokfpdmva';

const FAKE_SESSION = {
  id: 'cs_live_abcdef12345678',
};

test('Get Session URL', function testGetSessionURL(t) {
  t.plan(3);

  const smartpay = new Smartpay(TEST_PUBLIC_KEY, {
    checkoutURL: CHECKOUT_URL,
  });

  const sessionURL = smartpay.getSessionURL(FAKE_SESSION);

  t.ok(sessionURL.indexOf(CHECKOUT_URL) === 0);
  t.ok(sessionURL.indexOf(`key=${TEST_PUBLIC_KEY}`) > 0);
  t.ok(sessionURL.indexOf(`session=${FAKE_SESSION.id}`) > 0);
});
