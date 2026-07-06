# Apply Phase 130A — Public Test Surface MVP

Target repo:

```txt
C:\Users\jefry\Desktop\DeveloperAtlas\DeveloperAtlas-Testpacks
```

Copy the contents of this overlay into the root of the public `developer-atlas-testpacks` repo.

Allow overwrite for README-style files.

## What this phase does

Phase 130A creates a clean public testing surface.

It does not expose the private Developer Atlas source system.

It makes the public repo answer:

```txt
Which path should I test?
```

instead of:

```txt
Which folder should I open?
```

## Public scope

Complete/testable now:

- Rookie Pack

Preview paths only:

- Beginner Preview
- Library Preview
- AI Collaboration Preview

Private for now:

- Full Pack
- Dev Pack
- internal validators
- generator tools
- complete Canon source
- private product docs

## After applying

Copy your current Rookie Pack zip into:

```txt
packs/rookie/developer-atlas-rookie-pack.zip
```

Recommended source in the private repo:

```txt
C:\Users\jefry\Desktop\DeveloperAtlas\output\share\developer-atlas-rookie-pack.zip
```

Then run:

```powershell
cd C:\Users\jefry\Desktop\DeveloperAtlas\DeveloperAtlas-Testpacks
git status
git add .
git commit -m "Add public test surface MVP"
git push
```

## Important

Do not copy the Full Pack or Dev Pack into the public repo yet.
