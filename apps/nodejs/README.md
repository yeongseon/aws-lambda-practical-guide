# Node.js Lambda Reference App

Minimal ESM-based Node.js Lambda function fronted by API Gateway HTTP API.

## Files

- `index.mjs` — Lambda handler returning `{"message":"ok"}`
- `package.json` — minimal Node.js project metadata
- `template.yaml` — AWS SAM template

## Build

```bash
sam build \
    --template-file template.yaml
```

## Deploy

```bash
sam deploy \
    --guided \
    --stack-name "nodejs-lambda-reference-app" \
    --region "$REGION" \
    --capabilities CAPABILITY_IAM
```

## Test

After deployment, request the output URL from the stack outputs and call it with `curl`.
