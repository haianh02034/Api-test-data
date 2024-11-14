import { listIds } from '@utils';

const config: {
  superAdminIds?: number[];
} = {
  superAdminIds: listIds(process?.env?.SUPPER_ADMIN_IDS || ''),
};

export default config;
