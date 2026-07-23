window.ATLAS_COMPENDIUM_DATA = {
  "schemaVersion": "1.0.0",
  "generatedFrom": "allowlisted public node and evidence files only",
  "nodeCount": 6,
  "nodes": [
    {
      "id": "CANON-BLADE-VIEW-001",
      "title": "Blade View",
      "summary": "A Blade view is a Laravel template, normally stored under resources/views, that compiles to PHP and renders presentation output from supplied data.",
      "tags": [
        "Laravel",
        "Blade",
        "view"
      ],
      "versionScope": [
        "Laravel 13.x"
      ],
      "reviewedAt": "2026-07-12",
      "sourceCount": 2,
      "verificationCount": 3,
      "independentReview": "pending",
      "sources": [
        {
          "title": "Blade Templates",
          "publisher": "Laravel",
          "url": "https://laravel.com/docs/13.x/blade",
          "checkedAt": "2026-07-12"
        },
        {
          "title": "Views",
          "publisher": "Laravel",
          "url": "https://laravel.com/docs/13.x/views",
          "checkedAt": "2026-07-12"
        }
      ],
      "limitations": [
        "Escaped {{ }} output is safer for untrusted text than raw {!! !!} output.",
        "A Blade view is one response representation; other response types do not require Blade.",
        "Blade permits PHP, but request handling and business rules should remain outside presentation templates.",
        "Independent human review remains required before promotion to gold."
      ],
      "sourcePath": "content/nodes/gold/CANON-BLADE-VIEW-001.md",
      "sourceUrl": "https://github.com/DeveloperAtlas5/DeveloperAtlas-Public/blob/main/content/nodes/gold/CANON-BLADE-VIEW-001.md",
      "evidenceUrl": "https://github.com/DeveloperAtlas5/DeveloperAtlas-Public/blob/main/content/nodes/evidence/CANON-BLADE-VIEW-001.evidence.json",
      "html": "<aside class=\"evidence-banner\"><p><strong>Evidence status — public preview</strong></p><p>Primary-source mapping: <strong>completed with AI assistance</strong> on 2026-07-12.</p><p>Independent human review: <strong>pending</strong>. Publication status: <strong>public preview, not certification</strong>.</p><p>Sources: 2 (<a href=\"https://laravel.com/docs/13.x/blade\" target=\"_blank\" rel=\"noreferrer\">Blade Templates</a>, <a href=\"https://laravel.com/docs/13.x/views\" target=\"_blank\" rel=\"noreferrer\">Views</a>). Automated structure and evidence checks: <strong>passed</strong>.</p><p>Verification designs: 3. Version scope: Laravel 13.x.</p><p>Known limitations remain explicit in this node and in the <a href=\"https://github.com/DeveloperAtlas5/DeveloperAtlas-Public/blob/main/docs/public/known-limitations.md\" target=\"_blank\" rel=\"noreferrer\">public limitations</a>.</p></aside>\n<h2 id=\"quick-answer\">Quick answer</h2>\n<p>A Blade view is a Laravel template, normally stored under <code>resources/views</code>, that compiles to PHP and renders presentation output from supplied data.</p>\n<h2 id=\"where-it-fits-in-the-flow\">Where it fits in the flow</h2>\n<p>Blade is one possible representation near the end of the request path. A route or controller returns a view with data; Blade renders HTML; Laravel places that HTML in the outgoing response.</p>\n<p><code>controller view data -&gt; Blade template -&gt; rendered HTML -&gt; response</code></p>\n<h2 id=\"mental-model\">Mental model</h2>\n<p>Think of Blade as a document template. HTML supplies the structure, Blade directives control simple presentation branches and loops, and escaped echo syntax fills values into the page. The template presents decisions made elsewhere rather than owning request or business logic.</p>\n<h2 id=\"working-example\">Working example</h2>\n<pre><code class=\"language-blade\">@extends(&#39;layouts.app&#39;)\n\n@section(&#39;content&#39;)\n    &lt;h1&gt;Items&lt;/h1&gt;\n\n    &lt;ul&gt;\n        @forelse ($items as $item)\n            &lt;li&gt;{{ $item-&gt;name }}&lt;/li&gt;\n        @empty\n            &lt;li&gt;No items yet.&lt;/li&gt;\n        @endforelse\n    &lt;/ul&gt;\n@endsection</code></pre>\n<p>The controller must pass an <code>items</code> value. <code>{{ $item-&gt;name }}</code> escapes the displayed text by default.</p>\n<h2 id=\"what-you-can-safely-change\">What you can safely change</h2>\n<ul><li>Change labels, layout markup, and simple display conditions while preserving the view-data contract.</li><li>Rename a Blade variable together with the controller key that supplies it.</li><li>Add a route helper only after confirming the named route exists.</li><li>Prefer escaped <code>{{ }}</code> output for untrusted values; use raw output only with an explicit trusted-content reason.</li></ul>\n<h2 id=\"common-failure-and-recovery\">Common failure and recovery</h2>\n<ul><li><strong>Undefined variable.</strong> Compare the controller&#39;s view-data key with the Blade variable name.</li><li><strong>View not found.</strong> Translate the dot name, such as <code>items.index</code>, to <code>resources/views/items/index.blade.php</code> and confirm the path.</li><li><strong>The list renders empty.</strong> Inspect the data passed by the controller and provide an intentional empty state.</li><li><strong>HTML contains unsafe or unexpected markup.</strong> Replace raw <code>{!! !!}</code> output with escaped <code>{{ }}</code> unless the content is explicitly trusted and sanitized.</li></ul>\n<h2 id=\"how-to-verify-it\">How to verify it</h2>\n<ul><li><code>V-BLADE-VIEW-001</code>: Render the view with known controller data and confirm the expected escaped values appear in the HTML.</li><li><code>V-BLADE-VIEW-002</code>: Render an empty collection and confirm the intended empty-state message appears without broken markup.</li><li><code>V-BLADE-VIEW-003</code>: Inspect the template and confirm request handling, database queries, and business rules have not moved into Blade.</li></ul>\n<h2 id=\"boundaries-and-version-notes\">Boundaries and version notes</h2>\n<ul><li>Reviewed for Laravel 13.x; <code>.blade.php</code>, <code>resources/views</code>, compilation, directives, and escaped echo behavior are stable in this scope.</li><li>Escaped <code>{{ }}</code> and raw <code>{!! !!}</code> output have different cross-site-scripting boundaries.</li><li>A Blade view is one response representation; JSON, redirects, files, and empty responses do not require Blade.</li><li>Blade permits PHP, but request handling and business rules should remain outside presentation templates.</li></ul>\n<h2 id=\"ai-steering-rule\">AI steering rule</h2>\n<p>AI should inspect the controller&#39;s view name and data contract plus the existing layout before editing Blade, preserve escaped output by default, and avoid moving request handling or business logic into the template.</p>\n<h2 id=\"human-readability-rule\">Human readability rule</h2>\n<p>Keep HTML structure visible, indent Blade directives consistently, give empty and error states explicit markup, and name variables after the data the user sees.</p>\n<h2 id=\"related-nodes\">Related nodes</h2>\n<ul><li>CANON-CONTROLLER-001</li><li>CANON-ROUTE-001</li><li>CANON-LARAVEL-REQUEST-LIFECYCLE-001</li><li>CANON-CRUD-001</li></ul>\n<h2 id=\"evidence-status\">Evidence status</h2>\n<p>Primary-source reviewed on 2026-07-12. Independent human review and promotion are pending. See <a href=\"https://github.com/DeveloperAtlas5/DeveloperAtlas-Public/blob/main/content/nodes/evidence/CANON-BLADE-VIEW-001.evidence.json\" target=\"_blank\" rel=\"noreferrer\">`../evidence/CANON-BLADE-VIEW-001.evidence.json`</a> for claim mappings, source locations, limitations, and verification contracts.</p>"
    },
    {
      "id": "CANON-CONTROLLER-001",
      "title": "Controller",
      "summary": "A Laravel controller groups related request-handling methods. When a controller route matches, Laravel invokes the configured public action, which coordinates the work needed to return a response.",
      "tags": [
        "Laravel",
        "controller",
        "action"
      ],
      "versionScope": [
        "Laravel 13.x"
      ],
      "reviewedAt": "2026-07-12",
      "sourceCount": 3,
      "verificationCount": 3,
      "independentReview": "pending",
      "sources": [
        {
          "title": "Controllers",
          "publisher": "Laravel",
          "url": "https://laravel.com/docs/13.x/controllers",
          "checkedAt": "2026-07-12"
        },
        {
          "title": "Routing",
          "publisher": "Laravel",
          "url": "https://laravel.com/docs/13.x/routing",
          "checkedAt": "2026-07-12"
        },
        {
          "title": "Validation",
          "publisher": "Laravel",
          "url": "https://laravel.com/docs/13.x/validation",
          "checkedAt": "2026-07-12"
        }
      ],
      "limitations": [
        "Controllers are optional; routes may use closures or invokable classes.",
        "A controller does not automatically validate, authorize, or persist data.",
        "Controllers do not have to extend Laravel's base controller class.",
        "Independent human review remains required before promotion to gold."
      ],
      "sourcePath": "content/nodes/gold/CANON-CONTROLLER-001.md",
      "sourceUrl": "https://github.com/DeveloperAtlas5/DeveloperAtlas-Public/blob/main/content/nodes/gold/CANON-CONTROLLER-001.md",
      "evidenceUrl": "https://github.com/DeveloperAtlas5/DeveloperAtlas-Public/blob/main/content/nodes/evidence/CANON-CONTROLLER-001.evidence.json",
      "html": "<aside class=\"evidence-banner\"><p><strong>Evidence status — public preview</strong></p><p>Primary-source mapping: <strong>completed with AI assistance</strong> on 2026-07-12.</p><p>Independent human review: <strong>pending</strong>. Publication status: <strong>public preview, not certification</strong>.</p><p>Sources: 3 (<a href=\"https://laravel.com/docs/13.x/controllers\" target=\"_blank\" rel=\"noreferrer\">Controllers</a>, <a href=\"https://laravel.com/docs/13.x/routing\" target=\"_blank\" rel=\"noreferrer\">Routing</a>, <a href=\"https://laravel.com/docs/13.x/validation\" target=\"_blank\" rel=\"noreferrer\">Validation</a>). Automated structure and evidence checks: <strong>passed</strong>.</p><p>Verification designs: 3. Version scope: Laravel 13.x.</p><p>Known limitations remain explicit in this node and in the <a href=\"https://github.com/DeveloperAtlas5/DeveloperAtlas-Public/blob/main/docs/public/known-limitations.md\" target=\"_blank\" rel=\"noreferrer\">public limitations</a>.</p></aside>\n<h2 id=\"quick-answer\">Quick answer</h2>\n<p>A Laravel controller groups related request-handling methods. When a controller route matches, Laravel invokes the configured public action, which coordinates the work needed to return a response.</p>\n<h2 id=\"where-it-fits-in-the-flow\">Where it fits in the flow</h2>\n<p>The controller comes after route matching and route middleware. It receives request context, may validate or authorize input and call models or services, then returns a view, redirect, JSON response, or another supported response.</p>\n<p><code>matched route -&gt; controller action -&gt; application work -&gt; response</code></p>\n<h2 id=\"mental-model\">Mental model</h2>\n<p>Think of a controller action as a coordinator at a service desk. It accepts a specific request, sends work to the right place, and returns the result. It should make the sequence visible without becoming the home for every business rule.</p>\n<h2 id=\"working-example\">Working example</h2>\n<pre><code class=\"language-php\">namespace App\\Http\\Controllers;\n\nuse App\\Models\\Item;\nuse Illuminate\\View\\View;\n\nclass ItemController extends Controller\n{\n    public function index(): View\n    {\n        $items = Item::query()-&gt;latest()-&gt;get();\n\n        return view(&#39;items.index&#39;, [&#39;items&#39; =&gt; $items]);\n    }\n}</code></pre>\n<p>The route selects <code>index()</code>. The action obtains the items and passes them to <code>resources/views/items/index.blade.php</code> under the name <code>$items</code>.</p>\n<h2 id=\"what-you-can-safely-change\">What you can safely change</h2>\n<ul><li>Change one action&#39;s query, validation, or response while keeping its route contract visible.</li><li>Rename passed view data together with the Blade variable that receives it.</li><li>Rename an action together with the route that references it.</li><li>Extract business logic only when the action has a clear, repeated responsibility that benefits from a separate class.</li></ul>\n<h2 id=\"common-failure-and-recovery\">Common failure and recovery</h2>\n<ul><li><strong>Target class or method does not exist.</strong> Confirm the route import, controller namespace, class, and public action name.</li><li><strong>Blade reports an undefined variable.</strong> Compare the controller&#39;s view-data key with the variable used in the template.</li><li><strong>A valid request works but invalid input behaves unpredictably.</strong> Make validation and the rejected path explicit before persistence.</li><li><strong>The controller is difficult to scan.</strong> Separate visible blocks for validation, data preparation, action, and response before introducing more architecture.</li></ul>\n<h2 id=\"how-to-verify-it\">How to verify it</h2>\n<ul><li><code>V-CONTROLLER-001</code>: Send a request through the mapped route and confirm the intended public controller action handles it.</li><li><code>V-CONTROLLER-002</code>: Exercise one valid path and one rejected or missing-input path and confirm their different responses.</li><li><code>V-CONTROLLER-003</code>: Assert the smallest observable contract: status, redirect, view name, essential view data, or JSON data.</li></ul>\n<h2 id=\"boundaries-and-version-notes\">Boundaries and version notes</h2>\n<ul><li>Reviewed for Laravel 13.x; controllers remain optional because routes may use closures or invokable classes.</li><li>A controller does not automatically validate, authorize, or persist data.</li><li>Laravel controllers do not have to extend the framework&#39;s base controller class.</li><li>Services, jobs, and repositories may be appropriate later, but they are not prerequisites for a readable beginner controller.</li></ul>\n<h2 id=\"ai-steering-rule\">AI steering rule</h2>\n<p>AI should confirm the mapped route, action contract, input, and expected response before editing a controller, keep the change inside the focused action, and avoid adding service or repository layers unless the responsibility or user request requires them.</p>\n<h2 id=\"human-readability-rule\">Human readability rule</h2>\n<p>Keep controller actions short enough to scan and organize them as visible input, validation or authorization, data preparation, operation, and response blocks.</p>\n<h2 id=\"related-nodes\">Related nodes</h2>\n<ul><li>CANON-ROUTE-001</li><li>SUPPORT-VALIDATE-001</li><li>CANON-BLADE-VIEW-001</li><li>CANON-LARAVEL-REQUEST-LIFECYCLE-001</li><li>CANON-CRUD-001</li><li>CANON-FUNCTION-001</li></ul>\n<h2 id=\"evidence-status\">Evidence status</h2>\n<p>Primary-source reviewed on 2026-07-12. Independent human review and promotion are pending. See <a href=\"https://github.com/DeveloperAtlas5/DeveloperAtlas-Public/blob/main/content/nodes/evidence/CANON-CONTROLLER-001.evidence.json\" target=\"_blank\" rel=\"noreferrer\">`../evidence/CANON-CONTROLLER-001.evidence.json`</a> for claim mappings, source locations, limitations, and verification contracts.</p>"
    },
    {
      "id": "CANON-DOM-001",
      "title": "DOM",
      "summary": "The DOM represents a document as a node tree and provides APIs that code can use to inspect and change that in-memory document.",
      "tags": [
        "JavaScript",
        "DOM",
        "browser"
      ],
      "versionScope": [
        "Current DOM standard",
        "Evergreen browsers"
      ],
      "reviewedAt": "2026-07-12",
      "sourceCount": 1,
      "verificationCount": 3,
      "independentReview": "pending",
      "sources": [
        {
          "title": "Document Object Model (DOM)",
          "publisher": "Mozilla MDN",
          "url": "https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model",
          "checkedAt": "2026-07-12"
        }
      ],
      "limitations": [
        "The DOM is the browser's current document representation, not an automatic edit to the source HTML file.",
        "Selector methods can return no match; code must handle that path instead of assuming an element exists.",
        "DOM availability and timing depend on the host environment and document lifecycle.",
        "Independent human review remains required before promotion to gold."
      ],
      "sourcePath": "content/nodes/gold/CANON-DOM-001.md",
      "sourceUrl": "https://github.com/DeveloperAtlas5/DeveloperAtlas-Public/blob/main/content/nodes/gold/CANON-DOM-001.md",
      "evidenceUrl": "https://github.com/DeveloperAtlas5/DeveloperAtlas-Public/blob/main/content/nodes/evidence/CANON-DOM-001.evidence.json",
      "html": "<aside class=\"evidence-banner\"><p><strong>Evidence status — public preview</strong></p><p>Primary-source mapping: <strong>completed with AI assistance</strong> on 2026-07-12.</p><p>Independent human review: <strong>pending</strong>. Publication status: <strong>public preview, not certification</strong>.</p><p>Sources: 1 (<a href=\"https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model\" target=\"_blank\" rel=\"noreferrer\">Document Object Model (DOM)</a>). Automated structure and evidence checks: <strong>passed</strong>.</p><p>Verification designs: 3. Version scope: Current DOM standard; Evergreen browsers.</p><p>Known limitations remain explicit in this node and in the <a href=\"https://github.com/DeveloperAtlas5/DeveloperAtlas-Public/blob/main/docs/public/known-limitations.md\" target=\"_blank\" rel=\"noreferrer\">public limitations</a>.</p></aside>\n<h2 id=\"hover-summary\">Hover summary</h2>\n<p>The DOM is the browser&#39;s live version of the HTML page.</p>\n<h2 id=\"one-sentence-truth\">One-sentence truth</h2>\n<p>The DOM represents a document as a node tree and provides APIs that code can use to inspect and change that in-memory document.</p>\n<h2 id=\"mental-model\">Mental model</h2>\n<p>HTML is the written recipe. The DOM is the meal the browser builds from that recipe.</p>\n<h2 id=\"beginner-explanation\">Beginner explanation</h2>\n<p>When the browser opens your HTML, it creates a live page structure. JavaScript can find parts of this structure and change them.</p>\n<h2 id=\"technical-explanation\">Technical explanation</h2>\n<p>DOM stands for Document Object Model. Browser JavaScript uses DOM methods like <code>querySelector</code> to select elements.</p>\n<pre><code class=\"language-js\">const button = document.querySelector(&#39;.change-message-button&#39;)</code></pre>\n<h2 id=\"when-to-use-it\">When to use it</h2>\n<p>Use DOM methods when JavaScript needs to find or change something on the page.</p>\n<h2 id=\"common-mistakes\">Common mistakes</h2>\n<ul><li>Thinking JavaScript edits the HTML file itself.</li><li>Selecting the wrong element.</li><li>Running JavaScript before the element exists.</li></ul>\n<h2 id=\"ai-steering-rule\">AI steering rule</h2>\n<p>AI should explain the connection between HTML class names and JavaScript selectors before patching DOM bugs.</p>\n<h2 id=\"human-readability-rule\">Human readability rule</h2>\n<p>DOM-related variable names should name the element clearly, like <code>submitButton</code> or <code>messageText</code>.</p>\n<h2 id=\"related-nodes\">Related nodes</h2>\n<ul><li>CANON-JAVASCRIPT-001</li><li>SUPPORT-QUERYSELECTOR-001</li></ul>\n<h2 id=\"verification\">Verification</h2>\n<ul><li><code>V-DOM-001</code>: Select a known element and confirm the lookup returns the expected node.</li><li><code>V-DOM-002</code>: Change one text value, attribute, or class and observe the corresponding page update.</li><li><code>V-DOM-003</code>: Check the missing-element path so a failed selector is visible rather than silently guessed.</li></ul>\n<h2 id=\"applicability-and-boundaries\">Applicability and boundaries</h2>\n<ul><li>The DOM is the browser&#39;s current document representation, not an automatic edit to the source HTML file.</li><li>Selector methods can return no match; code must handle that path instead of assuming an element exists.</li><li>DOM availability and timing depend on the host environment and document lifecycle.</li></ul>\n<h2 id=\"evidence-status\">Evidence status</h2>\n<p>Primary-source reviewed on 2026-07-12. Independent human review and promotion are pending. See <a href=\"https://github.com/DeveloperAtlas5/DeveloperAtlas-Public/blob/main/content/nodes/evidence/CANON-DOM-001.evidence.json\" target=\"_blank\" rel=\"noreferrer\">`../evidence/CANON-DOM-001.evidence.json`</a> for claim mappings, source locations, limitations, and verification contracts.</p>"
    },
    {
      "id": "CANON-LARAVEL-REQUEST-LIFECYCLE-001",
      "title": "Laravel Request Lifecycle",
      "summary": "A Laravel HTTP request enters through public/index.php, passes through application bootstrap and middleware, reaches a matching route action, and returns a response outward through middleware to the client.",
      "tags": [
        "Laravel",
        "request flow",
        "verification"
      ],
      "versionScope": [
        "Laravel 13.x",
        "PHP 8.3+",
        "Standard Laravel HTTP request lifecycle"
      ],
      "reviewedAt": "2026-07-12",
      "sourceCount": 8,
      "verificationCount": 5,
      "independentReview": "pending",
      "sources": [
        {
          "title": "Request Lifecycle",
          "publisher": "Laravel",
          "url": "https://laravel.com/docs/13.x/lifecycle",
          "checkedAt": "2026-07-12"
        },
        {
          "title": "Routing",
          "publisher": "Laravel",
          "url": "https://laravel.com/docs/13.x/routing",
          "checkedAt": "2026-07-12"
        },
        {
          "title": "Controllers",
          "publisher": "Laravel",
          "url": "https://laravel.com/docs/13.x/controllers",
          "checkedAt": "2026-07-12"
        },
        {
          "title": "Middleware",
          "publisher": "Laravel",
          "url": "https://laravel.com/docs/13.x/middleware",
          "checkedAt": "2026-07-12"
        },
        {
          "title": "HTTP Responses",
          "publisher": "Laravel",
          "url": "https://laravel.com/docs/13.x/responses",
          "checkedAt": "2026-07-12"
        },
        {
          "title": "Views",
          "publisher": "Laravel",
          "url": "https://laravel.com/docs/13.x/views",
          "checkedAt": "2026-07-12"
        },
        {
          "title": "HTTP Tests",
          "publisher": "Laravel",
          "url": "https://laravel.com/docs/13.x/http-tests",
          "checkedAt": "2026-07-12"
        },
        {
          "title": "Release Notes",
          "publisher": "Laravel",
          "url": "https://laravel.com/docs/13.x/releases",
          "checkedAt": "2026-07-12"
        }
      ],
      "limitations": [
        "The review covers Laravel 13.x documentation and must be repeated for a future major version.",
        "The node intentionally omits framework-internal class-by-class execution details that are unnecessary for its beginner mental model.",
        "Long-running servers such as Octane may add worker lifecycle concerns that are outside this node's request-level scope.",
        "Application middleware, exception handling, service providers, and response preparation can add project-specific behavior.",
        "Independent human review remains required before the node can be marked independently_reviewed or gold."
      ],
      "sourcePath": "content/nodes/gold/CANON-LARAVEL-REQUEST-LIFECYCLE-001.md",
      "sourceUrl": "https://github.com/DeveloperAtlas5/DeveloperAtlas-Public/blob/main/content/nodes/gold/CANON-LARAVEL-REQUEST-LIFECYCLE-001.md",
      "evidenceUrl": "https://github.com/DeveloperAtlas5/DeveloperAtlas-Public/blob/main/content/nodes/evidence/CANON-LARAVEL-REQUEST-LIFECYCLE-001.evidence.json",
      "html": "<aside class=\"evidence-banner\"><p><strong>Evidence status — public preview</strong></p><p>Primary-source mapping: <strong>completed with AI assistance</strong> on 2026-07-12.</p><p>Independent human review: <strong>pending</strong>. Publication status: <strong>public preview, not certification</strong>.</p><p>Sources: 8 (<a href=\"https://laravel.com/docs/13.x/lifecycle\" target=\"_blank\" rel=\"noreferrer\">Request Lifecycle</a>, <a href=\"https://laravel.com/docs/13.x/routing\" target=\"_blank\" rel=\"noreferrer\">Routing</a>, <a href=\"https://laravel.com/docs/13.x/controllers\" target=\"_blank\" rel=\"noreferrer\">Controllers</a>). Automated structure and evidence checks: <strong>passed</strong>.</p><p>Verification designs: 5. Version scope: Laravel 13.x; PHP 8.3+; Standard Laravel HTTP request lifecycle.</p><p>Known limitations remain explicit in this node and in the <a href=\"https://github.com/DeveloperAtlas5/DeveloperAtlas-Public/blob/main/docs/public/known-limitations.md\" target=\"_blank\" rel=\"noreferrer\">public limitations</a>.</p></aside>\n<h2 id=\"quick-answer\">Quick answer</h2>\n<p>A Laravel HTTP request enters through <code>public/index.php</code>, passes through application bootstrap and middleware, reaches a matching route action, and returns a response outward through middleware to the client.</p>\n<h2 id=\"where-it-fits-in-the-flow\">Where it fits in the flow</h2>\n<p>This is the map for the full server-side journey. Use it before changing code when you do not yet know whether a failure belongs to the request, middleware, route, action, view, or response.</p>\n<p><code>client -&gt; public/index.php -&gt; bootstrap -&gt; global middleware -&gt; router -&gt; route middleware -&gt; action -&gt; response -&gt; middleware -&gt; client</code></p>\n<h2 id=\"mental-model\">Mental model</h2>\n<p>Think of the request as a parcel moving through checkpoints. <code>public/index.php</code> receives it, bootstrap prepares the application, middleware may inspect or stop it, the router chooses a destination, the action creates a response, and middleware handles that response on its way out.</p>\n<p>The controller and Blade view are common stops, not mandatory ones. A route closure can produce a response directly, and a controller can return JSON, a redirect, a string, or a response object instead of a view.</p>\n<h2 id=\"working-example\">Working example</h2>\n<pre><code class=\"language-php\">// routes/web.php\nuse App\\Http\\Controllers\\GroceryController;\nuse Illuminate\\Support\\Facades\\Route;\n\nRoute::get(&#39;/groceries&#39;, [GroceryController::class, &#39;index&#39;])\n    -&gt;name(&#39;groceries.index&#39;);</code></pre>\n<pre><code class=\"language-php\">// app/Http/Controllers/GroceryController.php\nuse Illuminate\\View\\View;\n\npublic function index(): View\n{\n    return view(&#39;groceries.index&#39;);\n}</code></pre>\n<p>For <code>GET /groceries</code>, Laravel boots, runs middleware, matches the route, calls <code>GroceryController::index()</code>, renders the view, and sends the resulting response back through middleware.</p>\n<h2 id=\"what-you-can-safely-change\">What you can safely change</h2>\n<ul><li>Change one link in the chain at a time, then verify that exact boundary.</li><li>When changing the URI or method, update the caller and route together.</li><li>When changing the action or view name, update the route or controller reference that points to it.</li><li>Keep the response assertion aligned with the response type: view, redirect, or JSON.</li></ul>\n<h2 id=\"common-failure-and-recovery\">Common failure and recovery</h2>\n<ul><li><strong>The controller breakpoint never runs.</strong> Confirm the request method and URI with <code>route:list</code>, then inspect middleware that can return early.</li><li><strong>The URI looks right but Laravel rejects the request.</strong> Compare the HTTP method as well as the path.</li><li><strong>The action runs but the page fails.</strong> Inspect the returned response or view name and the data passed to it.</li><li><strong>Debugging jumps straight to architecture changes.</strong> Trace the first boundary where expected and observed behavior differ, then make the smallest repair there.</li></ul>\n<h2 id=\"how-to-verify-it\">How to verify it</h2>\n<ul><li><code>V-LRLC-001</code>: Run <code>php artisan route:list --path=groceries</code> and confirm the expected method, URI, action, and middleware.</li><li><code>V-LRLC-002</code>: Request <code>/groceries</code> in a feature test, then assert <code>200</code> and <code>assertViewIs(&#39;groceries.index&#39;)</code>.</li><li><code>V-LRLC-003</code>: Add an observable route middleware behavior and confirm it runs before the controller and can return a response without invoking the action.</li><li><code>V-LRLC-004</code>: Send the wrong HTTP method to <code>/groceries</code> and confirm <code>GroceryController::index()</code> is not invoked.</li><li><code>V-LRLC-005</code>: For JSON or redirect variants, assert status plus <code>assertJson(...)</code> or <code>assertRedirect(...)</code> instead of asserting a view.</li></ul>\n<h2 id=\"boundaries-and-version-notes\">Boundaries and version notes</h2>\n<ul><li>Reviewed for Laravel 13.x, which requires PHP 8.3 or newer within its supported PHP range.</li><li>This article describes the normal HTTP lifecycle; console commands use the console path.</li><li>Application middleware and long-running runtimes can add operational detail without changing the core request-to-response model.</li><li>Route closures, controllers, Blade, JSON, and redirects are alternatives at specific points, not universal stages.</li></ul>\n<h2 id=\"ai-steering-rule\">AI steering rule</h2>\n<p>Before changing a Laravel request-flow bug, AI should identify the observed method and URI, matching route, applicable middleware, route action, and returned response; it should not assume the controller ran or introduce new architecture before locating the first broken boundary.</p>\n<h2 id=\"human-readability-rule\">Human readability rule</h2>\n<p>Present the method, URI, middleware, action, response type, and verification result as one traceable request-to-response chain.</p>\n<h2 id=\"related-nodes\">Related nodes</h2>\n<ul><li>CANON-REQUEST-RESPONSE-001</li><li>CANON-ROUTE-001</li><li>CANON-CONTROLLER-001</li><li>SUPPORT-VALIDATE-001</li><li>CANON-BLADE-VIEW-001</li><li>CANON-CRUD-001</li></ul>\n<h2 id=\"evidence-status\">Evidence status</h2>\n<p>Primary-source reviewed on 2026-07-12 for Laravel 13.x. Independent human review is pending. See <a href=\"https://github.com/DeveloperAtlas5/DeveloperAtlas-Public/blob/main/content/nodes/evidence/CANON-LARAVEL-REQUEST-LIFECYCLE-001.evidence.json\" target=\"_blank\" rel=\"noreferrer\">`../evidence/CANON-LARAVEL-REQUEST-LIFECYCLE-001.evidence.json`</a> for claim mappings, source locations, limitations, and verification contracts.</p>"
    },
    {
      "id": "CANON-LOCALSTORAGE-001",
      "title": "localStorage",
      "summary": "localStorage stores string key/value pairs for an origin and normally persists them across browser sessions.",
      "tags": [
        "JavaScript",
        "browser",
        "storage"
      ],
      "versionScope": [
        "Current Web Storage standard",
        "Evergreen browsers"
      ],
      "reviewedAt": "2026-07-12",
      "sourceCount": 3,
      "verificationCount": 3,
      "independentReview": "pending",
      "sources": [
        {
          "title": "Window.localStorage",
          "publisher": "Mozilla MDN",
          "url": "https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage",
          "checkedAt": "2026-07-12"
        },
        {
          "title": "JSON.stringify()",
          "publisher": "Mozilla MDN",
          "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify",
          "checkedAt": "2026-07-12"
        },
        {
          "title": "JSON.parse()",
          "publisher": "Mozilla MDN",
          "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse",
          "checkedAt": "2026-07-12"
        }
      ],
      "limitations": [
        "Storage is scoped by origin and behavior for file URLs is not a reliable contract.",
        "Keys and values are strings; structured values require an explicit serialization format such as JSON.",
        "Storage access can fail, is synchronous, has browser-dependent limits, and should not hold secrets or server-authoritative data.",
        "Independent human review remains required before promotion to gold."
      ],
      "sourcePath": "content/nodes/gold/CANON-LOCALSTORAGE-001.md",
      "sourceUrl": "https://github.com/DeveloperAtlas5/DeveloperAtlas-Public/blob/main/content/nodes/gold/CANON-LOCALSTORAGE-001.md",
      "evidenceUrl": "https://github.com/DeveloperAtlas5/DeveloperAtlas-Public/blob/main/content/nodes/evidence/CANON-LOCALSTORAGE-001.evidence.json",
      "html": "<aside class=\"evidence-banner\"><p><strong>Evidence status — public preview</strong></p><p>Primary-source mapping: <strong>completed with AI assistance</strong> on 2026-07-12.</p><p>Independent human review: <strong>pending</strong>. Publication status: <strong>public preview, not certification</strong>.</p><p>Sources: 3 (<a href=\"https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage\" target=\"_blank\" rel=\"noreferrer\">Window.localStorage</a>, <a href=\"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify\" target=\"_blank\" rel=\"noreferrer\">JSON.stringify()</a>, <a href=\"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse\" target=\"_blank\" rel=\"noreferrer\">JSON.parse()</a>). Automated structure and evidence checks: <strong>passed</strong>.</p><p>Verification designs: 3. Version scope: Current Web Storage standard; Evergreen browsers.</p><p>Known limitations remain explicit in this node and in the <a href=\"https://github.com/DeveloperAtlas5/DeveloperAtlas-Public/blob/main/docs/public/known-limitations.md\" target=\"_blank\" rel=\"noreferrer\">public limitations</a>.</p></aside>\n<h2 id=\"hover-summary\">Hover summary</h2>\n<p>localStorage saves small browser data after refresh.</p>\n<h2 id=\"one-sentence-truth\">One-sentence truth</h2>\n<p>localStorage stores string key/value pairs for an origin and normally persists them across browser sessions.</p>\n<h2 id=\"mental-model\">Mental model</h2>\n<p>It is a tiny notebook in the browser.</p>\n<h2 id=\"beginner-explanation\">Beginner explanation</h2>\n<p>Without saving, a page forgets changes after refresh. <code>localStorage</code> lets the browser remember simple data.</p>\n<h2 id=\"technical-explanation\">Technical explanation</h2>\n<p><code>localStorage</code> stores string key-value pairs.</p>\n<pre><code class=\"language-js\">localStorage.setItem(&#39;name&#39;, &#39;Jefry&#39;)\n\nconst savedName = localStorage.getItem(&#39;name&#39;)</code></pre>\n<p>For arrays or objects, use JSON:</p>\n<pre><code class=\"language-js\">localStorage.setItem(&#39;items&#39;, JSON.stringify(items))\n\nconst savedItems = JSON.parse(localStorage.getItem(&#39;items&#39;))</code></pre>\n<h2 id=\"when-to-use-it\">When to use it</h2>\n<p>Use it for small local data in beginner projects.</p>\n<h2 id=\"when-not-to-use-it\">When not to use it</h2>\n<p>Do not use it for passwords, private data, or real multi-user database needs.</p>\n<h2 id=\"common-mistakes\">Common mistakes</h2>\n<ul><li>Forgetting that localStorage stores strings.</li><li>Forgetting <code>JSON.stringify</code>.</li><li>Forgetting <code>JSON.parse</code>.</li><li>Treating localStorage like a real backend database.</li></ul>\n<h2 id=\"ai-steering-rule\">AI steering rule</h2>\n<p>AI should warn when localStorage is being used for data that should be private or server-side.</p>\n<h2 id=\"human-readability-rule\">Human readability rule</h2>\n<p>Use clear key names and keep save/load logic grouped.</p>\n<h2 id=\"related-nodes\">Related nodes</h2>\n<ul><li>CANON-JAVASCRIPT-001</li><li>SUPPORT-JSON-STRINGIFY-001</li><li>SUPPORT-JSON-PARSE-001</li></ul>\n<h2 id=\"verification\">Verification</h2>\n<ul><li><code>V-LOCALSTORAGE-001</code>: Save a known value, refresh or recreate the state, and confirm the value loads again.</li><li><code>V-LOCALSTORAGE-002</code>: Start with a missing key and confirm the application uses its intended default.</li><li><code>V-LOCALSTORAGE-003</code>: Store malformed or unexpected text and confirm parsing failure does not silently corrupt visible state.</li></ul>\n<h2 id=\"applicability-and-boundaries\">Applicability and boundaries</h2>\n<ul><li>Storage is scoped by origin and behavior for file URLs is not a reliable contract.</li><li>Keys and values are strings; structured values require an explicit serialization format such as JSON.</li><li>Storage access can fail, is synchronous, has browser-dependent limits, and should not hold secrets or server-authoritative data.</li></ul>\n<h2 id=\"evidence-status\">Evidence status</h2>\n<p>Primary-source reviewed on 2026-07-12. Independent human review and promotion are pending. See <a href=\"https://github.com/DeveloperAtlas5/DeveloperAtlas-Public/blob/main/content/nodes/evidence/CANON-LOCALSTORAGE-001.evidence.json\" target=\"_blank\" rel=\"noreferrer\">`../evidence/CANON-LOCALSTORAGE-001.evidence.json`</a> for claim mappings, source locations, limitations, and verification contracts.</p>"
    },
    {
      "id": "CANON-ROUTE-001",
      "title": "Route",
      "summary": "A Laravel route matches an HTTP method and URI, then dispatches the request to a configured closure, controller action, or other supported route action.",
      "tags": [
        "Laravel",
        "route",
        "HTTP"
      ],
      "versionScope": [
        "Laravel 13.x"
      ],
      "reviewedAt": "2026-07-12",
      "sourceCount": 2,
      "verificationCount": 3,
      "independentReview": "pending",
      "sources": [
        {
          "title": "Routing",
          "publisher": "Laravel",
          "url": "https://laravel.com/docs/13.x/routing",
          "checkedAt": "2026-07-12"
        },
        {
          "title": "URL Generation",
          "publisher": "Laravel",
          "url": "https://laravel.com/docs/13.x/urls",
          "checkedAt": "2026-07-12"
        }
      ],
      "limitations": [
        "HTTP method and URI are both part of route matching.",
        "Named routes generate URLs by name but do not change the dispatched action.",
        "Middleware, model binding, and authorization can affect the request around the action.",
        "Independent human review remains required before promotion to gold."
      ],
      "sourcePath": "content/nodes/gold/CANON-ROUTE-001.md",
      "sourceUrl": "https://github.com/DeveloperAtlas5/DeveloperAtlas-Public/blob/main/content/nodes/gold/CANON-ROUTE-001.md",
      "evidenceUrl": "https://github.com/DeveloperAtlas5/DeveloperAtlas-Public/blob/main/content/nodes/evidence/CANON-ROUTE-001.evidence.json",
      "html": "<aside class=\"evidence-banner\"><p><strong>Evidence status — public preview</strong></p><p>Primary-source mapping: <strong>completed with AI assistance</strong> on 2026-07-12.</p><p>Independent human review: <strong>pending</strong>. Publication status: <strong>public preview, not certification</strong>.</p><p>Sources: 2 (<a href=\"https://laravel.com/docs/13.x/routing\" target=\"_blank\" rel=\"noreferrer\">Routing</a>, <a href=\"https://laravel.com/docs/13.x/urls\" target=\"_blank\" rel=\"noreferrer\">URL Generation</a>). Automated structure and evidence checks: <strong>passed</strong>.</p><p>Verification designs: 3. Version scope: Laravel 13.x.</p><p>Known limitations remain explicit in this node and in the <a href=\"https://github.com/DeveloperAtlas5/DeveloperAtlas-Public/blob/main/docs/public/known-limitations.md\" target=\"_blank\" rel=\"noreferrer\">public limitations</a>.</p></aside>\n<h2 id=\"quick-answer\">Quick answer</h2>\n<p>A Laravel route matches an HTTP method and URI, then dispatches the request to a configured closure, controller action, or other supported route action.</p>\n<h2 id=\"where-it-fits-in-the-flow\">Where it fits in the flow</h2>\n<p>The route is the decision point after Laravel boots and applicable global middleware runs. It connects an incoming method and URI to the next action and may add route middleware, parameters, and a name used for URL generation.</p>\n<p><code>request method + URI -&gt; route match -&gt; route middleware -&gt; action</code></p>\n<h2 id=\"mental-model\">Mental model</h2>\n<p>Think of a route as a signpost with two required coordinates: method and path. The route name is a reusable label for generating a URL; it is not the action itself.</p>\n<h2 id=\"working-example\">Working example</h2>\n<pre><code class=\"language-php\">use App\\Http\\Controllers\\ItemController;\nuse Illuminate\\Support\\Facades\\Route;\n\nRoute::get(&#39;/items&#39;, [ItemController::class, &#39;index&#39;])\n    -&gt;name(&#39;items.index&#39;);\n\nRoute::post(&#39;/items&#39;, [ItemController::class, &#39;store&#39;])\n    -&gt;name(&#39;items.store&#39;);</code></pre>\n<p><code>GET /items</code> dispatches <code>index</code>; <code>POST /items</code> dispatches <code>store</code>. Blade can generate the first URL with <code>route(&#39;items.index&#39;)</code> without hard-coding <code>/items</code>.</p>\n<h2 id=\"what-you-can-safely-change\">What you can safely change</h2>\n<ul><li>Change a route URI together with links, forms, tests, or redirects that call it.</li><li>Change a route name together with every <code>route(...)</code> reference.</li><li>Change a controller action only when the target public method exists.</li><li>Preserve the HTTP meaning: reads normally use <code>GET</code>; state-changing form actions use <code>POST</code>, <code>PUT</code>, <code>PATCH</code>, or <code>DELETE</code> as appropriate.</li></ul>\n<h2 id=\"common-failure-and-recovery\">Common failure and recovery</h2>\n<ul><li><strong><code>404 Not Found</code>.</strong> Confirm the registered URI and any route prefix with <code>route:list</code>.</li><li><strong><code>405 Method Not Allowed</code>.</strong> The path exists but the request method differs; inspect the form method and method spoofing.</li><li><strong><code>Route [name] not defined</code>.</strong> Compare the exact route name with the Blade, redirect, or test reference.</li><li><strong>Target class or method error.</strong> Confirm the controller import and public action name.</li></ul>\n<h2 id=\"how-to-verify-it\">How to verify it</h2>\n<ul><li><code>V-ROUTE-001</code>: Run <code>php artisan route:list --path=items</code> and confirm method, URI, name, middleware, and action.</li><li><code>V-ROUTE-002</code>: Send a request with the registered method and URI and confirm the configured closure or controller action runs.</li><li><code>V-ROUTE-003</code>: Use one wrong method or route name and confirm the mismatch is observable and the intended action does not run.</li></ul>\n<h2 id=\"boundaries-and-version-notes\">Boundaries and version notes</h2>\n<ul><li>Reviewed for Laravel 13.x; the method-and-URI matching model is stable across supported recent Laravel versions.</li><li>Named routes generate URLs by name but do not change the dispatched action.</li><li>Middleware, route-model binding, authorization, and domain or prefix groups may affect the request around the action.</li><li>A controller is common but optional; a closure or invokable class can also be a route action.</li></ul>\n<h2 id=\"ai-steering-rule\">AI steering rule</h2>\n<p>AI should inspect the current request method and URI plus <code>route:list</code> before editing a route, and should change only the mismatched route property and its direct callers unless broader routing work is requested.</p>\n<h2 id=\"human-readability-rule\">Human readability rule</h2>\n<p>Group related routes, use consistent resource-oriented names, and keep method, URI, action, middleware, and route name easy to scan on one definition.</p>\n<h2 id=\"related-nodes\">Related nodes</h2>\n<ul><li>CANON-REQUEST-RESPONSE-001</li><li>CANON-LARAVEL-REQUEST-LIFECYCLE-001</li><li>CANON-CONTROLLER-001</li><li>CANON-BLADE-VIEW-001</li><li>CANON-CRUD-001</li></ul>\n<h2 id=\"evidence-status\">Evidence status</h2>\n<p>Primary-source reviewed on 2026-07-12. Independent human review and promotion are pending. See <a href=\"https://github.com/DeveloperAtlas5/DeveloperAtlas-Public/blob/main/content/nodes/evidence/CANON-ROUTE-001.evidence.json\" target=\"_blank\" rel=\"noreferrer\">`../evidence/CANON-ROUTE-001.evidence.json`</a> for claim mappings, source locations, limitations, and verification contracts.</p>"
    }
  ]
};
