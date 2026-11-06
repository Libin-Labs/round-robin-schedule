# @lp-labs/round-robin-schedule

Deterministic single/double round-robin fixture scheduling.

Original, standalone MIT TypeScript implementation with **zero runtime or peer dependencies**. ESM/CommonJS exports and separate declarations; Node18+ and compatible ES2022 browsers. No service, filesystem, network, clock or browser globals accessed on import. Compiler/formatter dependencies are development-only.

## Install

```sh
npm install @lp-labs/round-robin-schedule
```

## Working example

```js
import { roundRobin } from '@lp-labs/round-robin-schedule';
if (roundRobin(['a', 'b', 'c']).length !== 3) throw new Error('Schedule');
```

CommonJS: `const api = require('@lp-labs/round-robin-schedule')`.

## Behavior, customization and limits

roundRobin(teams,doubleRound=false) uses circle rotation, team IDs unique nonempty<=100chars,2..128. Returns1-based rounds, {home,away} matches and bye ID or null. Odd team count gets one bye per round; double round adds mirrored home/away fixtures in same order. No venue, rest, travel, time scheduling or balanced home streak guarantees. O(teams squared), pure arrays, no randomization.

Use the explicit function arguments and public types below to customize the documented behavior. There are no hidden environment settings or sibling-library requirements. Array inputs must be dense; sparse entries are invalid. Inputs are validated before a successful result is returned. Outputs do not mutate caller-owned inputs. Hostile proxies/getters and concurrent mutation are outside the contract.

## Errors and integration

Invalid data never produces an empty success-shaped substitute. TypeError reports incompatible runtime types/nonfinite numbers; RangeError reports unsupported ranges, invalid syntax, inconsistent states and exceeded budgets. Functions that explicitly return null, false or empty arrays describe those legitimate outcomes above. Errors propagate to callers; UI applications should catch at their boundary and visibly notify users. Numerical calculations use JavaScript IEEE754 unless the API explicitly uses bigint; compare approximate numerical results with application-appropriate tolerances.

## Complete public API

```ts
export interface RoundRobinRound {
  round: number;
  matches: {
    home: string;
    away: string;
  }[];
  bye: string | null;
}
export declare function roundRobin(
  teams: readonly string[],
  doubleRound?: boolean,
): RoundRobinRound[];
```

## Performance and portability

Complexity and resource ceilings are specified above. Buffered synchronous algorithms do not create workers or timers; callers can move expensive work to their own worker. Limits are enforced, not silently truncated. No runtime imports from any other library. No compatibility or completeness claims beyond the stated scope.

## Support

If this library is useful to you, consider supporting its maintenance with a [donation via PayPal](https://www.paypal.me/LibinPrasanth).

## Author

Created by [Libin Prasanth](https://www.linkedin.com/in/libinprasanth/). Connect on LinkedIn for updates and discussion.
