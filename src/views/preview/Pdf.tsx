import PdfViewer from "@/components/PdfViewer";

const PdfPage: React.FC = () => {
  return <div>
    <PdfViewer file='https://zm-cms-image.oss-cn-hangzhou.aliyuncs.com/defe19f8-7402-44ed-bd44-1479d612a837.pdf' />
  </div>;
};

export default PdfPage;