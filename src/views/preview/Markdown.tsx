
import Markdown from '@/components/Markdown';
import { randomReply1, randomReply2 } from '@/mock/MarkdownData';
import { Card } from 'antd';
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