# a-time-tools

a time tools for processing time data

## install

```sh
npm install --save a-time-tools@latest
```

## language

[English](https://github.com/lmssee/time-tools/blob/main/README.md) [中文](https://github.com/lmssee/time-tools/blob/main/自述文件.md)

## pastTime

Show the past time

```ts
/** This package does not include the content of 'a-node tools'*/
import { _p } from 'a-node-tools';
import { pastTime } from 'a-time-tools';

_p(pastTime(new Date('2024/8/30 07:16:00')));
```

- Display as '\*\*小时前'for the current day
- The time interval does not exceed 24 hours, but it no longer displays "昨日 \*\*:\*\*" on the same day
- The same week is displayed as '\*天前'
- Display different weeks within seven days as '上周\*'
- Displayed as '\*\*天前'in the same month
- Within 31 days, different months will be displayed as '上月\*\*号'
- Displayed as '\*\*月前'in the same year
- Within 365 days, different years are displayed as '去年\*月'
- The rest are displayed as '\*\*年前'
