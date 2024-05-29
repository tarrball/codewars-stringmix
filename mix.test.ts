import { mix } from './mix';

[
  {
    s1: 'my&friend&Paul has heavy hats! &',
    s2: 'my friend John has many many friends &',
    expected: '2:nnnnn/1:aaaa/1:hhh/2:mmm/2:yyy/2:dd/2:ff/2:ii/2:rr/=:ee/=:ss',
  },
  {
    s1: 'mmmmm m nnnnn y&friend&Paul has heavy hats! &',
    s2: 'my frie n d Joh n has ma n y ma n y frie n ds n&',
    expected: '1:mmmmmm/=:nnnnnn/1:aaaa/1:hhh/2:yyy/2:dd/2:ff/2:ii/2:rr/=:ee/=:ss',
  },
  {
    s1: 'Are the kids at home? aaaaa fffff',
    s2: 'Yes they are here! aaaaa fffff',
    expected: '=:aaaaaa/2:eeeee/=:fffff/1:tt/2:rr/=:hh',
  },
].forEach((testCase, i) => {
  test(`mix ${testCase.s1} and ${testCase.s2} should be equal to ${testCase.expected}`, () => {
    expect(mix(testCase.s1, testCase.s2)).toEqual(testCase.expected);
  });
});
