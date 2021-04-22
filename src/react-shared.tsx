import React, { useContext, createContext, useEffect, useCallback } from 'react';
import { Shared } from './shared';

interface ShareContext{
    store:Record<string, any>;
    setStore:(storeName:string, value:Record<string, any>) => void;
}

const Context = createContext<ShareContext>({
  store: {},
  setStore: () => {},
});

interface ShareProvideProps{
    shared:Shared<any>;
}

export const ShareProvider:React.FC<ShareProvideProps> = ({ children, shared }) => {

  const [store, setState] = React.useState(shared.getStore());

  useEffect(() => {
    shared.subscribe((state) => {
      setState(state);
    });
    return () => {
      shared.unSubscribe();
    };
  }, []);


  const setStore = useCallback((key:string, value:Record<string, any>) => {
    shared.setStore(key, value);
  }, []);

  const ctx = React.useMemo(() => ({
    store,
    setStore,
  }), [store, setStore]);

  return (
    <Context.Provider
      value={ctx}>
      {children}
    </Context.Provider>
  );
};

export const useShared = () => useContext(Context);

export const withShared = (Com:React.FC<ShareContext>|typeof React.PureComponent & React.Component) => {
  const Component = () => {
    const { store, setStore } = useShared();
    return (
      <Com
        store={store}
        setStore={setStore} />
    );
  };
  return Component;
};
