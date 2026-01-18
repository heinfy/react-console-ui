import { defaultVar } from '@/config';
import { Button } from 'antd';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

import echarts from '@/utils/echarts'; // 引入自定义实例
import ReactECharts from 'echarts-for-react';

function IndexPage() {
  const { t } = useTranslation();
  const [count, setCount] = useState(0);
  const option = {
    title: { text: '按需加载示例' },
    tooltip: {},
    legend: { data: ['销量'] },
    xAxis: { type: 'category', data: ['A', 'B', 'C'] },
    yAxis: { type: 'value' },
    series: [{ name: '销量', type: 'bar', data: [10, 20, 30] }],
  };
  return (
    <div className="card" style={{
      height: 3000
    }} >
      <Helmet>
        <title>
          {t('menu.login')}- {defaultVar.title}
        </title>
      </Helmet>
      <Button onClick={() => setCount(count => count + 1)}>
        count is {count}
      </Button>
      <ReactECharts
        echarts={echarts}
        option={option}
        style={{ height: 800 }}
      />
    </div>
  );
}

export default IndexPage;
