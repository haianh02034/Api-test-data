export const repo = (entity: any): string => {
  const entityName = entity?.inverseEntityMetadata?.targetName || entity?.name || entity;
  return `REPOSITORIES.${entityName.toUpperCase()}`;
};
