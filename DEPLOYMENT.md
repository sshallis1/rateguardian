# Deployment Notes

## Root cause: invalid Vercel Function runtime override
The repository contains only standard Vercel serverless functions under `api/` and a minimal `vercel.json` with `{"version": 2}`. No files define custom runtimes or legacy `now-*` configuration. The build error:

```
Function Runtimes must have a valid version, for example now-php@1.0.0
```

occurs when a project-level runtime override is set to a legacy value (e.g., `now-node` without a version). Because the repo provides no such overrides, the invalid runtime is coming from the Vercel **Project Settings**.

## How to fix in Vercel
1. Open Vercel Dashboard → **RateGuardian** project → **Settings** → **Functions**.
2. In **Runtime**, choose **Default (Node.js 18.x)** (or the current default Node option). Remove any legacy value such as `now-node`/`now-php` or custom strings without a version.
3. Save the setting and redeploy (`vercel --prod` or trigger a Deploy button). The build should complete once the invalid runtime override is removed.

## Why the repo is clean
- `vercel.json` contains only `{ "version": 2 }` and no `functions`/`builds` block.
- There is no `now.json`, `.vercel` config, or other runtime declarations under the repo tree.

## Verification checklist
- Run `vercel build` locally or via CI; it should finish without the runtime error once the project setting is corrected.
- After deployment, verify functions are listed under **Project → Deployments → Functions**.
- Confirm routing responds: `curl -i -X POST https://rateguardian.vercel.app/api/classify-test-contacts -H "Content-Type: application/json" -d '{}'` should return HTTP 200 (or a JSON validation error, but not 404).
