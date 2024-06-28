import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { IonLoading } from '@ionic/react';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import App from './App';
import TopMenu from './components/TopMenu';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../util/firebase';

const container = document.getElementById('root');
const root = createRoot(container!);
defineCustomElements(window);

const Main: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
      console.log("Auth state changed:", user);
    });
  }, []);

  if (isAuthenticated === null) {
    return <IonLoading isOpen={true} message="Loading..." />;
  }

  return (
    <React.StrictMode>
      {isAuthenticated && <TopMenu />}
      <App isAuthenticated={isAuthenticated} />
    </React.StrictMode>
  );
};

root.render(<Main />); 
