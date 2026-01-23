
import Markdown from '@/components/Markdown';
import { Card } from 'antd';
import { randomReply1, randomReply2 } from './mockData';
const MarkdownPage: React.FC = () => {

  return <>
    <Card title="Markdown 预览1">
      <Markdown content={randomReply1} />
    </Card>;
    <Card title="Markdown 预览2">
      <Markdown content={randomReply2} />
    </Card>;
  </>
};

export default MarkdownPage;