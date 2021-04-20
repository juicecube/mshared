import './public-path';
import React from 'react';
import ReactDOM from 'react-dom';
import { ShareProvider } from 'shared';
import App from './App';
import * as serviceWorker from './serviceWorker';
import share from './shared';
function render(props) {
  const { container } = props;
  if(props.shared){
      share.setGlobalShare(props.shared)
  }
  ReactDOM.render(
    <ShareProvider shared={share}>
      <App />
    </ShareProvider>
    , container ? container.querySelector('#root') : document.querySelector('#root'));
}

if (!window.__POWERED_BY_QIANKUN__) {
  render({});
}

export async function bootstrap() {
  console.log('[react16] react app bootstraped');
}

export async function mount(props) {
  console.log('[react16] props from main framework', props);
  render(props);
}

export async function unmount(props) {
  const { container } = props;
  ReactDOM.unmountComponentAtNode(container ? container.querySelector('#root') : document.querySelector('#root'));
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
