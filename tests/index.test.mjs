import assert from 'node:assert/strict';
import test from 'node:test';
import * as api from '../dist/esm/index.js';
test('two-team reference', () => {
  assert.deepEqual(api.roundRobin(['A', 'B']), [
    { round: 1, matches: [{ home: 'A', away: 'B' }], bye: null },
  ]);
});
test('odd team byes', () => {
  const r = api.roundRobin(['a', 'b', 'c']);
  assert.equal(r.length, 3);
  assert.deepEqual(r.map((x) => x.bye).sort(), ['a', 'b', 'c']);
});
test('double mirror', () => {
  const r = api.roundRobin(['a', 'b'], true);
  assert.deepEqual(r[1].matches, [{ home: 'b', away: 'a' }]);
});
test('input ownership', () => {
  const t = ['a', 'b', 'c', 'd'];
  api.roundRobin(t);
  assert.deepEqual(t, ['a', 'b', 'c', 'd']);
});
test('invalid teams and modes', () => {
  assert.throws(() => api.roundRobin(['a', 'a']));
  assert.throws(() => api.roundRobin(['a']));
  assert.throws(() => api.roundRobin(['a', 'b'], 'yes'));
});
test('pair coverage oracle', () => {
  for (let n = 2; n <= 30; n++) {
    const t = Array.from({ length: n }, (_, i) => String(i)),
      r = api.roundRobin(t),
      pairs = new Set();
    for (const round of r) {
      const active = round.matches.flatMap((x) => [x.home, x.away]);
      assert.equal(new Set(active).size, active.length);
      for (const m of round.matches) pairs.add([m.home, m.away].sort().join(':'));
    }
    assert.equal(pairs.size, (n * (n - 1)) / 2);
  }
});
