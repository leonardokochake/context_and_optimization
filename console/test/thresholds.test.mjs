import { test } from 'node:test';
import assert from 'node:assert/strict';
import { THRESHOLDS, statusFor } from '../src/thresholds.mjs';

test('CPU critical threshold is 80 percent', () => {
  assert.equal(THRESHOLDS.cpu.crit, 80);
  assert.equal(statusFor(79.9, THRESHOLDS.cpu), 'warn');
  assert.equal(statusFor(80, THRESHOLDS.cpu), 'crit');
});

test('below warn is ok', () => {
  assert.equal(statusFor(30, { warn: 65, crit: 80 }), 'ok');
});

test('between warn and crit is warn', () => {
  assert.equal(statusFor(70, { warn: 65, crit: 80 }), 'warn');
});

test('at or above crit is crit', () => {
  assert.equal(statusFor(80, { warn: 65, crit: 80 }), 'crit');
  assert.equal(statusFor(99, { warn: 65, crit: 80 }), 'crit');
});

test('boundary: exactly warn is warn', () => {
  assert.equal(statusFor(65, { warn: 65, crit: 80 }), 'warn');
});
