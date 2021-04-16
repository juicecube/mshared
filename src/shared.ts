export type Store = Record<string, any>

export type Listner = (state:Record<string, any>, prevState:Record<string, any>) => void;

export type ShareType = 'global' | 'child'

export interface SharedOpts<T>{
    storeName:T;
    initStore?:Store;
    type?:ShareType;
}

export class Shared<T extends string> {
    private store:Store = {}

    private globalShared!:Shared<T>

    private listners:Record<string, Array<Listner>> = {}

    private storeName:T

    private shareType:ShareType;

    constructor(opt:SharedOpts<T>){
      const { type, storeName, initStore } = opt;
      this.storeName = storeName;
      this.listners[storeName] = [];
      this.shareType = type || 'child';
      this.store = {
        [storeName]: initStore || {},
      };
    }

    getStore():Store{
      return this.globalShared ? this.globalShared.getStore() : this.store;
    }

    subscribe(callback:Listner){
      if(this.globalShared){
        const sharedListners = this.globalShared.listners[this.storeName];
        if(!Array.isArray(sharedListners)){
          this.globalShared.listners[this.storeName] = [callback];
        }else{
          sharedListners.push(callback);
        }
      }else{
        this.listners[this.storeName].push(callback);
      }
    }

    unSubscribe(){
      if(this.globalShared){
        const sharedListners = this.globalShared.listners;
        delete sharedListners[this.storeName];
      }else{
        this.listners[this.storeName] = [];
      }
    }

    setStore(storeName:T, store:Store ) {
      if(this.globalShared){
        this.globalShared.setStore(storeName, store);
      }else{
        const prevState = this.store;
        this.store = {
          ...this.store,
          [storeName]: store,
        };
        for(const key in this.listners){
          this.listners[key].forEach((callback:Listner) => {
            callback(this.store, prevState);
          });
        }
      }
    }

    setGlobalShare(shared:Shared<T>){
      if(this.shareType !== 'child' || shared.shareType !== 'global'){
        throw new Error('you should setGlobalShare when this.shareType is child and shared.shareType is global!');
      }
      this.globalShared = shared;
      this.globalShared.store[this.storeName] = this.store[this.storeName];
    }
}
