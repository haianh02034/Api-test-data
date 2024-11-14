import { createRef, useEffect, useState } from 'react';

export const Collapse = ({ collapsed }: { collapsed?: boolean }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const toolRef = createRef<HTMLDivElement>();

  useEffect(() => {
    setIsCollapsed(!!collapsed);
  }, [collapsed]);

  useEffect(() => {
    if (!toolRef?.current || !toolRef?.current) {
      return;
    }

    const card = toolRef?.current?.closest('.card');
    if (!card) {
      return;
    }

    if (isCollapsed) {
      card.classList.add('collapsed');
    } else {
      card.classList.remove('collapsed');
    }
  }, [toolRef, isCollapsed]);

  return (
    <div className="btn btn-sm" onClick={() => setIsCollapsed(!isCollapsed)} ref={toolRef}>
      {(isCollapsed && <i className="fas fa-plus"></i>) || <i className="fas fa-minus"></i>}
    </div>
  );
};
