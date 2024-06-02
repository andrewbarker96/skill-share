import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import LoginPage from './pages/Login';
import TopMenu from './components/TopMenu';
import { auth } from '../util/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { defineCustomElements } from '@ionic/pwa-elements/loader';

const container = document.getElementById('root');
const root = createRoot(container!);
defineCustomElements(window);

onAuthStateChanged(auth, (user) => {
  if (user) {
    root.render(
      <React.StrictMode>
        <TopMenu />
        <App />
      </React.StrictMode>
    );
  } else {
    root.render(
      <React.StrictMode>
        <LoginPage />
      </React.StrictMode>
    );
  }
});
