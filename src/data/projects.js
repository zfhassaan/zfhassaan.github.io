/**
 * Featured case studies for #projects.
 * Structured around:
 * - Problem: What needed to be solved, and why?
 * - Constraints: Technical or business challenges.
 * - Approach: Architecture, design, and integration decisions.
 * - Delivery: What Hassaan personally owned.
 * - Outcome: Concrete, verifiable technical results.
 */
export const projects = [
  {
    id: 'jazzcash',
    tag: 'Production SDK · Fintech · Pakistan',
    title: 'JazzCash Laravel SDK',
    href: 'https://github.com/zfhassaan/jazzcash',
    problem:
      "Integrating JazzCash — Pakistan's largest mobile financial service — required hand-rolling HMAC hash-key signing, assemble hosted-checkout payloads by hand, and juggling sandbox/production environments without an official or reliable Laravel package.",
    constraints:
      'Opaque gateway documentation, strict SHA-256 HMAC payload formatting, silent gateway rejections on mismatched parameters, and managing differing merchant credentials across staging and production.',
    approach:
      'Designed a clean, fluent request builder (<span class="mono">setAmount/setBillReference</span>), automated cryptographic hash-key calculation, built an environment-driven sandbox toggle, and provided auto-discovered ServiceProvider and Facade.',
    delivery:
      'Sole author and maintainer. Architected the complete package, built an automated GitHub Actions CI matrix testing across PHP 7.3→8.5 and Laravel 8→13, and published to Packagist.',
    outcome:
      'Adopted across Pakistani commercial merchants (15★, 8 forks on GitHub); reduced checkout integration time from days of custom debugging to minutes; verified compatibility across 6 major Laravel releases.',
    stack: ['Laravel', 'PHP', 'JazzCash API', 'Packagist', 'GitHub Actions', 'PHPUnit'],
    impact: [
      '15★ · 8 forks',
      'Laravel 8→13 · PHP 7.3→8.5',
      'Packagist Package',
      'Hosted Checkout + Sandbox',
    ],
    links: [
      { label: 'Packagist', href: 'https://packagist.org/packages/zfhassaan/jazzcash', icon: 'packagist' },
      { label: 'GitHub', href: 'https://github.com/zfhassaan/jazzcash', icon: 'github' },
    ],
    visual: {
      type: 'terminal',
      title: 'JazzCashController.php',
      lines: [
        '<span class="t-comment">// Hosted checkout in four lines</span>',
        null,
        '<span class="t-val">$jazzcash</span> = <span class="t-key">new</span> <span class="t-fn">JazzCash</span>();',
        '<span class="t-val">$jazzcash</span>-&gt;<span class="t-fn">setAmount</span>(<span class="t-val">$request-&gt;amount</span>);',
        '<span class="t-val">$jazzcash</span>-&gt;<span class="t-fn">setBillReference</span>(<span class="t-val">$ref</span>);',
        '<span class="t-key">return</span> <span class="t-val">$jazzcash</span>-&gt;<span class="t-fn">sendRequest</span>();',
        null,
        '<span class="t-comment">// Hash-key signed · sandbox ↔ production</span>',
        '<span class="t-dim">// 15★ · Laravel 8→13 · PHP 7.3→8.5 ✓</span>',
      ],
    },
  },
  {
    id: 'payfast',
    tag: 'Fintech · Payment Gateway · Pakistan',
    title: 'PayFast Laravel SDK',
    href: 'https://github.com/zfhassaan/payfast',
    problem:
      'PayFast merchant integrations lacked modern SDK tooling, leaving engineering teams to write brittle HTTP calls prone to double-charge race conditions, missed Instant Payment Notifications (IPN), and drop-offs during 3DS redirects.',
    constraints:
      'Support both direct merchant forms and hosted redirection, 3D Secure OTP verification, mobile wallet channels, and guarantee transaction idempotency against network retries.',
    approach:
      'Architected an end-to-end integration suite: tokenized auth lifecycle, idempotent transaction checks before mutating order states, pre-built Blade checkout templates, and signed IPN listeners for automated webhook reconciliation.',
    delivery:
      'Sole author and maintainer. Created complete package architecture, managed 9 tagged releases through v1.1.0, implemented PHPUnit test suites, and authored the full documentation portal.',
    outcome:
      'Eliminated duplicate transaction hazards through idempotency guarantees; enabled seamless multi-channel checkout (card, wallet, bank); tested and verified across Laravel 9→12.',
    stack: ['Laravel', 'PHP 8', 'PayFast API', 'Packagist', 'Blade', 'PHPUnit'],
    impact: [
      'Laravel 9→12 · PHP 8+',
      '9 releases · v1.1.0',
      'IPN + Idempotent Checks',
      'Direct + Hosted Checkout',
    ],
    links: [
      { label: 'Documentation', href: 'https://zfhassaan.github.io/payfast/', icon: 'docs' },
      { label: 'GitHub', href: 'https://github.com/zfhassaan/payfast', icon: 'github' },
    ],
    visual: {
      type: 'schema',
      rows: [
        { boxes: [{ icon: 'CreditCard', text: 'Payment Request', highlight: true }] },
        { boxes: [{ icon: 'Key', text: 'Auth Token · 3DS OTP' }] },
        {
          boxes: [
            { icon: 'Zap', text: 'Direct', small: true },
            { icon: 'Globe', text: 'Hosted', small: true },
            { icon: 'Smartphone', text: 'Wallet', small: true },
          ],
        },
        { boxes: [{ icon: 'Check', text: 'IPN · Idempotent Confirm', highlight: true }] },
      ],
    },
  },
  {
    id: 'laravel-wallet',
    tag: 'Fintech · Distributed Systems · Architecture',
    title: 'Laravel Wallet — Ledger E-Wallet',
    href: 'https://github.com/zfhassaan/laravel-wallet',
    problem:
      'Most in-app wallet implementations use a mutable balance column in MySQL, creating catastrophic vulnerability to concurrent race conditions, untracked deductions, and untraceable financial discrepancies.',
    constraints:
      'High-concurrency transfer volume, zero tolerance for balance discrepancies, and need for instant tamper detection without introducing read latency bottlenecks.',
    approach:
      'Engineered an immutable, double-entry transaction ledger. Wallet balance is derived exclusively from verified transaction logs with row-level pessimistic locking (<span class="mono">SELECT ... FOR UPDATE</span>), cryptographic balance hash validation, automatic fraud account-freezing, and UUID audit trails.',
    delivery:
      'Sole architect and author. Designed core database schemas, atomic transfer pipelines, QR wallet-to-wallet workflows, and full PHPUnit concurrency test suites.',
    outcome:
      'Mathematically guarantees zero balance tampering; prevents double-spend race conditions under concurrent load; provides an unalterable audit trail for financial compliance.',
    stack: ['Laravel 12', 'PHP 8.2', 'MySQL', 'Packagist', 'PHPUnit'],
    impact: [
      'Immutable Ledger',
      'Tamper Detection + Auto-Freeze',
      'Atomic · Row-Locked',
      'v1.0.0 · MIT',
    ],
    links: [
      { label: 'Documentation', href: 'https://zfhassaan.github.io/laravel-wallet/', icon: 'docs' },
      { label: 'GitHub', href: 'https://github.com/zfhassaan/laravel-wallet', icon: 'github' },
    ],
    visual: {
      type: 'schema',
      rows: [
        { boxes: [{ icon: 'Send', text: 'Transfer Request', highlight: true }] },
        { boxes: [{ icon: 'Lock', text: 'Atomic Txn · Row Lock' }] },
        {
          boxes: [
            { icon: 'Plus', text: 'Credit', small: true },
            { icon: 'Minus', text: 'Debit', small: true },
            { icon: 'QrCode', text: 'QR Pay', small: true },
          ],
        },
        { boxes: [{ icon: 'ReceiptText', text: 'Ledger · Balance Hash', highlight: true }] },
      ],
    },
  },
  {
    id: 'laravel-amqp',
    tag: 'Open Source · Collaborator · 2.2M+ Downloads',
    title: 'Laravel AMQP — RabbitMQ Toolkit',
    href: 'https://github.com/bschmitt/laravel-amqp',
    subtitle:
      'Community package by <span class="mono">bschmitt/laravel-amqp</span> — Collaborator on upstream repository with 6 merged PRs.',
    problem:
      'The community package <span class="mono">bschmitt/laravel-amqp</span> (2.2M+ downloads) had drifted behind modern Laravel/PHP releases, blocking teams from upgrading to Laravel 10/11/12 without breaking their message queue infrastructure.',
    constraints:
      'Must preserve strict backward compatibility for high-volume enterprise systems while refactoring internal AMQP protocol handlers and modernizing test matrices.',
    approach:
      'Refactored connection management, upgraded to modern PHP 8 typed properties, standardized typed RPC messaging patterns, implemented dead-letter exchange (DLQ) retry guidance, and rebuilt modular documentation.',
    delivery:
      'Promoted to collaborator on the upstream repository with 6 merged PRs; modernized the multi-version GitHub Actions CI test suite; independently built and published comprehensive documentation at <span class="mono">zfhassaan.github.io/laravel-amqp</span>.',
    outcome:
      'Restored enterprise upgrade paths for 2.2M+ installations; continuous CI matrix passing across Laravel 8→13 and PHP 7.3→8.5 with zero reported regressions.',
    stack: ['Laravel', 'PHP 8', 'RabbitMQ', 'php-amqplib', 'GitHub Actions', 'PHPUnit'],
    impact: [
      '6 Merged Upstream PRs',
      'Collaborator · Upstream Access',
      'Rebuilt Docs · Modern Features',
      'Laravel 8→13 · PHP 7.3→8.5',
    ],
    links: [
      { label: 'Docs', href: 'https://zfhassaan.github.io/laravel-amqp', icon: 'docs' },
      { label: 'My fork', href: 'https://github.com/zfhassaan/laravel-amqp', icon: 'github' },
      { label: 'Upstream', href: 'https://github.com/bschmitt/laravel-amqp', icon: 'github' },
    ],
    visual: {
      type: 'terminal',
      title: 'UserService.php',
      lines: [
        '<span class="t-comment">// Typed RPC over RabbitMQ</span>',
        null,
        '<span class="t-key">$user</span> = <span class="t-fn">Rpc</span>::<span class="t-fn">call</span>(',
        '&nbsp;&nbsp;<span class="t-val">UserService</span>::<span class="t-key">class</span>,',
        '&nbsp;&nbsp;<span class="t-fn">GetUserRequest</span>::<span class="t-fn">make</span>([<span class="t-str">\'id\'</span> =&gt; <span class="t-val">42</span>])',
        ');',
        null,
        '<span class="t-comment">// Dispatch a typed message</span>',
        '<span class="t-fn">OrderPlaced</span>::<span class="t-fn">dispatch</span>([<span class="t-str">\'order_id\'</span> =&gt; <span class="t-val">$id</span>]);',
        null,
        '<span class="t-dim">// 6 PRs merged · collaborator · upstream up to date ✓</span>',
      ],
    },
  },
  {
    id: 'dbx',
    tag: 'DevOps · Go · Systems Tooling',
    title: 'DBX — Database Backup CLI',
    href: 'https://github.com/zfhassaan/dbx',
    problem:
      'Backing up MySQL, PostgreSQL, MongoDB and SQLite across heterogeneous machines meant juggling separate, brittle dump scripts — lacking compression, off-site cloud redundancy, automated scheduling, and failure alerts.',
    constraints:
      'Single cross-platform binary with zero language runtime dependencies (no Python or Node requirement), low memory overhead, and safe non-blocking database dumps.',
    approach:
      'Engineered a compiled Go CLI (Cobra) featuring streaming dump engines, in-flight gzip/zip compression, multi-cloud storage uploaders (AWS S3, Google Cloud Storage, Azure Blob), cron background scheduling, and Slack alert webhooks.',
    delivery:
      'Sole author and maintainer. Implemented entire Go codebase, automated multi-platform cross-compilation pipeline with GitHub Actions, and wrote 110+ unit and integration tests.',
    outcome:
      'Unified backup management across 4 database engines into a single zero-dependency binary; backed by 110+ passing automated tests across Linux, macOS, and Windows.',
    stack: ['Go 1.24', 'Cobra', 'MySQL', 'PostgreSQL', 'MongoDB', 'SQLite', 'AWS S3'],
    impact: ['4 Engines · 1 CLI', '110+ Tests', 'S3 · GCS · Azure', 'Win · Linux · macOS'],
    links: [
      { label: 'GitHub', href: 'https://github.com/zfhassaan/dbx', icon: 'github' },
    ],
    visual: {
      type: 'terminal',
      title: 'dbx',
      lines: [
        '<span class="t-comment"># Back up MySQL, compress &amp; ship to S3</span>',
        '<span class="t-fn">dbx</span> <span class="t-key">backup</span> mysql <span class="t-str">--db</span> <span class="t-val">shop</span> \\',
        '&nbsp;&nbsp;<span class="t-str">--compress</span> <span class="t-str">--upload</span> <span class="t-val">s3</span>',
        null,
        '<span class="t-comment"># Schedule a nightly Postgres backup</span>',
        '<span class="t-fn">dbx</span> <span class="t-key">schedule</span> add <span class="t-val">"0 2 * * *"</span> \\',
        '&nbsp;&nbsp;<span class="t-str">--type</span> <span class="t-val">postgres</span>',
        null,
        '<span class="t-comment"># Restore a single table</span>',
        '<span class="t-fn">dbx</span> <span class="t-key">restore</span> mysql <span class="t-str">--table</span> <span class="t-val">orders</span>',
        null,
        '<span class="t-dim">// 110+ tests · Win · Linux · macOS ✓</span>',
      ],
    },
  },
]
