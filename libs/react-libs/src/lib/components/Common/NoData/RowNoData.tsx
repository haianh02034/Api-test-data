import { NoData } from './NoData';

export const RowNoData = ({ content }: { content?: string | React.ReactElement }) => (
  <tr>
    <td colSpan={9999}>
      <NoData content={content} />
    </td>
  </tr>
);
