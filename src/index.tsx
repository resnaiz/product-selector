import React from 'react';
import ReactDOM from 'react-dom/client';
import './Styles/index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <div className="root-container">
      <App />
    </div>
  </React.StrictMode>
);

reportWebVitals();
