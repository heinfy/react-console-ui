import MonacoEditor from "@/components/MonacoEditor";
import editorData from '@/mock/editorData.json';
import { Card, Select } from 'antd';
import { useState } from "react";

const { Option } = Select;

// 定义编辑器数据的类型
type EditorDataType = typeof editorData;
type LanguageKey = keyof EditorDataType;

const EditorPage = () => {
  const defaultLang: LanguageKey = 'html'
  const languageTypes: LanguageKey[] = Object.keys(editorData) as LanguageKey[]
  const [language, setLanguage] = useState<LanguageKey>(defaultLang)
  const [value, setValue] = useState<string>(editorData[defaultLang])

  const changeLang = (lang: LanguageKey) => {
    if (languageTypes.includes(lang)) {
      setLanguage(lang);
      setValue(editorData[lang]);
    }
  }

  return (
    <Card
      title='Markdown Editor'
      extra={<Select
        value={language}
        onChange={changeLang}
        style={{ width: 120 }}
      >
        {languageTypes.map(lang => (
          <Option key={lang} value={lang}>
            {lang}
          </Option>
        ))}
      </Select>}
    >
      <MonacoEditor language={language} value={value} />
    </Card>
  );
};

export default EditorPage;