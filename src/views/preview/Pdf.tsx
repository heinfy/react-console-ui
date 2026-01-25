import Pdf2Canvas from "@/components/Pdf2Canvas";
import PdfViewer from "@/components/PdfViewer";
import { type TabsProps, Alert, Card, Tabs } from "antd";

const PdfPage: React.FC = () => {
  const pdfUrl = "https://zm-cms-image.oss-cn-hangzhou.aliyuncs.com/defe19f8-7402-44ed-bd44-1479d612a837.pdf";
  const onChange = (key: string) => {
    console.log(key);
  };

  const items: TabsProps['items'] = [
    {
      key: 'PdfViewer',
      label: 'Pdf2Canvas',
      children: <PdfViewer file={pdfUrl} />,
    },
    {
      key: 'Pdf2Canvas',
      label: 'Pdf2Canvas',
      children: <Pdf2Canvas url={pdfUrl} />,
    },
  ];

  return <Card title="PDF预览">
    <Alert title="PdfViewer 和 Pdf2Canvas 分别是基于 react-pdf 和 pdfjs-dist 封装的组件" type="info" />
    <Tabs defaultActiveKey="Pdf2Canvas" items={items} onChange={onChange} />
  </Card>;
};

export default PdfPage;