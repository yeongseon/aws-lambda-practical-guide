# Lambda Security Operations

Security operations on Lambda focus on continuous review of execution roles, resource policies, code integrity controls, network boundaries, and secret rotation.

## When to Use

- Use during periodic operational reviews.
- Use before major releases or account boundary changes.
- Use after incidents involving unauthorized access, permission drift, or unexpected network paths.

## Security Review Loop

```mermaid
flowchart LR
    A[Review IAM role and policies] --> B[Review Lambda resource policy]
    B --> C[Validate code signing and deployment path]
    C --> D[Review VPC and security groups]
    D --> E[Rotate and verify secrets]
```

## Execution Role Auditing

Review the function execution role regularly to ensure least privilege remains true.

```bash
aws lambda get-function-configuration \
    --function-name "$FUNCTION_NAME" \
    --region "$REGION"

aws iam list-attached-role-policies \
    --role-name "lambda-exec" \
    --region "$REGION"

aws iam get-role-policy \
    --role-name "lambda-exec" \
    --policy-name "inline-policy-name" \
    --region "$REGION"
```

Focus on:

- Wildcard actions and resources
- Old service permissions no longer required
- Overly broad KMS, Secrets Manager, or network interface permissions

## Resource Policy Review

Lambda resource-based policies control who can invoke or manage access to the function.

```bash
aws lambda get-policy \
    --function-name "$FUNCTION_NAME" \
    --region "$REGION"
```

Check for:

- Old API Gateway, EventBridge, or S3 permissions
- Cross-account permissions that are no longer needed
- Statements that are wider than required by source account or source ARN

## Code Signing Validation

Use code signing when release integrity and publisher trust must be enforced for zip deployments.

```bash
aws lambda get-function-code-signing-config \
    --function-name "$FUNCTION_NAME" \
    --region "$REGION"
```

Operationally, confirm that:

- The function is associated with the intended code-signing configuration.
- Signing profiles and allowed publishers are still valid.
- Release tooling does not bypass the expected package path.

## VPC Security Group Management

If the function runs in a VPC, review network controls with the same rigor as compute permissions.

```bash
aws lambda get-function-configuration \
    --function-name "$FUNCTION_NAME" \
    --region "$REGION"

aws ec2 describe-security-groups \
    --group-ids "sg-xxxxxxxxxxxxxxxxx" \
    --region "$REGION"
```

Review:

- Egress rules that allow more than required
- Security groups shared too broadly across unrelated applications
- Subnet placement versus intended data and egress paths

## Secrets Manager Rotation

Use Secrets Manager rotation where supported by the secret type and application design.

```bash
aws secretsmanager describe-secret \
    --secret-id "prod/orders-api/database" \
    --region "$REGION"

aws secretsmanager rotate-secret \
    --secret-id "prod/orders-api/database" \
    --region "$REGION"
```

After rotation, verify the Lambda function can still retrieve and use the new secret version.

## Operational Security Checklist

| Area | Review question |
|---|---|
| IAM role | Does the function still have only the permissions it needs? |
| Resource policy | Can only intended principals invoke it? |
| Code signing | Can only trusted packages be deployed? |
| VPC controls | Are network paths limited to required destinations? |
| Secrets | Are secrets rotated and access-scoped correctly? |

## Verification

- Confirm IAM role review items have tracked remediation.
- Confirm resource policy statements are current and minimally scoped.
- Confirm code-signing config exists where mandated.
- Confirm VPC and security groups match the current architecture.
- Confirm secret rotation succeeds without runtime authentication failures.

## See Also

- [Environment Management](./environment-management.md)
- [Updates and Patching](./updates-and-patching.md)
- [Security](../best-practices/security.md)
- [Security Model](../platform/security-model.md)

## Sources

- https://docs.aws.amazon.com/lambda/latest/dg/lambda-permissions.html
- https://docs.aws.amazon.com/lambda/latest/dg/configuration-vpc.html
- https://docs.aws.amazon.com/lambda/latest/dg/configuration-codesigning.html
- https://docs.aws.amazon.com/secretsmanager/latest/userguide/rotating-secrets.html
- https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html
