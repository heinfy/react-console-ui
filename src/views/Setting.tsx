import QueryForm, { FieldType, type QueryFormFileds } from '@/components/QueryForm';

const SettingPage: React.FC = () => {
  const fields: QueryFormFileds[] = [
    {
      type: FieldType.input,
      filed: {
        placeholder: '请输入用户ID',
        allowClear: true
      },
      formItem: {
        name: 'userid',
        label: '用户ID'
      }
    },
    {
      type: FieldType.select,
      filed: {
        placeholder: '请选择性别',
        allowClear: true,
        options: [
          { value: 'male', label: '男' },
          { value: 'female', label: '女' },
          { value: 'other', label: '其他' }
        ]
      },
      formItem: {
        name: 'gender',
        label: '性别'
      }
    },
    {
      type: FieldType.cascader,
      filed: {
        placeholder: '请选择地区',
        allowClear: true,
        options: [
          {
            value: 'zhejiang',
            label: '浙江',
            children: [
              { value: 'hangzhou', label: '杭州' },
              { value: 'ningbo', label: '宁波' }
            ]
          },
          {
            value: 'jiangsu',
            label: '江苏',
            children: [
              { value: 'nanjing', label: '南京' },
              { value: 'suzhou', label: '苏州' }
            ]
          }
        ],
      },
      formItem: {
        name: 'area',
        label: '地区',
      }
    },
    {
      type: FieldType.switch,
      filed: {},
      formItem: {
        name: 'checked',
        label: '账号是否活跃',
      }
    },
    {
      type: FieldType.date,
      filed: {
        placeholder: '选择注册日期'
      },
      formItem: {
        name: 'createdAt',
        label: '注册日期',
      }
    },
    {
      type: FieldType.date,
      filed: {
        placeholder: '选择订单日期',
        showTime: true,
      },
      formItem: {
        name: 'orderDate',
        label: '订单日期',
      }
    },
    {
      type: FieldType.dateRange,
      filed: {
        placeholder: ['开始日期', '结束日期'], // 修改为数组形式
      },
      formItem: {
        name: 'orderDateRange',
        label: '订单日期时间',
      }
    },
    {
      type: FieldType.dateRange,
      filed: {
        placeholder: ['开始时间', '结束时间'], // 修改为数组形式
        showTime: true,
      },
      formItem: {
        name: 'orderDateRange2',
        label: '订单时间范围2',
      }
    },
    {
      type: FieldType.time,
      filed: {
        placeholder: '选择时间'
      },
      formItem: {
        name: 'time',
        label: '时间'
      }
    },
    {
      type: FieldType.timeRange,
      filed: {
        placeholder: ['开始时间', '结束时间'], // 修改为数组形式
      },
      formItem: {
        name: 'timeRange',
        label: '时间范围'
      }
    },
    {
      type: FieldType.slider,
      filed: {
        range: true,
        marks: {
          0: '0',
          50: '50',
          100: '100'
        },
        // defaultValue: [20, 80],
        min: 0,
        max: 100,
        // Slider 需要特殊处理值
        getValueProps: (value: number[]) => ({ value }),
        getValueFromEvent: (value: number[]) => value,
        // tooltip: { open: true, placement: 'bottom' }
      },
      formItem: {
        name: 'score',
        label: '评分',
      }
    }
  ];

  const handleQuery = values => {
    console.log('查询参数:', values);
  };

  const handleReset = () => {
    console.log('表单已重置');
  };
  return (
    <div>
      <QueryForm fields={fields} onQuery={handleQuery} onReset={handleReset} />
    </div>
  );
};

export default SettingPage;
