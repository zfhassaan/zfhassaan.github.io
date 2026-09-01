/**
 * Featured case studies for #projects (single-item fade carousel).
 * Append an object to add a project.
 */
export const projects = [
  {
    id: 'jazzcash',
    tag: 'Open Source · Payments · Pakistan',
    title: 'JazzCash Laravel SDK',
    href: 'https://github.com/zfhassaan/jazzcash',
    problem:
      "Integrating JazzCash — Pakistan's leading mobile-money gateway — meant hand-rolling undocumented hash-key signing, assembling hosted-checkout payloads by hand, and juggling sandbox/production switching. No Laravel-native package existed.",
    solution:
      'A Laravel package (<span class="mono">composer require zfhassaan/jazzcash</span>) wrapping hosted checkout — a fluent <span class="mono">setAmount/setBillReference</span> API, secure hash-key request signing, env-driven sandbox↔production switching, auto-discovered provider &amp; facade, and a CI test matrix.',
    stack: ['Laravel', 'PHP', 'JazzCash API', 'Packagist', 'GitHub Actions', 'PHPUnit'],
    impact: [
      '15★ · 8 forks',
      'Laravel 8→13 · PHP 7.3→8.5',
      'Published on Packagist',
      'Hosted checkout + sandbox',
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
    tag: 'Open Source · Payments · Pakistan',
    title: 'PayFast Laravel SDK',
    href: 'https://github.com/zfhassaan/payfast',
    problem:
      'PayFast — a major Pakistani payment gateway — had thin documentation and no proper Laravel SDK. Integrations were hand-rolled, with no idempotency guarantees and no IPN (Instant Payment Notification) handling.',
    solution:
      'Built and published an open-source Laravel SDK (<span class="mono">composer require zfhassaan/payfast</span>) for the Pakistan payments environment — direct &amp; hosted checkout, 3DS OTP flow, auth-token management, mobile wallets, idempotent transaction checks, and IPN listeners — shipped with full docs.',
    stack: ['Laravel', 'PHP 8', 'PayFast API', 'Packagist', 'Blade', 'PHPUnit'],
    impact: [
      'Laravel 9→12 · PHP 8+',
      '9 releases · v1.1.0',
      'IPN + idempotent checks',
      'Direct + Hosted checkout',
    ],
    links: [
      { label: 'Documentation', href: 'https://zfhassaan.github.io/payfast/', icon: 'docs' },
      { label: 'GitHub', href: 'https://github.com/zfhassaan/payfast', icon: 'github' },
    ],
    visual: {
      type: 'schema',
      rows: [
        { boxes: [{ icon: '💳', text: 'Payment Request', highlight: true }] },
        { boxes: [{ icon: '🔑', text: 'Auth Token · 3DS OTP' }] },
        {
          boxes: [
            { icon: '⚡', text: 'Direct', small: true },
            { icon: '🌐', text: 'Hosted', small: true },
            { icon: '📱', text: 'Wallet', small: true },
          ],
        },
        { boxes: [{ icon: '✓', text: 'IPN · Idempotent Confirm', highlight: true }] },
      ],
    },
  },
  {
    id: 'dbx',
    tag: 'Open Source · DevOps · CLI',
    title: 'DBX — Database Backup CLI',
    href: 'https://github.com/zfhassaan/dbx',
    problem:
      'Backing up MySQL, PostgreSQL, MongoDB and SQLite across machines meant juggling separate, brittle dump/restore scripts — with no scheduling, compression, or off-site copies, and no consistent logging when a job failed.',
    solution:
      'A single cross-platform Go CLI (Cobra) that backs up and restores all four engines — full / incremental / differential backups, selective table &amp; collection restore, gzip/zip compression, cron scheduling, cloud uploads (S3 · GCS · Azure), Slack alerts, and an interactive menu.',
    stack: ['Go 1.24', 'Cobra', 'MySQL', 'PostgreSQL', 'MongoDB', 'SQLite', 'AWS S3'],
    impact: ['4 engines · 1 CLI', '110+ tests', 'S3 · GCS · Azure', 'Win · Linux · macOS'],
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
  {
    id: 'laravel-wallet',
    tag: 'Open Source · FinTech · Laravel',
    title: 'Laravel Wallet — Ledger E-Wallet',
    href: 'https://github.com/zfhassaan/laravel-wallet',
    problem:
      'Apps that need an in-app wallet usually store a mutable balance column — inviting race conditions, silent tampering, and untraceable money movement, with no audit trail or integrity checks.',
    solution:
      'A ledger-based Laravel e-wallet (<span class="mono">composer require zfhassaan/laravel-wallet</span>) where balance is derived from immutable transactions — atomic transfers with row-level locking, balance-hash tamper detection &amp; auto-freeze, QR wallet-to-wallet payments, rate limiting, password protection, and a full UUID audit trail.',
    stack: ['Laravel 12', 'PHP 8.2', 'MySQL', 'Packagist', 'PHPUnit'],
    impact: [
      'Immutable ledger',
      'Tamper detection + auto-freeze',
      'Atomic · row-locked',
      'v1.0.0 · MIT',
    ],
    links: [
      { label: 'Documentation', href: 'https://zfhassaan.github.io/laravel-wallet/', icon: 'docs' },
      { label: 'GitHub', href: 'https://github.com/zfhassaan/laravel-wallet', icon: 'github' },
    ],
    visual: {
      type: 'schema',
      rows: [
        { boxes: [{ icon: '💸', text: 'Transfer Request', highlight: true }] },
        { boxes: [{ icon: '🔒', text: 'Atomic Txn · Row Lock' }] },
        {
          boxes: [
            { icon: '➕', text: 'Credit', small: true },
            { icon: '➖', text: 'Debit', small: true },
            { icon: '📲', text: 'QR Pay', small: true },
          ],
        },
        { boxes: [{ icon: '🧾', text: 'Ledger · Balance Hash', highlight: true }] },
      ],
    },
  },
  {
    id: 'laravel-amqp',
    tag: 'Open Source · Collaborator',
    title: 'Laravel AMQP — RabbitMQ Toolkit',
    href: 'https://github.com/bschmitt/laravel-amqp',
    subtitle:
      'Community package by <span class="mono">bschmitt/laravel-amqp</span> — I\'m a collaborator on the upstream repo with 6 merged PRs.',
    problem:
      'The community package <span class="mono">bschmitt/laravel-amqp</span> (2.2M+ downloads) had drifted behind modern Laravel/PHP releases. Official docs no longer matched the config, and higher-level messaging patterns were hard to adopt without clear guidance.',
    solution:
      '<strong>Upstream (collaborator):</strong> Added as a collaborator with 6 merged PRs — Laravel 8→13 &amp; PHP 7.3→8.5 compatibility, CI matrix modernization, and production fixes.<br><br><strong>Docs &amp; features:</strong> Keep the package current with RPC, sagas, dead-letter handling, <span class="mono">#[Retry]</span>, and monitoring. Rebuilt modular documentation to match the real config — published at <span class="mono">zfhassaan.github.io/laravel-amqp</span>.',
    stack: ['Laravel', 'PHP 8', 'RabbitMQ', 'php-amqplib', 'GitHub Actions', 'PHPUnit'],
    impact: [
      '6 merged PRs · upstream',
      'Collaborator · upstream access',
      'Rebuilt docs · latest features',
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
]
