/****************************************************************************
 * @Author lmssee
 * @Email lmssee@outlook.com
 * @ProjectName a-time-tools
 * @FileName pastTime.ts
 * @CreateDate  周三  08/28/2024
 * @Description 过去时间的显示
 ****************************************************************************/

import { typeOf } from 'a-js-tools';
import { dayArray } from './data';

/**
 * 返回过去时间的另一种表现形式
 * - 倘若过去时间在 60 分钟内，优先会展示 "**分钟前" 的字样
 * - 当日显示为 "**小时前"
 * - 时间间隔不超过 24 小时，但已非当日显示 "昨日 **:**"
 * - 同一周显示为 "*天前"
 * - 七天内不同周展示为 "上周*"
 * - 同一月展示为 "*天前"
 * - 31 天内不同月展示为 "上月*号"
 * - 同一年展示为 "*月前"
 * - 365 天内不同年展示为 "去年*月"
 * - 其余展示为 "*年前"
 * @param pastTime  {@link Date} 待转化的时间，该时间必须是过去时，否则会抛出错误
 * @returns {@link String} 返回的时间友好文本表示
 */
export function pastTime(pastTime: Date): string {
  const timeType = typeOf(pastTime);
  if (timeType !== 'date') {
    throw new TypeError(
      `您输入的参数的数据类型不正确\n\n期望是 \`Date\` 类型的数据，您输入的为 ${timeType}`,
    );
  }
  /** 过去时间的月的第几天 */
  const lastDate = pastTime.getDate(),
    /**  获取当前的时间  */
    nowTime = new Date(),
    /** 时间差毫秒值 */
    periodOfTime: number = Date.now() - pastTime.getTime();
  if (periodOfTime < 0) {
    /** 时间不是来自于现在而是未来 */
    throw Error('您输入的时间不符合要求');
  } else if (periodOfTime < 3600000) {
    // 时间差不超过一个小时，返回 " ** 分钟前 " 文本
    return periodOfTime === 0
      ? '当下'
      : `${Math.floor(periodOfTime / 60000)}分钟前`;
  } else if (periodOfTime < 86400000) {
    /// 时间在同一天，返回 " ** 小时前 " 文本
    /// 若不在一天，这返回 " 昨日 **:** " 文本
    return nowTime.getDate() === lastDate
      ? `${Math.floor(periodOfTime / 3600000)}小时前`
      : `昨日 ${pastTime.getHours().toString().padStart(2, '0')}:${pastTime.getMinutes().toString().padStart(2, '0')}`;
  } else if (periodOfTime < 604800000) {
    /// 时间在 7 天内，这时候考虑是否在同一周
    /// 若是同一周，这直接返回 " * 天前"
    /// 由于国外的一周是从周日开始的，所以这里需要注意判断两个为 0 的情况
    const nowDay = nowTime.getDay(),
      pastDay = pastTime.getDay();
    return (
      ((nowDay == 0 || (pastDay != 0 && nowDay - pastDay > 0)) &&
        `${Math.floor(periodOfTime / 86400000)}天前周${dayArray[pastDay]}`) ||
      `上周${dayArray[pastDay]}`
    );
  } else if (
    periodOfTime < 2678400000 &&
    Math.abs((nowTime.getMonth() % 11) - (pastTime.getMonth() % 11)) < 2
  ) {
    /// 剩下就是超过七天的情况，这里其实做了两个判断：一个是 31 天内，另一个是月数相差不超过 1
    return (
      (nowTime.getMonth() !== pastTime.getMonth() &&
        `${Math.floor(periodOfTime / 86400000)} 天前`) ||
      `上月${pastTime.getDate()}号`
    );
  } else if (
    periodOfTime < 31536000000 &&
    nowTime.getFullYear() - pastTime.getFullYear() < 2
  ) {
    /// 时间在  365 天内且年差不会超过 2
    return (
      (nowTime.getFullYear() !== pastTime.getFullYear() &&
        `${nowTime.getMonth() - pastTime.getMonth()}月前`) ||
      `去年${pastTime.getMonth() + 1}月`
    );
  }
  return `${nowTime.getFullYear() - pastTime.getFullYear()}年前`;
}
