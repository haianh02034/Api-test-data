import { useTranslation } from 'react-i18next';

export const useTrans = (): any => {
  const { t } = useTranslation();
  return t;
};
