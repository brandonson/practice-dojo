# Typescript Saddle Points

Install with `yarn install`, then run with `yarn saddle`.

## Retrospective
This one is definitely a bit over-engineered, with slightly odd design
for the `PickSearcher`. That leaked into the tests in slightly ugly ways.

I should probably have sat back for a bit, but instead I didn't
pay enough attention to the need to extract coordinates. There was also the potential
for multiple matches, which forced a change later than it should have. The original
design just wanted to extract a number from an input array, which was not at *all*
appropriate for the end goal.

If I redesigned that part I would probably make searchers that went
through the full 2D array, and then have the `TwoDimensionMatcher` unify
the results.

I do quite like the `IOBoundary` idea - plugging it into the external world is
8 lines of code, and those 8 lines are the only part that requires manual testing.
Manually testing `processIO` in the input handling would be easy, but tedious, because
there's 25 numbers of input across 5 lines for most tests, plus manually checking the
results.
