import { mockProvinceData } from '@/mock/chart.json';
import echarts, { registerChinaMap } from '@/utils/echarts';
import ReactECharts from 'echarts-for-react';
import React, { useEffect, useState } from 'react';
const ChinaMap: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    registerChinaMap().then(() => setLoading(false));
  }, []);

  if (loading) return <div>加载地图中...</div>;

  const option = {
    title: {
      text: '中国各省市数据分布图',
      subtext: '基于模拟数据展示',
      left: 'center',
      textStyle: {
        fontSize: 18,
        fontWeight: 'bold'
      },
      subtextStyle: {
        fontSize: 12,
        color: '#666'
      }
    },
    tooltip: {
      trigger: 'item',
      formatter: (params: any) => {
        // 查找匹配的数据项，使用部分匹配逻辑
        const dataItem = mockProvinceData.find(item =>
          item.name.includes(params.name) || params.name.includes(item.name)
        );

        if (dataItem) {
          return `
            <strong>${params.name}</strong><br/>
            数值: ${dataItem.value}<br/>
            ${dataItem.label ? `标签: ${dataItem.label}` : ''}
          `;
        } else {
          return `<strong>${params.name}</strong><br/>暂无数据`;
        }
      },
      backgroundColor: 'rgba(0,0,0,0.8)',
      borderColor: '#1890ff',
      borderWidth: 1,
      textStyle: {
        color: '#fff'
      }
    },
    visualMap: {
      min: 0,
      max: 2500,
      left: 'left',
      top: 'bottom',
      text: ['高', '低'],
      calculable: true,
      inRange: {
        color: ['#ffc0cb', '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3']
      },
      orient: 'vertical',
      itemWidth: 15,
      itemHeight: 150,
      align: 'auto',
      padding: 5,
      textStyle: {
        color: '#333'
      }
    },
    series: [
      {
        name: '中国地图',
        type: 'map',
        map: 'china',
        roam: false, // 允许缩放和平移
        zoom: 1.4, // 初始缩放比例
        center: [104, 36], // 设置地图中心坐标，向南偏移
        label: {
          show: true, // 显示标签，即省份名称
          color: '#333',
          fontSize: 10,
          position: 'inside', // 标签位置在区域内
          offset: [0, 0], // 标签偏移量
          formatter: function (params: any) {
            // 如果有数据则显示名称，否则不显示
            const hasData = mockProvinceData.some(item =>
              item.name.includes(params.name) || params.name.includes(item.name)
            );
            return hasData ? params.name : '';
          }
        },
        emphasis: {
          label: {
            color: '#fff',
            fontSize: 12,
            fontWeight: 'bold'
          },
          itemStyle: {
            areaColor: '#f3ce85',
            borderColor: '#c67b14',
            borderWidth: 1
          }
        },
        itemStyle: {
          borderColor: '#fff',
          borderWidth: 0.5,
          areaColor: '#e6e6e6' // 设置默认颜色，避免全灰
        },
        data: mockProvinceData,
        animationDuration: 1000,
        animationEasing: 'elasticOut'
      }
    ]
  };

  return (
    <ReactECharts
      echarts={echarts}
      option={option}
      style={{ minHeight: 600, width: '100%' }}
      opts={{ renderer: 'canvas' }}
    />
  );
};

export default ChinaMap;