# Performance Best Practices

Lambda performance is mostly about reducing unnecessary initialization, choosing the right memory size, and keeping downstream calls efficient.

Cold starts matter, but they are only one part of end-to-end latency.

## Performance Levers

```mermaid
flowchart TB
    A[Performance] --> B[Memory tuning]
    A --> C[Cold start reduction]
    A --> D[Connection reuse]
    A --> E[Lazy initialization]
    A --> F[/tmp caching]
    A --> G[SnapStart for Java]
```

## Memory Tuning First

Memory is both a cost lever and a speed lever because more memory also increases CPU allocation.

Best practice:

- Benchmark multiple memory sizes with realistic payloads.
- Compare both duration and total cost.
- Do not assume lower memory is cheaper overall.

## Cold Start Reduction

Reduce cold start impact by:

- Keeping deployment packages and dependency trees lean.
- Avoiding unnecessary VPC attachment.
- Moving only truly reusable initialization to global scope.
- Using provisioned concurrency for latency-critical functions.
- Using SnapStart for supported Java runtimes where appropriate.

## Connection Reuse

Create SDK clients and HTTP connection pools outside the handler when the runtime supports it.

Benefits:

- Lower per-invocation setup overhead.
- Fewer repeated TLS handshakes.
- Better warm-start efficiency.

## Lazy Initialization

Not all initialization should happen during cold start.

Lazy-load components when:

- They are only needed on some request paths.
- Startup latency matters more than first-use latency for those components.
- The dependency is heavy and infrequently used.

## `/tmp` Caching

Use `/tmp` to cache downloaded or transformed artifacts that are expensive to reconstruct.

Examples:

- ML model fragments.
- Certificate bundles.
- Temporary transformed files.

Always assume the cache can disappear with the next environment replacement.

## SnapStart for Java

SnapStart can reduce startup latency for supported Java functions by resuming from a pre-initialized snapshot.

Use it when:

- Java startup cost is a major latency factor.
- Initialization code is compatible with restore semantics.

## Performance Testing Loop

```mermaid
flowchart LR
    A[Test realistic payloads] --> B[Adjust memory or init strategy]
    B --> C[Measure duration and cost]
    C --> D[Repeat until stable baseline]
```

## Practical Rules

1. Tune memory before chasing micro-optimizations.
2. Reuse connections and SDK clients.
3. Keep initialization small and purposeful.
4. Cache only what is safe to lose.
5. Use provisioned concurrency or SnapStart only where measured need exists.

## See Also

- [Platform Execution Model](../platform/execution-model.md)
- [Platform Networking](../platform/networking.md)
- [Production Baseline](./production-baseline.md)
- [Deployment](./deployment.md)
- [Home](../index.md)

## Sources

- [Best practices for working with AWS Lambda functions](https://docs.aws.amazon.com/lambda/latest/dg/best-practices.html)
- [Operating Lambda: performance optimization](https://docs.aws.amazon.com/lambda/latest/dg/best-practices.html#function-configuration)
- [Configuring ephemeral storage for Lambda functions](https://docs.aws.amazon.com/lambda/latest/dg/configuration-ephemeral-storage.html)
- [Configuring provisioned concurrency for a function](https://docs.aws.amazon.com/lambda/latest/dg/provisioned-concurrency.html)
- [Improving startup performance with Lambda SnapStart](https://docs.aws.amazon.com/lambda/latest/dg/snapstart.html)
- [AWS Lambda Power Tuning](https://docs.aws.amazon.com/lambda/latest/dg/configuration-memory.html)
