import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
import 'katex/dist/katex.min.css';
import MarkdownIt, { type Options } from 'markdown-it';
import markdownItAnchor from 'markdown-it-anchor';
import texmath from 'markdown-it-texmath';

// 定义 highlight 函数的类型
type HighlightFunction = (str: string, lang?: string) => string;

// 配置 MarkdownIt 实例的选项类型
const mdOptions: Options = {
  html: true, // 禁用原始 HTML 标签（安全）
  xhtmlOut: true, // 使用 / 关闭自闭合标签
  langPrefix: 'ds-', // 代码块 class 前缀
  linkify: true, // 自动将 URL 转为链接
  typographer: true, // 智能引号、破折号等
  highlight: ((str: string, lang?: string): string => {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return `<pre class="hljs"><code>${hljs.highlight(str, { language: lang }).value}</code></pre>`;
      } catch (error) {
        console.error('Highlight.js error:', error);
      }
    }
    return `<pre class="hljs"><code>${MarkdownIt().utils.escapeHtml(str)}</code></pre>`;
  }) satisfies HighlightFunction
};

// 创建并配置 MarkdownIt 实例
const md: MarkdownIt = new MarkdownIt(mdOptions);

md.use(texmath, {
  delimiters: 'dollars', // ['brackets', 'dollars'], 数学公式类型 string array
  katexOptions: { macros: { '\\RR': '\\mathbb{R}' } }
});

md.use(markdownItAnchor, {
  permalink: false // 是否显示标题锚点
});

export default md;
