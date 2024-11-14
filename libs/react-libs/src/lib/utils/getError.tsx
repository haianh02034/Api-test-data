import { FieldError, FieldErrors } from 'react-hook-form';

export const getError = (
  errors: FieldErrors,
  name: string | undefined
): FieldError | undefined => {
  if (!errors || !name?.length) {
    return;
  }
  const names = name.replace(/\]+/g, '').split(/[\.\\[]+/);
  return names.reduce((output: any, _name) => {
    if (!output || typeof output[_name] === undefined) {
      return '';
    }
    return output[_name];
  }, errors);
};
