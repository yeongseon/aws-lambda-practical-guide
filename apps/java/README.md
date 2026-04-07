# Java Lambda Reference App

Minimal Java Lambda function fronted by API Gateway HTTP API.

## Files

- `src/main/java/com/example/Handler.java` — RequestHandler implementation returning `{"message":"ok"}`
- `pom.xml` — Maven configuration with Lambda dependencies
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
    --stack-name "java-lambda-reference-app" \
    --region "$REGION" \
    --capabilities CAPABILITY_IAM
```

## Test

After deployment, request the output URL from the stack outputs and call it with `curl`.
