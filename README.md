# AWS Lambda Practical Guide

Comprehensive guide for building, deploying, operating, and troubleshooting serverless applications on AWS Lambda — from first function to production troubleshooting.

## What's Inside

| Section | Description |
|---------|-------------|
| [Start Here](https://yeongseon.github.io/aws-lambda-practical-guide/) | Overview, learning paths, and repository map |
| [Platform](https://yeongseon.github.io/aws-lambda-practical-guide/platform/) | Execution model, event sources, concurrency, networking, layers |
| [Best Practices](https://yeongseon.github.io/aws-lambda-practical-guide/best-practices/) | Production baseline, security, networking, deployment, performance, reliability |
| [Language Guides](https://yeongseon.github.io/aws-lambda-practical-guide/language-guides/) | Step-by-step tutorials for Python, Node.js, Java, and .NET |
| [Operations](https://yeongseon.github.io/aws-lambda-practical-guide/operations/) | Deployment strategies, versioning, provisioned concurrency, monitoring, cost optimization |
| [Troubleshooting](https://yeongseon.github.io/aws-lambda-practical-guide/troubleshooting/) | 17 playbooks, decision tree, methodology, log source map |
| [Reference](https://yeongseon.github.io/aws-lambda-practical-guide/reference/) | Lambda CLI cheatsheet, service limits, environment variables |

## Language Guides

- **Python** (Lambda runtime)
- **Node.js** (Lambda runtime)
- **Java** (Lambda runtime + Maven)
- **.NET** (Lambda runtime + .NET CLI)

Each guide covers: local development, first deploy, configuration, logging, infrastructure as code, CI/CD, and custom domains with API Gateway.

## Quick Start

```bash
# Clone the repository
git clone https://github.com/yeongseon/aws-lambda-practical-guide.git

# Install MkDocs dependencies
pip install mkdocs-material mkdocs-minify-plugin

# Start local documentation server
mkdocs serve
```

Visit `http://127.0.0.1:8000` to browse the documentation locally.

## Reference Applications

Minimal reference applications demonstrating Lambda patterns:

- `apps/python/` — Python Lambda function with API Gateway
- `apps/nodejs/` — Node.js Lambda function with API Gateway
- `apps/java/` — Java Lambda function with Maven
- `apps/dotnet/` — .NET Lambda function with .NET CLI

## Contributing

Contributions welcome. Please ensure:
- All CLI examples use long flags (`--function-name`, not `-f`)
- All documents include Mermaid diagrams
- All content references AWS official documentation with source URLs
- No PII in CLI output examples

## Related Projects

| Repository | Description |
|---|---|
| [aws-elastic-beanstalk-practical-guide](https://github.com/yeongseon/aws-elastic-beanstalk-practical-guide) | AWS Elastic Beanstalk practical guide |
| [azure-app-service-practical-guide](https://github.com/yeongseon/azure-app-service-practical-guide) | Azure App Service practical guide |

## Disclaimer

This is an independent community project. Not affiliated with or endorsed by Amazon Web Services. AWS and Lambda are trademarks of Amazon.com, Inc.

## License

[MIT](LICENSE)
