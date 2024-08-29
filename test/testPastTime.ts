// import assert from 'node:assert';
import test from 'node:test';
import { pastTime } from '../index';

test('测试过去时间的展示', () => {
  const result = pastTime(new Date('2024/08/30 07:10:00'));
  console.log('====================================');
  console.log(result);
  console.log('====================================');
  // assert.equal(pastTime(new Date()), undefined, '打印 true');
});
