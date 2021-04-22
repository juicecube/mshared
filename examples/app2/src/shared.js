import { Shared } from 'mshared';

export const shared = new Shared({ storeName: 'app2', initStore: { count: 0 } });
