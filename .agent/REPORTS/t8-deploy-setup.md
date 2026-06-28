# T8 — Deploy setup (operator steps)

Everything code-side is done. To take the SvelteKit site live on Cloudflare
Pages at `stephenredding.com`, the operator completes the steps below. Nothing
is pushed to origin yet, so the **current live site (old Hugo on GitHub Pages)
is unaffected** until the DNS cutover in step 6.

Prerequisites: a Cloudflare account; for the lead-form email, a Microsoft 365
tenant with a mailbox to send from (see step 4 — if you have no M365, the form
needs a different email transport; tell me and I'll swap it).

---

## 1. Cloudflare credentials

- Account ID: `npx wrangler whoami` (after `npx wrangler login`), or CF dashboard → Workers & Pages (right sidebar).
- API token: CF dashboard → My Profile → API Tokens → Create Token → template **"Edit Cloudflare Workers"** (or a token with `Account > Cloudflare Pages > Edit`). Copy it once.

## 2. Create the Pages project (one-time)

```bash
cd ~/Projects/stephenredding.com
npx wrangler pages project create stephenredding-com --production-branch main
```

(Or it auto-creates on first deploy. The name must match `wrangler.jsonc` → `stephenredding-com`.)

## 3. GitHub secrets + variable (for the deploy workflow)

```bash
gh secret set CLOUDFLARE_API_TOKEN      # paste token from step 1
gh secret set CLOUDFLARE_ACCOUNT_ID     # paste account id from step 1
gh variable set PUBLIC_CF_ANALYTICS_TOKEN   # CF Web Analytics site tag (public; empty ok for now)
```

## 4. Lead-form secrets (Cloudflare Pages, encrypted) — for the Discovery Call email

Microsoft Graph (client-credentials) app: Entra ID → App registrations → New →
add **application** permission `Mail.Send` (admin-consent) → create a client
secret. Then:

```bash
npx wrangler pages secret put TURNSTILE_SECRET_KEY --project-name stephenredding-com
npx wrangler pages secret put GRAPH_TENANT_ID      --project-name stephenredding-com
npx wrangler pages secret put GRAPH_CLIENT_ID       --project-name stephenredding-com
npx wrangler pages secret put GRAPH_CLIENT_SECRET   --project-name stephenredding-com
npx wrangler pages secret put GRAPH_SENDER          --project-name stephenredding-com   # M365 mailbox UPN to send AS
# optional: GRAPH_TO (defaults to profile.email)
```

## 5. Public vars (Turnstile sitekey + analytics) — CF Pages dashboard or `wrangler.jsonc`

Turnstile: CF dashboard → Turnstile → add a widget for `stephenredding.com` →
copy the **sitekey** (public) and **secret** (→ step 4). Set the public values
either in `wrangler.jsonc` `vars` (commit) or CF Pages → Settings → Variables:
`PUBLIC_TURNSTILE_SITEKEY`, `PUBLIC_CF_ANALYTICS_TOKEN`.

## 6. Custom domain + DNS cutover (GitHub Pages → Cloudflare Pages)

1. CF Pages → the project → Custom domains → add `stephenredding.com` (and `www`).
2. Point DNS at Cloudflare Pages (if the domain's DNS is on Cloudflare, this is automatic; otherwise update the registrar CNAME/A records as CF instructs).
3. This is the moment the live site switches from GitHub Pages to Cloudflare Pages.

## 7. Deploy

After T9 (remove Hugo, incl. the old `hugo.yml` GitHub Pages workflow) is
merged, push `main`:

```bash
cd ~/Projects/stephenredding.com && git push origin main
```

The `deploy.yml` workflow runs check → build → `wrangler pages deploy`. Then
verify (T10): the live domain serves the SvelteKit site over HTTPS, the form
sends a real email, the analytics beacon loads, and the conformance surface
(robots/sitemap/JSON-LD/CSP) is present.
