import { Shared } from '../src';

type SharedList = 'child' | 'main'

const mainShared = new Shared<SharedList>({
  storeName: 'main',
  initStore: {
    count: 0,
  },
  type: 'global',
});

const childSharedd = new Shared<SharedList>({
  storeName: 'child',
  initStore: {
    count: 1,
  },
});


test('share', () => {
  childSharedd.setGlobalShare(mainShared);
  mainShared.setStore('main', { count: 1 });
  mainShared.subscribe((state) => {
    expect(state.main.count).toBe(1);
  });
  expect(childSharedd.getStore().main.count).toBe(1);
  expect(childSharedd.getStore().child.count).toBe(1);
});
