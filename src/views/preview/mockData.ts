export const randomReply1 = `非常好！在 Vue 3 项目中集成 \`markdown-it\` 来渲染大模型的回答，是非常常见且推荐的做法。大模型的回答通常包含 **代码块、列表、链接、加粗、公式** 等格式，使用 \`markdown-it\` 可以完美解析并安全渲染。

下面我将手把手教你：

- ✅ 安装 \`markdown-it\`
- ✅ 配置常用插件（代码高亮、表格、链接等）
- ✅ 在 Vue 3 中安全渲染 HTML
- ✅ 支持流式更新（打字机效果）
- ✅ 防 XSS 安全处理


---

## ✅ 第一步：安装 \`markdown-it\` 及常用插件

\`\`\`bash
npm install markdown-it
npm install @traptitech/markdown-it-katex  # 数学公式（可选）
npm install markdown-it-highlightjs       # 代码高亮（可选）
npm install markdown-it-anchor            # 标题锚点（可选）
\`\`\`

> 🔁 如果你用的是 Vue CLI 或 Vite，默认支持 ES6 模块导入。

---

## ✅ 第二步：创建 \`markdown.js\` 配置文件

\`\`\`js
// utils/markdown.js
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js' // 代码高亮
import 'highlight.js/styles/github.css' // 选择一个样式，如 github, atom-one-dark 等
import MarkdownItKatex from '@traptitech/markdown-it-katex'
import markdownItAnchor from 'markdown-it-anchor'

const md = new MarkdownIt({
  html: false,        // 禁用原始 HTML 标签（安全）
  xhtmlOut: true,     // 使用 / 关闭自闭合标签
  langPrefix: 'language-', // 代码块 class 前缀
  linkify: true,      // 自动将 URL 转为链接
  typographer: true,  // 智能引号、破折号等
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return \`<pre class="hljs"><code>\${hljs.highlight(str, { language: lang }).value}</code></pre>\`
      } catch (__) {}
    }
    return \`<pre class="hljs"><code>\${md.utils.escapeHtml(str)}</code></pre>\`
  }
})

// 使用插件
md.use(MarkdownItKatex)
md.use(markdownItAnchor, {
  permalink: false // 是否显示标题锚点
})

export default md
\`\`\`

---

如果你使用的是 **Vite**，还可以通过插件进一步优化加载速度。需要我提供 \`Vite\` 优化方案或 \`Prism.js\` 替代高亮方案吗？欢迎继续提问！

## ✅ 第三步：在 Vue 组件中使用

\`\`\`vue
<!-- components/MarkdownContent.vue -->
<script setup>
import { computed, toRefs } from 'vue'
import markdownIt from '@/utils/markdown.js' // 引入配置好的 md 实例

const props = defineProps({
  content: {
    type: String,
    default: ''
  }
})

// 将 Markdown 转为 HTML
const renderedHTML = computed(() => {
  if (!props.content) return ''
  return { __html: markdownIt.render(props.content) }
})
</script>

<template>
  <div class="markdown-content" v-html="renderedHTML.__html" />
</template>

<style scoped>
.markdown-content {
  line-height: 1.8;
  font-size: 15px;
  color: #333;
  word-wrap: break-word;
}

.markdown-content :deep(p) {
  margin: 0.8em 0;
}

.markdown-content :deep(pre) {
  margin: 1em 0;
  padding: 12px;
  border-radius: 8px;
  overflow-x: auto;
}

.markdown-content :deep(code) {
  font-family: 'Courier New', monospace;
  background: #f3f4f6;
  padding: 2px 4px;
  border-radius: 4px;
  font-size: 0.95em;
}

.markdown-content :deep(blockquote) {
  border-left: 4px solid #0078d4;
  margin: 1em 0;
  padding: 0.5em 1em;
  background: #f9f9f9;
}

.markdown-content :deep(table) {
  border-collapse: collapse;
  width: 100%;
  margin: 1em 0;
}

.markdown-content :deep(th), .markdown-content :deep(td) {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.markdown-content :deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: 6px;
}

.markdown-content :deep(a) {
  color: #0078d4;
  text-decoration: none;
}

.markdown-content :deep(a:hover) {
  text-decoration: underline;
}
</style>
\`\`\`

---

## ✅ 第四步：在聊天消息中使用

\`\`\`vue
<!-- ChatMessage.vue -->
<script setup>
defineProps({
  message: Object // { role: 'assistant', content: '...' }
})
</script>

<template>
  <div class="message" :class="message.role">
    <MarkdownContent :content="message.content" />
  </div>
</template>
\`\`\`

---

## ✅ 第五步：支持流式更新（打字机效果）

\`\`\`js
// 在发送请求后
const newMsg = { role: 'assistant', content: '' }
messages.value.push(newMsg)

const eventSource = new EventSource('/api/chat')
eventSource.onmessage = (e) => {
  if (e.data === '[DONE]') {
    eventSource.close()
    return
  }
  newMsg.content += e.data // 自动触发 Markdown 重新渲染
}
\`\`\`

✅ 因为 \`newMsg.content\` 被修改，\`computed\` 会重新计算，\`v-html\` 自动更新，实现**实时打字机效果**。

---

## ✅ 安全提示：防 XSS

- \`markdown-it\` 默认不渲染 HTML（\`html: false\`）
- 使用 \`md.utils.escapeHtml()\` 处理原始文本
- 不要使用 \`v-html\` 渲染用户不可信内容（但大模型输出通常可控）

---

## ✅ 可选增强插件

| 插件 | 用途 |
|------|------|
| \`markdown-it-toc-done-right\` | 自动生成目录 |
| \`markdown-it-emoji\` | 支持表情 :smile: |
| \`markdown-it-container\` | 自定义块（如警告框） |
| \`markdown-it-mathjax3\` | 更强的数学公式支持 |

---

## ✅ 最终效果支持

| 格式 | 是否支持 |
|------|----------|
| 段落、换行 | ✅ |
| 加粗、斜体 | ✅ |
| 列表（有序/无序） | ✅ |
| 代码块（带高亮） | ✅ |
| 链接、图片 | ✅ |
| 表格 | ✅ |
| 数学公式 \`$E=mc^2$\` | ✅ |
| 引用 \`>\` | ✅ |
| 水平线 \`---\` | ✅ |

---

## ✅ 总结

| 步骤 | 操作 |
|------|------|
| 1 | \`npm install markdown-it highlight.js\` |
| 2 | 创建 \`markdown.js\` 配置解析器 |
| 3 | 在 Vue 组件中用 \`v-html\` 渲染 \`markdownIt.render(content)\` |
| 4 | 使用 \`:deep()\` 优化样式 |
| 5 | 支持流式更新：直接修改 \`content\` 字符串 |

> 💡 **推荐**：将 \`MarkdownContent\` 封装为全局组件，方便在多个地方使用。

---

如果你使用的是 **Vite**，还可以通过插件进一步优化加载速度。需要我提供 \`Vite\` 优化方案或 \`Prism.js\` 替代高亮方案吗？欢迎继续提问！`;

export const randomReply2 =
  '> 好的，这是正态分布（也称为高斯分布）的概率密度函数（Probability Density Function, PDF）。\n\n### 正态分布的概率密度函数 (PDF)\n\n公式为：\n\n$$f(x) = \\frac{1}{\\sigma\\sqrt{2\\pi}}  e^{ -\\frac{1}{2} \\left(\\frac{x - \\mu}{\\sigma}\\right)^2 }$$\n\n其中：\n-   $x$ 是随机变量的取值。\n-   $\\mu$ (读作“mu”) 是分布的**均值**（mean）或**期望值**（expectation）。它决定了分布中心的位置。\n-   $\\sigma$ (读作“sigma”) 是分布的**标准差**（standard deviation），衡量数据的离散程度。\n-   $\\sigma^2$ 是分布的**方差**（variance）。\n-   $\\pi$ 是圆周率（约3.14159），$e$ 是自然对数的底数（约2.71828）。\n\n---\n\n### 图像与几何意义\n\n这个函数的图像就是我们熟悉的“钟形曲线”（Bell Curve），它具有以下特点：\n\n1.  **关于均值对称**：曲线以 $x = \\mu$ 为对称轴完美对称。\n2.  **均值、中位数、众数相等**：它们都位于对称轴 $x = \\mu$ 上，这也是曲线的最高点。\n3.  **标准差决定“胖瘦”**：标准差 $\\sigma$ 越大，数据越分散，曲线就越“矮胖”；标准差 $\\sigma$ 越小，数据越集中，曲线就越“高瘦”。\n\n\n\n---\n\n### 重要特性\n\n-   **曲线下的总面积等于1**：这是一个概率密度函数的基本性质，所有可能取值的概率之和为100%。\n-   **概率的计算**：随机变量 $X$ 落在区间 $[a, b]$ 内的概率 $P(a \\leq X \\leq b)$，等于概率密度函数 $f(x)$ 在该区间上的**积分**，即曲线下在 $a$ 和 $b$ 之间的面积。\n\n$$P(a \\leq X \\leq b) = \\int_a^b f(x)  dx$$\n\n-   **“3σ”法则（经验法则）**：对于任何正态分布，其数据分布有固定的比例规律：\n    -   约有68.27%的数据落在 $(\\mu - \\sigma, \\mu + \\sigma)$ 内。\n    -   约有95.45%的数据落在 $(\\mu - 2\\sigma, \\mu + 2\\sigma)$ 内。\n    -   约有99.73%的数据落在 $(\\mu - 3\\sigma, \\mu + 3\\sigma)$ 内。\n\n这个公式和分布是统计学、自然科学、社会科学和机器学习等领域中最重要的分布，没有之一。';
