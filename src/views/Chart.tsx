import ChinaMap from '@/components/ChinaMap';
import {
  barOption,
  chordOption,
  funnelOption,
  lineOption,
  pieOption,
  pieOption2,
  radarOption
} from '@/mock/chart.json';
import echarts from '@/utils/echarts';
import { Card, Col, Row } from 'antd';
import ReactECharts from 'echarts-for-react';

const ChartPage = () => {
  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={24} md={24} lg={24}>
        <Card title="全国数据分布">
          <ChinaMap />
        </Card>
      </Col>
      <Col xs={24} sm={24} md={12} lg={12}>
        <Card title="堆叠面积图">
          <ReactECharts
            echarts={echarts}
            option={barOption}
            style={{ height: '500px' }}
          />
        </Card>
      </Col>

      <Col xs={24} sm={24} md={12} lg={12}>
        <Card title="折线图">
          <ReactECharts
            echarts={echarts}
            option={lineOption}
            style={{ height: '500px' }}
          />
        </Card>
      </Col>

      <Col xs={24} sm={24} md={12} lg={8}>
        <Card title="极坐标柱状图标签">
          <ReactECharts
            echarts={echarts}
            option={pieOption}
            style={{ height: '300px' }}
          />
        </Card>
      </Col>

      <Col xs={24} sm={24} md={12} lg={8}>
        <Card title="基础南丁格尔玫瑰图">
          <ReactECharts
            echarts={echarts}
            option={pieOption2}
            style={{ height: '300px' }}
          />
        </Card>
      </Col>
      <Col xs={24} sm={24} md={12} lg={8}>
        <Card title="和弦图样式">
          <ReactECharts
            echarts={echarts}
            option={chordOption}
            style={{ height: '300px' }}
          />
        </Card>
      </Col>

      <Col xs={24} sm={24} md={12} lg={12}>
        <Card title="雷达图">
          <ReactECharts
            echarts={echarts}
            option={radarOption}
            style={{ height: '500px' }}
          />
        </Card>
      </Col>
      <Col xs={24} sm={24} md={12} lg={12}>
        <Card title="漏斗图(对比)">
          <ReactECharts
            echarts={echarts}
            option={funnelOption}
            style={{ height: '500px' }}
          />
        </Card>
      </Col>
    </Row>
  );
};

export default ChartPage;
