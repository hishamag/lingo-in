import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { ClientTestimonials } from './components/ClientTestimonials';
import { WhatsAppButton } from './components/WhatsAppButton';
import { WhatsAppContactUpdater } from './components/WhatsAppContactUpdater';
import './index.css';
import './color-enhancement.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <>
      <App />
      <ClientTestimonials />
      <WhatsAppButton />
      <WhatsAppContactUpdater />
    </>
  </StrictMode>,
);
