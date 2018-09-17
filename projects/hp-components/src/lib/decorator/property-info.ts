const metaKey = 'propertyInfo';
export function PropertyInfo(displayName: string, description: string, category: string) {
  return (target: any, key: string) =>  {
    const propType = Reflect.getMetadata('design:type', target, key);
    Reflect.defineMetadata(metaKey,
      { displayName: displayName, description: description, category: category, propertyType: propType.name},
      target, key);
  };
}

export function getPropertyInfo(component: object, propertyName: string): any {
  return Reflect.getMetadata(metaKey, component, propertyName);
}

