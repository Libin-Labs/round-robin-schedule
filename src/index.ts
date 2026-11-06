function finite(value: number, min = -Number.MAX_VALUE, max = Number.MAX_VALUE): number {
  if (typeof value !== 'number' || !Number.isFinite(value))
    throw new TypeError('Expected finite number');
  if (value < min || value > max) throw new RangeError('Number outside supported bounds');
  return value;
}
function integer(value: number, min = 0, max = 1000000): number {
  if (!Number.isSafeInteger(value)) throw new RangeError('Expected safe integer');
  return finite(value, min, max);
}
function strictText(value: string, max = 16384): void {
  if (typeof value !== 'string') throw new TypeError('Expected string');
  if (value.length > max) throw new RangeError('Text length budget exceeded');
}
export interface RoundRobinRound {
  round: number;
  matches: { home: string; away: string }[];
  bye: string | null;
}
export function roundRobin(teams: readonly string[], doubleRound = false): RoundRobinRound[] {
  if (!Array.isArray(teams)) throw new TypeError('Expected teams');
  integer(teams.length, 2, 128);
  if (typeof doubleRound !== 'boolean') throw new TypeError('Expected boolean');
  const seen = new Set<string>();
  for (const t of teams) {
    strictText(t, 100);
    if (!t || seen.has(t)) throw new RangeError('Unique teams required');
    seen.add(t);
  }
  const ring: (string | null)[] = [...teams];
  if (ring.length % 2) ring.push(null);
  const out: RoundRobinRound[] = [];
  for (let r = 0; r < ring.length - 1; r++) {
    const matches: { home: string; away: string }[] = [];
    let bye: string | null = null;
    for (let i = 0; i < ring.length / 2; i++) {
      const a = ring[i]!,
        b = ring[ring.length - 1 - i]!;
      if (a === null || b === null) {
        bye = a ?? b;
        continue;
      }
      matches.push((r + i) % 2 === 0 ? { home: a, away: b } : { home: b, away: a });
    }
    out.push({ round: r + 1, matches, bye });
    ring.splice(1, 0, ring.pop()!);
  }
  if (doubleRound) {
    const first = [...out];
    for (const r of first)
      out.push({
        round: out.length + 1,
        bye: r.bye,
        matches: r.matches.map((m) => ({ home: m.away, away: m.home })),
      });
  }
  return out;
}
