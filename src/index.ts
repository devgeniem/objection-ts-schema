import 'reflect-metadata';
export function addSchema(target: any, propertyKey: string | symbol): void {
  const type = Reflect.getMetadata('design:type', target, propertyKey);
  if (!target.constructor['jsonSchema']) {
    target.constructor['jsonSchema'] = {
      type: 'object',
      properties: {}
    };
  }
  if (!target.constructor['jsonSchema'].properties)
    target.constructor['jsonSchema'].properties = {};
  if (!target.constructor['jsonSchema'].type) target.constructor['jsonSchema'].type = 'object';
  target.constructor['jsonSchema'].properties[propertyKey] = { type: type.name.toLowerCase() };
}
