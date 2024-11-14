import React from 'react';
import { NoData } from '..';

export const CardNoData = ({
  cardClass = 'card-info',
  title,
  content,
}: {
  cardClass?: string;
  title?: string | React.ReactElement;
  content?: string | React.ReactElement;
}) => {
  return (
    <div className={`card ${cardClass}`}>
      {title ? (
        <div className="card-header">
          <h3 className="card-title text-capitalize text-truncate">{title}</h3>
        </div>
      ) : null}
      <div className="card-body">
        <NoData content={content} />
      </div>
    </div>
  );
};
