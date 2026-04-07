# Recipe: Create and Use Lambda Layers

Use this recipe to share dependencies, configuration files, or reusable assets across multiple Node.js Lambda functions.

## Layer Folder Structure

For Node.js, place packages under the runtime-specific path:

```text
layer/
└── nodejs/
    ├── package.json
    └── node_modules/
```

## Example Function

```javascript
import { readFile } from "node:fs/promises";

export const handler = async () => {
    const config = await readFile("/opt/config/shared.json", "utf8");
    return {
        statusCode: 200,
        body: config,
    };
};
```

## SAM Template

```yaml
Resources:
  SharedLayer:
    Type: AWS::Serverless::LayerVersion
    Properties:
      LayerName: shared-node-assets
      ContentUri: layer
      CompatibleRuntimes:
        - nodejs20.x

  LayerConsumerFunction:
    Type: AWS::Serverless::Function
    Properties:
      Runtime: nodejs20.x
      Handler: src/handler.handler
      CodeUri: .
      Layers:
        - !Ref SharedLayer
```

## Direct Publish with AWS CLI

```bash
zip --recurse-paths layer.zip nodejs config
aws lambda publish-layer-version \
    --layer-name shared-node-assets \
    --zip-file fileb://layer.zip \
    --compatible-runtimes nodejs20.x \
    --region "$REGION"
```

## Verify

Attach the resulting `$LAYER_ARN` to a function and invoke it.
The function should read content from `/opt` or resolve packages supplied by the layer.

```mermaid
flowchart LR
    A[Layer archive] --> B[Publish layer version]
    B --> C[Attach layer ARN to function]
    C --> D[/opt content available at runtime]
```

## Notes

- Layers are versioned resources.
- Keep shared content stable and broadly reusable.
- Rebuild the layer when dependency versions change.

## See Also

- [Configuration Tutorial](../03-configuration.md)
- [Docker Image Recipe](./docker-image.md)
- [Node.js Runtime Reference](../nodejs-runtime.md)
- [Recipe Catalog](./index.md)

## Sources

- [Managing Lambda dependencies with layers](https://docs.aws.amazon.com/lambda/latest/dg/chapter-layers.html)
- [Working with layers for Node.js Lambda functions](https://docs.aws.amazon.com/lambda/latest/dg/nodejs-layers.html)
- [PublishLayerVersion](https://docs.aws.amazon.com/lambda/latest/api/API_PublishLayerVersion.html)
