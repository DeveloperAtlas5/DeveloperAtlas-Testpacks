# Atlas Control Lite

Control Lite is a local browser preview of the Developer Atlas control loop:

> Prepare → Instruct → Inspect → Evidence → Decide → Export

## Run it

1. Download or clone this repository.
2. Open `control-lite/index.html` in a modern browser, or serve the repository with `node scripts/serve-static.mjs`.
3. Load an Accept, Revise, or Reject example—or define your own bounded change.
4. Review the generated instruction, supplied changed-file list, evidence states, and human decision.
5. Export one combined `ATLAS_CHANGE_RECORD.md` or the four separate artifacts.

The session autosaves in browser `localStorage` and can be exported as JSON for later editing.

## Trust boundary

Control Lite has no backend, telemetry, account, AI connection, Git access, or command execution. It compares the paths a user supplies and generates reviewable local files. It does not prove that a patch is correct or that a command ran. A human remains responsible for scope, evidence, and the final decision.
