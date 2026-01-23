// types/markdown-it-texmath.d.ts
declare module 'markdown-it-texmath' {
  import type { PluginSimple } from 'markdown-it';

  interface TexMathOptions {
    delimiters?: string | string[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    katexOptions?: Record<string, any>;
  }

  const texmath: PluginSimple;
  export default texmath;
}
