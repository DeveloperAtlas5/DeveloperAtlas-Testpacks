import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'

const root = process.cwd()
const output = path.join(root, 'dist', 'pages')

await rm(output, { recursive: true, force: true })
await mkdir(output, { recursive: true })

await cp(path.join(root, 'control-lite'), path.join(output, 'control-lite'), { recursive: true })
await cp(path.join(root, 'compendium-preview'), path.join(output, 'compendium-preview'), { recursive: true })

const controlIndexPath = path.join(output, 'control-lite', 'index.html')
const controlIndex = await readFile(controlIndexPath, 'utf8')
await writeFile(
  controlIndexPath,
  controlIndex.replace(
    '../docs/getting-started/TRY_ATLAS.md',
    'https://github.com/DeveloperAtlas5/DeveloperAtlas-Public/blob/main/docs/getting-started/TRY_ATLAS.md',
  ),
)

const landing = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="description" content="Developer Atlas public interactive previews.">
  <title>Developer Atlas — Public Preview</title>
  <style>
    :root { color-scheme: light dark; font-family: Inter, ui-sans-serif, system-ui, sans-serif; }
    body { margin: 0; min-height: 100vh; display: grid; place-items: center; background: #11131a; color: #f7f7fb; }
    main { width: min(760px, calc(100% - 2rem)); }
    p { line-height: 1.65; color: #c9cad4; }
    .eyebrow { color: #a998ff; font-weight: 800; letter-spacing: .1em; font-size: .78rem; }
    h1 { font-size: clamp(2.2rem, 6vw, 4.5rem); line-height: 1.02; margin: .4rem 0 1rem; }
    .cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1rem; margin-top: 2rem; }
    a { display: block; padding: 1.25rem; border: 1px solid #3c3e4c; border-radius: 1rem; color: inherit; text-decoration: none; background: #1b1e28; }
    a:hover, a:focus-visible { border-color: #a998ff; transform: translateY(-2px); }
    strong { display: block; font-size: 1.15rem; margin-bottom: .35rem; }
    span { color: #c9cad4; line-height: 1.5; }
  </style>
</head>
<body>
  <main>
    <p class="eyebrow">HUMAN-CONTROLLED AI DEVELOPMENT</p>
    <h1>Try the public Atlas control loop.</h1>
    <p>Define a bounded change, inspect supplied paths, record observed evidence, make the human decision, and open the related evidence-mapped learning node.</p>
    <div class="cards">
      <a href="control-lite/index.html"><strong>Start with Control Lite</strong><span>Prepare → Instruct → Inspect → Evidence → Decide → Export.</span></a>
      <a href="compendium-preview/index.html"><strong>Browse the Compendium</strong><span>Explore six allowlisted public nodes with sources and limitations visible.</span></a>
    </div>
  </main>
</body>
</html>
`

await writeFile(path.join(output, 'index.html'), landing)
await writeFile(path.join(output, '.nojekyll'), '')

console.log(`[atlas] Built integrated Pages preview at ${path.relative(root, output)}.`)
