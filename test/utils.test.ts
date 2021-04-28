import { equalsObj } from '../src/utils';

test('equalsObj is equals', () => {
  const obj = {
    a: 2,
    b: [1, 2],
    c: {
      d: 1,
    },
  };
  const obj2 = {
    a: 2,
    b: [1, 2],
    c: {
      d: 1,
    },
  };
  expect(equalsObj(obj, obj2)).toBe(true);
});

test('equalsObj is no equals', () => {
  const obj3 = {
    a: 2,
    b: [1, {
      a: 3,
    }],
  };
  const obj4 = {
    a: 2,
    b: [1, 2],
  };
  expect(equalsObj(obj3, obj4)).toBe(false);
});

