import React from 'react';
import ReactDOM from 'react-dom';
import { ShareProvider, useShared } from 'mshared';
import { shared } from './shared';
import './index.css';

const App = () => {
  const { store: { app }, setStore } = useShared();
  return (
    <button onClick={() => {
      setStore('app', { count: app.count });
    }}>计数器{app.count}
    </button>
  );
};

const App2 = () => (
  <button onClick={() => {
    shared.setStore('app', { count: shared.getStore().app.count + 1 });
  }}>shared.setStore
  </button>
);

ReactDOM.render(
  <ShareProvider shared={shared}>
    <App />
    <br />
    <App2 />
  </ShareProvider>
  , document.getElementById('app'));
