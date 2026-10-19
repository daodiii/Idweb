// Run with: node --test tools/test-email-actions.mjs
// Execute the real actions and validation with email transport intercepted: no mail is sent.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';
import ts from 'typescript';
import { Resend } from 'resend';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

function loadActions(key = 're_test', outcome = 'success') {
  const sent = [];
  let clients = 0;
  class TestResend {
    constructor(apiKey) {
      clients++;
      const client = new Resend(apiKey); // Use the SDK's real missing-key behavior.
      client.emails.send = async (payload) => {
        sent.push(payload);
        if (outcome === 'throw') throw new Error('Transport unavailable');
        return { error: outcome === 'error' ? { message: 'Delivery rejected' } : null };
      };
      return client;
    }
  }
  const env = key === null ? {} : { RESEND_API_KEY: key };
  function load(file) {
    const mod = { exports: {} };
    const source = ts.transpileModule(fs.readFileSync(path.join(root, file), 'utf8'), {
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
    }).outputText;
    vm.runInNewContext(source, {
      exports: mod.exports, module: mod, process: { env },
      console: { error() {} },
      require(id) {
        if (id === 'resend') return { Resend: TestResend };
        if (id === '@/lib/emails/contact-form-email') return { ContactFormEmail: (props) => props };
        if (id === '@/lib/emails/quote-request-email') return { QuoteRequestEmail: (props) => props };
        if (id.startsWith('@/lib/home/')) return load('src/' + id.slice(2) + '.ts');
        throw new Error('Unexpected import: ' + id);
      },
    }, { filename: file });
    return mod.exports;
  }
  return { actions: load('src/app/actions/send-email.ts'), sent, clients: () => clients };
}

function form(overrides = {}) {
  const data = new FormData();
  const fields = {
    loaded_at: String(Date.now() - 10000), name: 'Test Person',
    email: 'test@example.com', company: 'Example AS', message: 'Vi trenger en nettside.',
    mode: 'ny', pages: '5', url: 'https://example.com', ...overrides,
  };
  for (const [key, value] of Object.entries(fields)) data.set(key, value);
  return data;
}

for (const action of ['sendContactEmail', 'sendQuoteRequest']) {
  test(`${action}: delivers a message containing a website link`, async () => {
    const h = loadActions();
    const data = form({ message: 'Her er nettsiden vår: https://example.com' });
    data.append('needs', 'Nettside');
    data.append('needs', 'Not an allowed choice');
    const result = await h.actions[action](null, data);
    assert.equal(result.success, true);
    assert.equal(h.sent.length, 1);
    assert.equal(h.sent[0].replyTo, 'test@example.com');
    assert.ok(!h.sent[0].subject.startsWith('[Mulig spam]'));
    const body = JSON.stringify(h.sent[0].react);
    assert.ok(body.includes('https://example.com'));
    if (action === 'sendContactEmail') {
      assert.ok(body.includes('Trenger: Nettside'));
      assert.ok(!body.includes('Not an allowed choice'));
    } else {
      assert.ok(body.includes('Omtrent 5 sider'));
    }
  });

  test(`${action}: flags borderline content instead of discarding it`, async () => {
    for (const fields of [
      { message: 'We need SEO services for our business.' },
      { company: 'https://example.com' },
      { message: 'Hei, Привет, vi trenger hjelp.' },
      { message: '<p>Vi trenger hjelp med nettsiden.</p>' },
    ]) {
      const h = loadActions();
      assert.equal((await h.actions[action](null, form(fields))).success, true);
      assert.equal(h.sent.length, 1);
      assert.ok(h.sent[0].subject.startsWith('[Mulig spam] '));
    }
  });

  test(`${action}: preserves bot traps without creating an email client`, async () => {
    for (const fields of [
      { fax_number: 'spam' }, { loaded_at: String(Date.now()) }, { loaded_at: '' },
      { name: 'https://spam.example' }, { name: '<a>spam</a>' },
    ]) {
      const h = loadActions();
      assert.equal((await h.actions[action](null, form(fields))).success, true);
      assert.equal(h.sent.length, 0);
      assert.equal(h.clients(), 0);
    }
  });

  test(`${action}: rejects invalid email before attempting delivery`, async () => {
    const h = loadActions();
    assert.equal((await h.actions[action](null, form({ email: 'invalid' }))).success, false);
    assert.equal(h.clients(), 0);
  });

  test(`${action}: missing key is handled on submission, not module import`, async () => {
    for (const key of [null, '']) {
      const h = loadActions(key);
      assert.equal(h.clients(), 0);
      assert.equal((await h.actions[action](null, form())).success, false);
      assert.equal(h.sent.length, 0);
    }
  });

  test(`${action}: reports both API rejection and transport failure`, async () => {
    for (const outcome of ['error', 'throw']) {
      const h = loadActions('re_test', outcome);
      assert.equal((await h.actions[action](null, form())).success, false);
      assert.equal(h.sent.length, 1);
    }
  });
}
