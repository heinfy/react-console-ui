import { ThemeContext } from '@/context/ThemeContext';
import Editor, { loader, type Monaco } from '@monaco-editor/react';
import { theme } from 'antd';
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';
import { configureMonacoYaml } from 'monaco-yaml';
import { useContext, useEffect, useMemo } from 'react';

// 模式不设置 loader.config，让 Monaco 使用默认的 CDN 路径
// 如果是内网，请自行配置，比如：将 node_modules/monaco-editor 复制到 plulic 下
// loader.config({
//   paths: {
//     'vs': '/monaco-editor/min/vs' 
//   }
// });

interface MonacoEditorProps {
  language: string;
  value: string;
  options?: object
}

const MonacoEditor = ({
  language,
  value,
  options = {}
}: MonacoEditorProps) => {
  const { defaultTheme } = useContext(ThemeContext);
  const theme = useMemo(() => {
    return defaultTheme.mode === 'light' ? 'vs' : 'vs-dark';
  }, [defaultTheme.mode]);

  // 
  const height = useMemo(() => {
    return window.innerHeight - 300;
  }, []);
  useEffect(() => {
    // 确保仅在客户端运行
    if (typeof window !== 'undefined') {
      window.MonacoEnvironment = {
        getWorker(_, label) {
          if (label === 'json') {
            return new jsonWorker();
          }
          if (label === 'css' || label === 'scss' || label === 'less') {
            return new cssWorker();
          }
          if (label === 'html' || label === 'handlebars' || label === 'razor') {
            return new htmlWorker();
          }
          if (label === 'typescript' || label === 'javascript') {
            return new tsWorker();
          }
          // if (label === 'yaml') {
          //   ✅ Vite 专用 Worker 加载方式
          //   需要在 src 创建 yaml.worker.js 文件，内容为：import 'monaco-yaml/yaml.worker.js'
          //   return new Worker(
          //     new URL('./yaml.worker.js', import.meta.url),
          //     { type: 'module' }
          //   );
          // }
          return new editorWorker();
        },
      };
    }
  }, []);

  function handleEditorWillMount(monaco: Monaco) {
    configureMonacoYaml(monaco, {
      enableSchemaRequest: true,
      schemas: [
        {
          fileMatch: ['**/.prettierrc.*'],
          uri: 'https://json.schemastore.org/prettierrc.json'
        },
        {
          fileMatch: ['**/person.yaml'],
          schema: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
                description: 'The person’s display name'
              },
              age: {
                type: 'integer',
                description: 'How old is the person in years?'
              },
              occupation: {
                enum: ['Delivery person', 'Software engineer', 'Astronaut']
              }
            }
          },
          uri: 'https://github.com/remcohaszing/monaco-yaml#usage'
        }],
    });
  }

  return (
    <Editor
      theme={theme}
      height={height}
      language={language}
      value={value}
      options={{ lineNumbers: 'on', tabSize: 2, ...options }}
      beforeMount={handleEditorWillMount}
      onValidate={(markers) => {
        markers.forEach((marker) => {
          console.error(`${language} 错误:`, marker.message);
        });
      }}
    />
  );
}

export default MonacoEditor