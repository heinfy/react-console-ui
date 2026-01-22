const colors = [
  '#5470c6', // 总人口/总量：深蓝灰 (稳重)
  '#87cefa', // 男性：标准蓝
  '#f48fb1', // 女性：粉色 (柔和且醒目)
  '#91cc75', // 出生人口：绿色 (生机)
  '#9c9c9c' // 死亡人口：橙色 (警示)
];

const option = {
  color: colors,
  tooltip: {
    trigger: 'axis', // 改为 axis 以更好地支持混合图表
    axisPointer: {
      type: 'cross'
    }
  },
  grid: {
    top: '16%',
    left: '8%',
    right: '16%'
  },
  toolbox: {
    feature: {
      dataView: { show: true, readOnly: false },
      restore: { show: true },
      saveAsImage: { show: true }
    }
  },
  legend: {
    data: ['总人口数', '男性', '女性', '出生人口', '死亡人口']
  },
  xAxis: [
    {
      type: 'category',
      axisTick: {
        alignWithLabel: true
      },
      data: [
        '2005',
        '2006',
        '2007',
        '2008',
        '2009',
        '2010',
        '2011',
        '2012',
        '2013',
        '2014',
        '2015',
        '2016',
        '2017',
        '2018',
        '2019',
        '2020',
        '2021',
        '2022',
        '2023',
        '2024',
        '2025'
      ]
    }
  ],
  yAxis: [
    // Y轴 0: 人口总数 (左侧)
    {
      type: 'value',
      name: '总人口 (亿)',
      position: 'left',
      min: 12, // 调整最小值以适应图表美观
      max: 14.5,
      offset: 80,
      axisLine: {
        show: true,
        lineStyle: {
          color: colors[0]
        }
      },
      axisLabel: {
        formatter: '{value} 亿'
      }
    },
    // Y轴 1: 人口总数 (左侧)
    {
      type: 'value',
      name: '男性/女性 (亿)',
      position: 'left',
      offset: 0,
      axisLine: {
        show: true,
        lineStyle: {
          color: colors[1]
        }
      },
      axisLabel: {
        formatter: '{value} 亿'
      }
    },
    // Y轴 2: 出生人口 (右侧)
    {
      type: 'value',
      name: '出生人口 (万人)',
      position: 'right',
      min: 500,
      max: 2000,
      offset: 0,
      axisLine: {
        show: true,
        lineStyle: {
          color: colors[3]
        }
      },
      axisLabel: {
        formatter: '{value} 万'
      }
    },
    // Y轴 3: 死亡人口 (右侧，偏移)
    {
      type: 'value',
      name: '死亡人口 (万人)',
      position: 'right',
      min: 800,
      max: 1200,
      offset: 100,
      axisLine: {
        show: true,
        lineStyle: {
          color: colors[4]
        }
      },
      axisLabel: {
        formatter: '{value} 万'
      }
    }
  ],
  series: [
    {
      name: '总人口数',
      type: 'line',
      yAxisIndex: 0,
      emphasis: {
        focus: 'series'
      },
      lineStyle: {
        width: 4
      },
      itemStyle: {
        color: colors[0]
      },
      data: [
        13.0756, 13.1448, 13.2129, 13.2802, 13.345, 13.4091, 13.4916, 13.5922,
        13.6726, 13.7646, 13.8326, 13.9232, 14.0011, 14.0541, 14.1008, 14.1212,
        14.126, 14.1175, 14.0967, 14.0828, 14.0489
      ]
    },
    {
      name: '男性',
      type: 'bar',
      stack: 'population', // 确保堆叠
      yAxisIndex: 1,
      emphasis: {
        focus: 'series'
      },
      itemStyle: {
        color: colors[1]
      },
      data: [
        6.7375, 6.7728, 6.8048, 6.8357, 6.8647, 6.8748, 6.9161, 6.966, 7.0063,
        7.0522, 7.0857, 7.1307, 7.165, 7.1863, 7.2039, 7.2357, 7.2311, 7.2206,
        7.2032, 7.1909, 7.1685
      ]
    },
    {
      name: '女性',
      type: 'bar',
      stack: 'population',
      yAxisIndex: 1,
      emphasis: {
        focus: 'series'
      },
      itemStyle: {
        color: colors[2]
      },
      data: [
        6.3381, 6.372, 6.4081, 6.4445, 6.4803, 6.5343, 6.5755, 6.6262, 6.6663,
        6.7124, 6.7469, 6.7925, 6.8361, 6.8677, 6.8969, 6.8855, 6.8949, 6.8969,
        6.8935, 6.8919, 6.8804
      ]
    },
    {
      name: '出生人口',
      type: 'bar',
      yAxisIndex: 2,
      lineStyle: {
        width: 2
      },
      symbol: 'circle',
      symbolSize: 6,
      itemStyle: { color: colors[3] },
      data: [
        1621.37, 1589.21, 1598.76, 1612.22, 1594.73, 1595.68, 1790.34, 1980.38,
        1781.54, 1903.64, 1658.53, 1889.38, 1769.74, 1526.28, 1467.89, 1203.13,
        1062.28, 955.75, 900.78, 953.41, 792
      ]
    },
    {
      name: '死亡人口',
      type: 'bar',
      yAxisIndex: 3,
      lineStyle: {
        width: 2
      },
      symbol: 'circle',
      itemStyle: { color: colors[4] },
      symbolSize: 6,
      data: [
        851.22, 895.16, 915.65, 937.58, 944.83, 953.39, 963.3, 969.12, 974.86,
        980.04, 977.96, 980.19, 988.48, 995.03, 999.75, 998.37, 1014.25,
        1040.46, 1109.41, 1092.83, 1131
      ]
    }
  ]
};

export default option;
