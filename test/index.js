import test from 'tape';

import Smartpay from '../build/index.js';

const CHECKOUT_URL = 'https://checkout.smartpay.co';

const TEST_PUBLIC_KEY = 'pk_test_albwlejgsekcokfpdmva';

const FAKE_ID = 'cs_live_abcdef12345678';
const FAKE_SESSION = {
  id: FAKE_ID,
  url: `${CHECKOUT_URL}/${FAKE_ID}`,
};

test('Get Session URL', function testGetSessionURL(t) {
  t.plan(2);

  const sessionURL = Smartpay.getSessionURL(FAKE_SESSION);

  t.ok(sessionURL.indexOf(CHECKOUT_URL) === 0);
  t.ok(sessionURL.indexOf(`${FAKE_ID}`) > 0);
});
