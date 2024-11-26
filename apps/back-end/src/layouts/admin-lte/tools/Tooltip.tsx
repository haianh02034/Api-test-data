import { TOOLTIP_ID } from '@back-end/utils';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

const Tooltip = () => {
  return <ReactTooltip id={TOOLTIP_ID} />;
};

export default Tooltip;
