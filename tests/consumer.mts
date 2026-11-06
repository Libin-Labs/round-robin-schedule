import { roundRobin } from '@lp-labs/round-robin-schedule';
if (roundRobin(['a', 'b', 'c']).length !== 3) throw new Error('Schedule');
// @ts-expect-error invalid argument must be rejected by declarations
roundRobin([1, 2]);
