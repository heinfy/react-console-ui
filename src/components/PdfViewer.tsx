import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Button, Flex, Space, Typography } from 'antd';
import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import LoadingSpinner from './LoadingSpinner';

// 解决 worker 路径问题（重要！）
pdfjs.GlobalWorkerOptions.workerSrc = `/pdf.worker.mjs`;

export default function PdfViewer({ file }) {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  function changePage(offset: number) {
    setPageNumber(prevPageNumber => {
      const newPageNumber = prevPageNumber + offset;
      return Math.min(Math.max(1, newPageNumber), numPages || 0);
    });
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  return (
    <div>
      <Flex justify="center" align="center" gap="small" className="pdf-controls" style={{ marginBottom: 16 }}>
        <Button
          onClick={previousPage}
          disabled={pageNumber <= 1}
          icon={<LeftOutlined />}
          size="middle"
        />
        <Space size="small">
          <Typography.Text strong>
            Page {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}
          </Typography.Text>
        </Space>
        <Button
          onClick={nextPage}
          disabled={pageNumber >= (numPages || 0)}
          icon={<RightOutlined />}
          size="middle"
        />
      </Flex>

      <Document
        file={file}
        onLoadSuccess={onDocumentLoadSuccess}
        loading={<LoadingSpinner />}
        error="Error loading PDF"
        noData="No PDF file specified"
        className="flex justify-center items-center overflow-auto"
      >
        <Page
          pageNumber={pageNumber}
          renderTextLayer={false} // 提升性能（如不需要文本选择）
          renderAnnotationLayer={false}
        />
      </Document>
    </div >
  );
}