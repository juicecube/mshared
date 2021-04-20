import React from 'react';
import {Button} from 'antd'
import { useShared } from 'shared';

 const Entry = () => {
  const { store, setStore } = useShared();
  const {app1,app2,app } = store;
  return (
    <>
        <h1>app1应用</h1>
        <br />
        {
          app && (
            <Button onClick={() => {
              setStore('app', { count: app.count + 1 });
            }}>app-计数器{app.count}</Button>
          )
        }
        <br />
        {
          app1 && (
            <Button onClick={() => {
              setStore('app1', { count: app1.count + 1 });
            }}>app1-计数器{app1.count}</Button>
          )
        }
        <br />
        {
          app2 && (
            <Button onClick={() => {
              setStore('app2', { count: app2.count + 1 });
            }}>app2-计数器{app2.count}</Button>
          )
        }
      </>
  );
};


export default Entry