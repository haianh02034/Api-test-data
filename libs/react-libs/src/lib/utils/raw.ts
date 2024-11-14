import parse from 'html-react-parser';

export const raw = (string: string) => {
  return parse(string);
};
