# AGENTS.md

Guidance for AI agents working in this repository.

## Project Overview

**AWS Lambda Practical Guide** — a unified documentation hub and reference applications for building, deploying, and operating serverless applications on AWS Lambda.

- **Live site**: <https://yeongseon.github.io/aws-lambda-practical-guide/>
- **Repository**: <https://github.com/yeongseon/aws-lambda-practical-guide>

## Repository Structure

```text
.
├── .github/
│   └── workflows/              # GitHub Pages deployment
├── apps/
│   ├── python/                 # Python reference Lambda function
│   ├── nodejs/                 # Node.js reference Lambda function
│   ├── java/                   # Java reference Lambda function
│   └── dotnet/                 # .NET reference Lambda function
├── docs/
│   ├── assets/                 # Images, icons
│   ├── best-practices/         # Production patterns and anti-patterns (8 pages)
│   ├── javascripts/            # Mermaid zoom JS
│   ├── language-guides/
│   │   ├── python/             # Python — 7 tutorials + 14 recipes
│   │   ├── nodejs/             # Node.js — 7 tutorials + 14 recipes
│   │   ├── java/               # Java — 7 tutorials + 10 recipes
│   │   └── dotnet/             # .NET — 7 tutorials + 10 recipes
│   ├── operations/             # Day-2 operational execution (10 pages)
│   ├── platform/               # Architecture and design decisions (9 pages)
│   ├── reference/              # CLI cheatsheet, service limits, diagnostics (7 pages)
│   ├── start-here/             # Overview, learning paths, repository map (3 pages)
│   ├── stylesheets/            # Custom CSS
│   └── troubleshooting/        # Troubleshooting hub (55+ pages)
│       ├── architecture-overview.md
│       ├── decision-tree.md
│       ├── mental-model.md
│       ├── evidence-map.md
│       ├── quick-diagnosis-cards.md
│       ├── cloudwatch/         # CloudWatch Logs Insights query library (14 pages)
│       │   ├── invocation/     # Invocation queries (error rate, throttles, cold starts)
│       │   ├── application/    # App queries (timeout errors, runtime exceptions)
│       │   ├── platform/       # Platform queries (deploy events, memory)
│       │   └── correlation/    # Correlation queries (deploy-vs-errors)
│       ├── first-10-minutes/   # Checklists by symptom category (4 pages)
│       ├── lab-guides/         # Hands-on troubleshooting labs (11 pages)
│       ├── methodology/        # Troubleshooting method, log sources (2 pages)
│       └── playbooks/          # 17 playbooks by category
│           ├── invocation-errors/    # 7 playbooks
│           ├── performance/          # 5 playbooks
│           └── networking/           # 5 playbooks
└── mkdocs.yml                  # MkDocs Material configuration (7-tab nav)
```

## Content Categories

| Section | Purpose | Page Count |
|---|---|---|
| **Start Here** | Entry points, learning paths, repository map | 3 |
| **Platform** | Architecture, design decisions — WHAT and HOW it works | 9 |
| **Best Practices** | Production patterns — HOW to use the platform well | 8 |
| **Language Guides** | Per-language step-by-step tutorials and recipes | 84 |
| **Operations** | Day-2 execution — HOW to run in production | 10 |
| **Troubleshooting** | Diagnosis and resolution — hypothesis-driven | 55+ |
| **Reference** | Quick lookup — CLI, limits, environment variables | 7 |

## Documentation Conventions

### File Naming

- Tutorial: `XX-topic-name.md` (numbered for sequence)
- All others: `topic-name.md` (kebab-case)

### CLI Command Style

```bash
# ALWAYS use long flags for readability
aws lambda create-function --function-name $FUNCTION_NAME --runtime python3.12 --handler app.handler

# NEVER use short flags in documentation
aws lambda create-function -f $FUNCTION_NAME  # Don't do this
```

### Variable Naming Convention

| Variable | Description | Example |
|----------|-------------|---------|
| `$FUNCTION_NAME` | Lambda function name | `my-api-handler` |
| `$FUNCTION_ARN` | Lambda function ARN | `arn:aws:lambda:$REGION:<account-id>:function:$FUNCTION_NAME` |
| `$LAYER_ARN` | Lambda layer ARN | `arn:aws:lambda:$REGION:<account-id>:layer:my-layer:1` |
| `$ALIAS_NAME` | Function alias name | `prod` |
| `$REGION` | AWS region | `ap-northeast-2` |
| `$ACCOUNT_ID` | AWS account ID placeholder | `<account-id>` |
| `$VPC_ID` | VPC identifier | `vpc-xxxxxxxx` |
| `$SUBNET_ID` | Subnet identifier | `subnet-xxxxxxxx` |
| `$ROLE_ARN` | IAM execution role ARN | `arn:aws:iam::<account-id>:role/lambda-exec` |
| `$API_ID` | API Gateway API ID | `abcdef1234` |

### PII Removal (Quality Gate)

**CRITICAL**: All CLI output examples MUST have PII removed.

Patterns to mask:

- AWS Account IDs: `<account-id>`
- ARNs: mask account portion
- Access Keys: NEVER include
- IP addresses: `x.x.x.x` or `10.0.x.x` for private
- Function ARNs: use `<account-id>` placeholder in account position

### Admonition Indentation Rule

For MkDocs admonitions, every line in the body must be indented by **4 spaces**.

### Mermaid Diagrams

All architectural diagrams use Mermaid. Every documentation page should include at least one diagram.

### Nested List Indentation

All nested list items MUST use **4-space indent** (Python-Markdown standard).

### Tail Section Naming

Every document ends with these tail sections (in this order):

| Section | Purpose | Content |
|---|---|---|
| `## See Also` | Internal cross-links within this repository | Links to other pages in this guide |
| `## Sources` | External authoritative references | Links to AWS official documentation (primary) |

- `## See Also` is required on every page.
- `## Sources` is required when external references are cited. Omit if none exist.
- Order is always `## See Also` → `## Sources` (never reversed).
- All content must be based on AWS official documentation with cited sources.

### Source Policy

- **Primary source**: AWS official documentation (docs.aws.amazon.com)
- **No third-party sources**: Blog posts, tutorials, Stack Overflow answers are NOT allowed
- Every factual claim should be traceable to an AWS documentation page

## Build & Preview

```bash
# Install MkDocs dependencies
pip install mkdocs-material mkdocs-minify-plugin

# Build documentation (strict mode catches broken links)
mkdocs build --strict

# Local preview
mkdocs serve
```

## Git Commit Style

```text
type: short description
```

Allowed types: `feat`, `fix`, `docs`, `chore`, `refactor`
