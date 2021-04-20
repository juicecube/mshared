import React, { Suspense } from 'react';
import { BrowserRouter as Router,Route, Switch } from 'react-router-dom';
import 'antd/dist/antd.min.css';
import './App.css';


import Home from './pages/Home';

const RouteExample = () => {
  return (
    <Router basename={window.__POWERED_BY_QIANKUN__ ? '/app1' : '/'}>
      <Suspense fallback={null}>
        <Switch>
          <Route path="/" exact component={Home} />
        </Switch>
      </Suspense>
    </Router>
  );
};

export default function App() {
  return (
    <div className="app-main">
        <RouteExample />
    </div>
  );
}
