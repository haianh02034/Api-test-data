import { RowDetailJson } from './RowDetailJson';
import { RowDetailString } from './RowDetailString';
import { RowDetailNumber } from './RowDetailNumber';

export const RowDetailAuto = ({
  label,
  content,
  grid,
}: {
  label: string;
  content: unknown;
  grid?: '4-8' | '5-5' | '2-10';
}) => {
  if (typeof content === 'string') {
    if (content[0] === '[' || content[0] === '{') {
      return <RowDetailJson label={label} content={content} grid={grid} />;
    }
  }
  if (typeof content === 'object') {
    return <RowDetailJson label={label} content={JSON.stringify(content)} grid={grid} />;
  }
  if (typeof content === 'number') {
    if (label.includes('Id') || label.includes('ID')) {
      return <RowDetailString label={label} content={content.toString()} grid={grid} />;
    }
    return <RowDetailNumber label={label} content={content} grid={grid} />;
  }
  return <RowDetailString label={label} content={content as string} grid={grid} />;
};
