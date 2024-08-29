import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import cleanup from 'rollup-plugin-cleanup';

/** 配置需要不打包进生产包的包名配置  */
const externalList = [
  'nodejs',
  'tslib',
  'a-js-tools',
  'a-node-tools',
  'a-command',
];

export default {
  input: 'test/index.ts',
  output: [
    {
      format: 'es',
      entryFileNames: '[name].mjs',
      preserveModules: true,
      sourcemap: false,
      exports: 'named',
      dir: 'test/out',
    },
  ],
  // 配置需要排除的包
  external: id => externalList.some(i => id.startsWith(i)),
  plugins: [
    resolve(),
    commonjs(),
    // 打包压缩，自动去注释
    // terser(),
    // 可打包 json 内容
    json(),
    typescript({}),
    // 去除无用代码
    cleanup(),
  ],
};
