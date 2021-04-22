import React from 'react';
import ReactDOM from 'react-dom';
import { registerMicroApps, runAfterFirstMounted, setDefaultMountApp, start, initGlobalState } from 'qiankun';
import { ShareProvider, useShared } from 'mshared';
import { Button } from 'antd';
import { shared } from './shared';
import './index.css';
function Render(props) {
  const { setStore, store } = useShared();
  const { loading } = props;
  const { app1, app2, app } = store;
  return (
    <>
      <h1>主应用</h1>
      <br />
      {
        app && (
          <Button
            style={{ margin: '0 20px' }}
            onClick={() => {
              setStore('app', { count: app.count + 1 });
            }}>app-计数器{app.count}
          </Button>
        )
      }
      {
        app1 && (
          <Button
            style={{ margin: '0 20px' }}
            onClick={() => {
              setStore('app1', { count: app1.count + 1 });
            }}>app1-计数器{app1.count}
          </Button>
        )
      }
      {
        app2 && (
          <Button
            style={{ margin: '0 20px' }}
            onClick={() => {
              setStore('app2', { count: app2.count + 1 });
            }}>app2-计数器{app2.count}
          </Button>
        )
      }

      <hr />
      {loading && <h4 className="subapp-loading">Loading...</h4>}
      <div id="subapp-viewport" />
    </>
  );
}

function render({ loading }) {
  const container = document.getElementById('subapp-container');
  ReactDOM.render(
    <ShareProvider shared={shared}>
      <Render loading={loading} />
    </ShareProvider>
    , container);
}

/**
 * Step1 初始化应用（可选）
 */
render({ loading: true });

const loader = (loading) => render({ loading });

/**
 * Step2 注册子应用
 */

registerMicroApps(
  [
    {
      name: 'app1',
      entry: '//localhost:7100',
      container: '#subapp-viewport',
      loader,
      activeRule: '/app1',
      props: {
        shared: shared,
      },
    },
    {
      name: 'app2',
      entry: '//localhost:7101',
      container: '#subapp-viewport',
      loader,
      activeRule: '/app2',
      props: {
        shared: shared,
      },
    },
  ],
  {
    beforeLoad: [
      (app) => {
        console.log('[LifeCycle] before load %c%s', 'color: green;', app.name);
      },
    ],
    beforeMount: [
      (app) => {
        console.log('[LifeCycle] before mount %c%s', 'color: green;', app.name);
      },
    ],
    afterUnmount: [
      (app) => {
        console.log('[LifeCycle] after unmount %c%s', 'color: green;', app.name);
      },
    ],
  },
);

const { onGlobalStateChange, setGlobalState } = initGlobalState({
  user: 'qiankun',
});

onGlobalStateChange((value, prev) => console.log('[onGlobalStateChange - master]:', value, prev));

setGlobalState({
  ignore: 'master',
  user: {
    name: 'master',
  },
});

/**
 * Step3 设置默认进入的子应用
 */
setDefaultMountApp('/app1');

/**
 * Step4 启动应用
 */
start();

runAfterFirstMounted(() => {
  console.log('[MainApp] first app mounted');
});
