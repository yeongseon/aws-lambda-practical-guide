# Python Lambda Reference App

Minimal Python Lambda function fronted by API Gateway HTTP API.

## Files

- `app.py` — Lambda handler returning `{"message":"ok"}`
- `template.yaml` — AWS SAM template
- `requirements.txt` — dependency manifest

## Build

```bash
sam build \
    --template-file template.yaml
```

## Deploy

```bash
sam deploy \
    --guided \
    --stack-name "python-lambda-reference-app" \
    --region "$REGION" \
    --capabilities CAPABILITY_IAM
```

## Test

After deployment, request the output URL from the stack outputs and call it with `curl`.
