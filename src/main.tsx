import { createRoot } from 'react-dom/client'
import './index.css'
import 'flowbite'

import AppRoutes from './Routes/AppRoutes/AppRoutes';
import { Provider } from 'react-redux';
import { store, persistor } from './store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { Toaster } from 'react-hot-toast';




createRoot(document.getElementById('root')!).render(

  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>

      <AppRoutes />
      <Toaster position="top-center" />
    </PersistGate>
  </Provider>




)
