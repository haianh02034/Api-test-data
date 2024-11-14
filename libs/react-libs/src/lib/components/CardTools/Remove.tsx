import { createRef } from 'react';

export const Remove = () => {
  const toolRef = createRef<HTMLDivElement>();

  const handeRemove = () => {
    if (!toolRef?.current) {
      return;
    }

    const card = toolRef?.current?.closest('.card');
    if (!card) {
      return;
    }
    card.classList.add('card-none');
  };
  return (
    <div className="btn btn-sm" onClick={handeRemove} ref={toolRef}>
      <i className="fas fa-times"></i>
    </div>
  );
};
