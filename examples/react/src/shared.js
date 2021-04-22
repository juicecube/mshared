import { Shared } from 'mshared';

export const shared = new Shared({ storeName: 'app', initStore: { count: 0 }, type: 'global' });
