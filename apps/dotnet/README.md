# .NET Lambda Reference App

Minimal .NET Lambda function fronted by API Gateway HTTP API.

## Files

- `src/Function.cs` — Lambda handler returning `{"message":"ok"}`
- `src/LambdaGuide.csproj` — project file with Lambda NuGet packages
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
    --stack-name "dotnet-lambda-reference-app" \
    --region "$REGION" \
    --capabilities CAPABILITY_IAM
```

## Test

After deployment, request the output URL from the stack outputs and call it with `curl`.
