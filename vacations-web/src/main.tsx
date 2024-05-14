import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { configureAmplify } from './helpers/startup/configureAmplify.ts';
import Router from './router.tsx';

configureAmplify();

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Router />
    </React.StrictMode>,
);
