import { Space, Typography } from 'antd'; // 导入 Ant Design 组件
import classNames from 'classnames';
import * as pdfjsLib from 'pdfjs-dist'; // 导入 PDF.js 库
import { GlobalWorkerOptions } from 'pdfjs-dist'; // 导入 PDF.js Worker 配置
import React, { useCallback, useEffect, useRef, useState } from 'react';

// 配置 PDF.js Worker 源文件路径
GlobalWorkerOptions.workerSrc = '/pdf.worker.mjs'// 引入 PDF.js Worker 文件

// 定义组件属性接口
interface PDFPreviewProps {
  url: string;           // PDF 文件 URL
  renderPages?: number;  // 同时渲染的页面数量，默认为 5
  customScroll?: boolean; // 是否使用自定义滚动处理，默认为 false
  offsetHeight?: number;  // 偏移高度，默认为 0
}

/**
 * PDF 预览组件
 * 实现 PDF 文档的在线预览功能，支持懒加载和滚动翻页
 */
const PDFPreview: React.FC<PDFPreviewProps> = ({
  url,
  renderPages = 5,
  customScroll = false,
  offsetHeight = 0
}) => {
  // PDF 文档实例
  const [doc, setDoc] = useState<pdfjsLib.PDFDocumentProxy | null>(null);
  // PDF 总页数
  const [docPages, setDocPages] = useState<number>(0);
  // 显示的当前页码
  const [showPageNum, setShowPageNum] = useState<number>(0);
  // 当前页面索引
  const [currentPage, setCurrentPage] = useState<number>(0);
  // 单页高度
  const [pageHeight, setPageHeight] = useState<number>(500);
  // 需要渲染的页面列表
  const [renderList, setRenderList] = useState<number[]>([]);
  // 存储每一页容器的引用
  const containerRefs = useRef<(HTMLDivElement | null)[]>([]);

  /**
   * 获取 PDF 文件
   * 使用 PDF.js 加载远程 PDF 文档
   */
  const getPDFFile = useCallback(() => {
    if (!url) return; // 如果没有 URL，直接返回

    setCurrentPage(0); // 重置当前页面

    // 加载 PDF 文档
    pdfjsLib.getDocument({
      url: url,
      cMapUrl: 'https://unpkg.com/pdfjs-dist@5.4.530/cmaps/', // 字符映射表 URL
      cMapPacked: true, // 启用压缩字符映射表
      httpHeaders: {}, // HTTP 请求头
      verbosity: 0 // 日志级别
    }).promise.then(pdf => {
      console.log('pdf', pdf); // 打印 PDF 对象信息
      setDoc(pdf); // 设置文档实例
      setDocPages(pdf.numPages); // 设置总页数
      setShowPageNum(1); // 设置显示页码为第一页

      // 渲染第一屏
      setTimeout(() => {
        if (pdf.numPages > 0) {
          scrollToPage(1); // 滚动到第一页
        }
      }, 0);
    });
  }, [url]); // 依赖于 url 变化时重新执行

  /**
   * 渲染指定页面
   * 将 PDF 页面渲染到 canvas 上
   */
  const renderPage = useCallback((pageNo: number) => {
    if (!doc) return; // 如果没有文档实例，直接返回

    doc.getPage(pageNo).then(page => {
      // 获取当前页面容器
      const container = containerRefs.current[pageNo - 1];
      if (!container) return;

      // 获取容器内的 canvas 元素
      const canvas = container.querySelector('canvas');
      // 如果 canvas 已经渲染过，则跳过
      if (!canvas || canvas?.__rendered) return;

      // 获取 canvas 的 2D 上下文
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // 获取设备像素比和后备存储像素比，用于高分辨率屏幕适配
      const dpr = window.devicePixelRatio || 1;
      const bsr =
        ctx.webkitBackingStorePixelRatio ||
        ctx.mozBackingStorePixelRatio ||
        ctx.msBackingStorePixelRatio ||
        ctx.oBackingStorePixelRatio ||
        ctx.backingStorePixelRatio ||
        1;
      const ratio = dpr / bsr;

      // 获取容器尺寸信息
      const rect = container.getBoundingClientRect();
      const viewport = page.getViewport({ scale: 1.0 }); // 获取页面视口
      const width = rect.width; // 容器宽度
      const height = (width / viewport.width) * viewport.height; // 根据比例计算高度

      // 设置 canvas 样式尺寸
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      setPageHeight(height); // 更新页面高度状态

      // 设置 canvas 实际像素尺寸（高分辨率适配）
      canvas.height = height * ratio;
      canvas.width = width * ratio;
      // 设置变换矩阵，适配高分辨率
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

      // 渲染页面到 canvas
      page.render({
        canvasContext: ctx,
        viewport: page.getViewport({ scale: width / viewport.width }) // 根据容器宽度调整缩放
      });

      // 标记 canvas 已渲染
      canvas.__rendered = true;
    });
  }, [doc]); // 依赖于 doc 变化时重新执行

  /**
   * 滚动到指定页面
   * 计算需要渲染的页面范围并更新渲染列表
   */
  const scrollToPage = useCallback((pageNo: number) => {
    if (currentPage === pageNo || !doc) return; // 如果是当前页或没有文档，直接返回

    setCurrentPage(pageNo); // 更新当前页

    // 计算需要渲染的页面范围
    const list = [];
    for (let page = pageNo; page <= pageNo + renderPages; page++) {
      list.push(page);
    }

    // 过滤超出文档范围的页面
    const filteredList = list.filter(page => page <= docPages);
    setRenderList(filteredList); // 更新渲染列表

    // 延迟渲染，确保 DOM 更新完成后再渲染页面
    setTimeout(() => {
      filteredList.forEach(page => {
        renderPage(page); // 渲染每个需要的页面
      });
    }, 0);
  }, [currentPage, doc, docPages, renderPages, renderPage]); // 依赖项变化时重新创建函数

  /**
   * 检查需要渲染的页面
   * 根据滚动位置计算当前应显示的页面
   */
  const checkRender = useCallback((element: HTMLElement | Document) => {
    if (!pageHeight || !doc) return; // 如果没有页面高度或文档，直接返回

    let scrollTop = 0;
    // 获取滚动位置
    if (element === document.documentElement) {
      scrollTop = element.scrollTop || window.pageYOffset || document.body.scrollTop || 0;
    } else {
      scrollTop = (element as HTMLElement).scrollTop;
    }

    // 根据滚动位置和偏移量计算当前页码
    let page = Math.floor((scrollTop - offsetHeight) / pageHeight);
    page = Math.max(page, 1); // 最小为第一页
    page = Math.min(page, docPages); // 最大为最后一页

    scrollToPage(page); // 滚动到计算出的页面
  }, [doc, docPages, offsetHeight, pageHeight, scrollToPage]); // 依赖项变化时重新创建函数

  /**
   * 滚动事件处理器
   * 监听页面滚动并更新显示的页面
   */
  const handleScroll = useCallback(() => {
    const scrollHeight = document.body.scrollHeight; // 页面总高度
    const screenHeight = window.screen.height; // 屏幕高度
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop; // 滚动距离

    // 根据滚动位置计算当前页码
    if (scrollTop + screenHeight < scrollHeight) {
      const pageNum = scrollTop <= 0
        ? 1
        : docPages - Math.floor((scrollHeight - scrollTop) / pageHeight);
      setShowPageNum(Math.max(1, Math.min(pageNum, docPages))); // 确保页码在有效范围内
    } else {
      setShowPageNum(docPages); // 如果滚动到底部，显示最后一页
    }

    checkRender(document.documentElement); // 检查需要渲染的页面
  }, [docPages, pageHeight]); // 依赖项变化时重新创建函数

  // 监听滚动事件
  useEffect(() => {
    if (!customScroll) {
      window.addEventListener('scroll', handleScroll);
    }

    // 清理函数：移除事件监听器
    return () => {
      if (!customScroll) {
        window.removeEventListener('scroll', handleScroll);
      }
    };
  }, [customScroll, handleScroll]); // 依赖项变化时重新绑定事件

  // 初始化组件
  useEffect(() => {
    getPDFFile(); // 加载 PDF 文件
    setShowPageNum(1); // 设置初始显示页码为第一页
  }, []); // 只在组件挂载时执行一次

  return (
    <div className="pdd2Canvas">
      {/* 显示页码信息 */}
      <Space size="small">
        <Typography.Text strong>
          Page {showPageNum || (docPages ? 1 : '--')} of {docPages || '--'}
        </Typography.Text>
      </Space>
      {/* PDF 页面容器 */}
      <div className='max-w-3xl h-[500px]  overflow-y-auto mx-auto overflow-y-auto'>
        {/* 渲染每一页的容器 */}
        {Array.from({ length: docPages }, (_, index) => (
          <div
            key={index + 1}
            // 设置容器引用，用于后续访问
            ref={el => containerRefs.current[index] = el}
            className="page-container"
            // 设置容器高度
            style={{ height: `${pageHeight}px` }}
            data-index={index}
          >
            {/* 如果当前页在渲染列表中，则渲染 canvas */}
            {renderList.includes(index + 1) && <canvas />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PDFPreview;