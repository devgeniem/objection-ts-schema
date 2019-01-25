# objection-ts-schema

This is a small library for providing better typescript integration with [objection.js](https://github.com/Vincit/objection.js/).

Strictly speaking this isn't really objection - specific. The gist of the library is that you use the `addSchema` - decorator on typescript class fields and it generates a [JSON schema](https://json-schema.org/) - object for the class constructor.

This matches exactly how objection validates models, by having `static jsonSchema` - field that is used for json validation.

## setup

installation:
```
  npm install objection-ts-schema
```

The project this is used in requires few typescript settings to enable decorators and for emitting 
reflection metada.

```json
{
  "compilerOptions": {
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true
  }
}
```



## usage examples

Here's an objection model use-case:

```typescript
import {addSchema} from 'objection-ts-schema'

class Person extends Model {
  @addSchema(true) name: string
  @addSchema(false) age?: number
}
```

addSchema is defined as follows
```typescript
  function addSchema(required?: boolean): void
```
The required parameter is needed to inform the decorator whether the field is optional or not.
As far as we know, [reflect-metadata](https://github.com/rbuckton/reflect-metadata) does not provide a way to determine union types or optional fields.





