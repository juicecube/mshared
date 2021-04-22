import { Shared } from 'mshared';

export const shared = new Shared({ storeName: 'app1', initStore: { count: 0 } });
