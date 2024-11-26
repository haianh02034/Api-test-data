import { StrictMode, Suspense } from 'react';
import * as ReactDOM from 'react-dom/client';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';

import { persistor, store } from './store';
import { languages } from '@back-end/configs';
import Routes from './routes';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Provider store={store}>
    <I18nextProvider i18n={languages}>
      <PersistGate loading={null} persistor={persistor}>
        <Suspense fallback="">
          <Routes />
        </Suspense>
      </PersistGate>
    </I18nextProvider>
  </Provider>
);
