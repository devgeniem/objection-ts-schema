import "reflect-metadata";
export function addSchema(target: any, propertyKey: string | symbol): void {
  const type = Reflect.getMetadata("design:type", target, propertyKey);
  if (!target.jsonSchema) {
    target.jsonSchema = {
      type: "object",
      properties: {}
    };
  }
  target.jsonSchema.properties[propertyKey] = { type: type.name.toLowerCase() };
}