import { Shared } from '../src';
type SharedList = 'child' | 'main'

test('share', () => {
  const mainShared = new Shared<SharedList>({
    storeName: 'main',
    initStore: {
      count: 0,
    },
    type: 'global',
  });

  const childShared = new Shared<SharedList>({
    storeName: 'child',
    initStore: {
      count: 1,
    },
  });

  childShared.setGlobalShare(mainShared);
  mainShared.setStore('main', { count: 1 });
  mainShared.subscribe((state) => {
    expect(state.main.count).toBe(1);
  });
  expect(childShared.getStore().main.count).toBe(1);
  expect(childShared.getStore().child.count).toBe(1);
});

test('unsubscribe', () => {
  const shared = new Shared<SharedList>({
    storeName: 'child',
    initStore: {
      count: 1,
    },
  });

  const mainShared = new Shared<SharedList>({
    storeName: 'main',
    initStore: {
      count: 0,
    },
    type: 'global',
  });

  const listenerA = jest.fn();
  const listenerB = jest.fn();
  shared.setGlobalShare(mainShared);
  shared.subscribe(listenerA);
  mainShared.subscribe(listenerB);
  shared.unSubscribe();
  shared.setStore('child', {});
  expect(listenerA.mock.calls.length).toBe(0);
  expect(listenerB.mock.calls.length).toBe(1);
});

