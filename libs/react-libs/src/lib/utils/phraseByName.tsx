export const phraseByName = (name: string): string => {
  if (!name?.length) {
    return name;
  }

  return name.replace(/([a-z])([A-Z])/g, (...matches) => {
    if (matches?.length > 2) {
      return `${matches?.[1]}_${matches?.[2]?.toLowerCase()}`;
    }
    return '';
  });
};
