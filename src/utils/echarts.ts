import * as echarts from 'echarts/core';

// 引入必须的组件
import {
  GridComponent,
  LegendComponent,
  TitleComponent,
  TooltipComponent
} from 'echarts/components';

// 引入需要的图表类型
import { BarChart, LineChart, PieChart } from 'echarts/charts';

// 引入渲染器（Canvas 或 SVG）
import { CanvasRenderer } from 'echarts/renderers';

// 注册所需组件和图表
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  LineChart,
  BarChart,
  PieChart,
  CanvasRenderer
]);

export default echarts;

// 定义 GeoJSON 接口类型
interface GeoJSON {
  type: 'FeatureCollection';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  features: any[];
}

// 异步加载中国地图 GeoJSON（推荐方式）
export const registerChinaMap = async () => {
  if (!echarts.getMap('china')) {
    // https://datav.aliyun.com/portal/school/atlas/area_selector
    const chinaGeoJson = await import('@/assets/china-contour.json'); // 或从 public 目录 fetch
    // 使用类型断言解决类型不匹配问题
    echarts.registerMap('china', chinaGeoJson.default as GeoJSON);
  }
};
