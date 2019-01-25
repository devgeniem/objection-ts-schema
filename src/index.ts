import 'reflect-metadata';

const emptyJsonSchema = {
  type: 'object',
  properties: {}
}

type FieldType = 'boolean' | 'object' | 'array' | 'number' | 'string' | 'null'
type Key = symbol | string

const getType = (target, propertyKey : Key) : FieldType => {
  const type = Reflect.getMetadata('design:type', target, propertyKey);

  if (type == null || type == undefined) {
    return 'null'
  }
  let typeName = type.name
  if (typeof typeName != 'string') {
    return 'object'
  }
  
  typeName = typeName.toLowerCase()
  switch (typeName) {
    case 'boolean':
    case 'object':
    case 'array':
    case 'number':
    case 'string':
    case 'null':
      return typeName;
    default:
      return 'object';
  }
}

export function addSchema(isRequired?: Boolean) {
  return function (target : any, propertyKey : Key) : void {
    const type = getType(target, propertyKey)

    const {jsonSchema: existingSchema} = target.constructor;
    const decoratorSchema: any = Object.assign({}, emptyJsonSchema);
    decoratorSchema.properties[propertyKey] = {
      type,
    }

    // settings jsonSchema required - array here
    // don't do anything to required - array if isRequired is undefined
    if (isRequired != undefined) {
      const required: Key[] = Array.from(existingSchema ? existingSchema.required || [] : []);
      const requiredPropertyIndex = required.indexOf(propertyKey)
      if (isRequired && requiredPropertyIndex == -1) {
        // add property key to required - array if it is missing
        required.push(propertyKey)
      }
      else if (!isRequired && requiredPropertyIndex != -1) {
        // remove property key from required - array if it is present
        required.splice(requiredPropertyIndex, 1)
      }
      decoratorSchema.required = required
    }

    target.constructor.jsonSchema = Object.assign({}, existingSchema, decoratorSchema);
  }
}
