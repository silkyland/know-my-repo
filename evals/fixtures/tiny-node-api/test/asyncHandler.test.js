const test = require('node:test');
const assert = require('node:assert');
const asyncHandler = require('../src/lib/asyncHandler');

test('asyncHandler forwards rejected errors to next', async () => {
  const err = new Error('boom');
  const handler = asyncHandler(async () => {
    throw err;
  });
  let captured;
  await handler({}, {}, (e) => {
    captured = e;
  });
  assert.strictEqual(captured, err);
});

test('asyncHandler resolves normally without calling next', async () => {
  const handler = asyncHandler(async (req, res) => {
    res.called = true;
  });
  const res = {};
  let nextCalled = false;
  await handler({}, res, () => {
    nextCalled = true;
  });
  assert.strictEqual(res.called, true);
  assert.strictEqual(nextCalled, false);
});
