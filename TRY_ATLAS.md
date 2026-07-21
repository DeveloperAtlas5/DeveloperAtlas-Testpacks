# Try the Atlas control loop in 15 minutes

Use one small Laravel change to experience the central Atlas loop:

> Define the goal → bound the instruction → inspect the change → review evidence → decide.

You do not need the private product source or a running Laravel project. This repository includes a
starting point, two prompts, a proposed diff, an evidence checklist, and a completed decision example.
Nothing in this exercise runs an AI or changes your computer automatically.

## The scenario

A teammate asks:

> Improve the status page so a reviewer knows the application is ready for a human check.

The starting code has one controller-provided label and one Blade view. Open
[`STARTING_POINT.md`](control/examples/laravel-status-label/STARTING_POINT.md) before continuing.

## Minute 0–2: state the goal

Write one sentence in your own words. A useful answer is:

> Show a short review-ready explanation on the existing status page without changing routing,
> authentication, dependencies, or unrelated UI.

That sentence describes the desired outcome, but it does not yet control the implementation.

## Minute 2–5: define the boundaries

Open the blank [`Change Contract template`](control/CHANGE_CONTRACT_TEMPLATE.md), then compare it
with the completed [`Atlas instruction`](control/examples/laravel-status-label/ATLAS_INSTRUCTION.md).

The worked contract allows only:

- `app/Http/Controllers/StatusController.php`
- `resources/views/status.blade.php`

It protects routes, authentication, dependencies, tests, layout structure, and every unrelated file.
Suggestions outside that boundary must be parked rather than implemented.

## Minute 5–7: compare the prompts

Read the [`baseline prompt`](control/examples/laravel-status-label/BASELINE_PROMPT.md) and the
[`Atlas instruction`](control/examples/laravel-status-label/ATLAS_INSTRUCTION.md).

| Prompt property | Baseline | Atlas-controlled |
| --- | --- | --- |
| Goal stated | Yes | Yes |
| Allowed files | No | Yes |
| Protected behavior | No | Yes |
| Acceptance criteria | No | Yes |
| Verification honesty | No | Yes |
| Out-of-scope ideas parked | No | Yes |

This table compares the supplied prompt text. It is not a claim about model quality or measured
market outcomes.

## Minute 7–10: inspect the proposed change

Open [`PROPOSED_PATCH.diff`](control/examples/laravel-status-label/PROPOSED_PATCH.diff). Review it as
if an AI coding tool supplied it.

Ask:

1. Did it touch only the two allowed files?
2. Did it preserve the route and controller method?
3. Is the new copy understandable without adding architecture?
4. Did it claim that tests passed?
5. Did it implement any parked suggestion?

The proposed patch is intentionally small. Small does not mean accepted; it still needs evidence.

## Minute 10–13: review evidence

Use [`VERIFICATION_CHECKLIST.md`](control/examples/laravel-status-label/VERIFICATION_CHECKLIST.md).
The repository-only exercise lets you verify scope and readability, but it does not contain a real
Laravel runtime. Therefore `php artisan test` is **not run** here.

The completed [`SAMPLE_EVIDENCE.md`](control/examples/laravel-status-label/SAMPLE_EVIDENCE.md)
records that limitation instead of inventing a passing result.

## Minute 13–15: make the human decision

Choose one:

- **Accept** only when the required evidence is sufficient.
- **Revise** when the change is promising but required evidence or behavior is incomplete.
- **Reject** when the change violates the goal, boundaries, or trust requirements.

Fill in the [`Decision Record template`](control/DECISION_RECORD_TEMPLATE.md), then compare your
choice with the worked [`DECISION_RECORD.md`](control/examples/laravel-status-label/DECISION_RECORD.md).
The worked example requests revision because runtime verification is absent. That is a complete,
honest control-loop outcome—not a failure of the exercise.

## What you just experienced

You did not ask Atlas to decide whether the code was good. You used Atlas-shaped artifacts to make
scope, evidence, uncertainty, and human authority visible.

Next:

- [Review the complete worked example](control/examples/laravel-status-label/README.md).
- [Try Control Lite in Navigator when preview access is available](https://github.com/DeveloperAtlas5/DeveloperAtlas-Public/blob/main/START_TESTING.md).
- [Explore the AI Collaboration Pack](packs/ai-collaboration/README.md).
