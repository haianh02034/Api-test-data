import { LoadingOverlay } from '@react-libs/components/Common';
import { lazy, Suspense, ComponentType } from 'react';

export const LazyLoad = (importFunc: () => Promise<{ default: ComponentType<any> }>) => {
  const LazyComponent = lazy(importFunc);
  return ({ ...props }) => (
    <Suspense fallback={<LoadingOverlay />}>
      <LazyComponent {...props} />
    </Suspense>
  );
};
