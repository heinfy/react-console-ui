import { FieldType } from '@/components/QueryForm';
import dayjs from 'dayjs';
import type { DataType } from './TableList';

export const tags1 = ['中国', '美国', '韩国', '日本', '德国'];
export const tags2 = ['开发者', '老板', '设计师', '经理', '测试工程师'];
export const tags3 = ['microsoft', 'apple', 'google', 'facebook', 'amazon'];

export const dataSource = Array.from<DataType>({ length: 100 }).map<DataType>(
  (_, i) => ({
    key: i,
    name: `Test ${i + 1}`,
    gender: Math.floor(Math.random() * 10) > 5 ? '男' : '女',
    age: Math.floor(Math.random() * 100),
    createAt: dayjs()
      .add(-3, 'year')
      .add(-Math.floor(Math.random() * 100), 'days')
      .format('YYYY-MM-DD'),
    address: tags1[Math.floor(Math.random() * 5)],
    tags: [
      tags2[Math.floor(Math.random() * 5)],
      tags3[Math.floor(Math.random() * 5)]
    ]
  })
);

export const fields = [
  {
    type: FieldType.input,
    filed: {
      placeholder: '请输入姓名',
      allowClear: true
    },
    formItem: {
      name: 'name',
      label: '姓名'
    }
  },
  {
    type: FieldType.select,
    filed: {
      placeholder: '请选择性别',
      allowClear: true,
      options: [
        { value: '男', label: '男' },
        { value: '女', label: '女' }
      ]
    },
    formItem: {
      name: 'gender',
      label: '性别'
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
      getValueFromEvent: (value: number[]) => value
      // tooltip: { open: true, placement: 'bottom' }
    },
    formItem: {
      name: 'age',
      label: '年龄'
    }
  },
  {
    type: FieldType.select,
    filed: {
      placeholder: '请选择地址',
      allowClear: true,
      options: [
        { value: '中国', label: '中国' },
        { value: '美国', label: '美国' },
        { value: '韩国', label: '韩国' },
        { value: '日本', label: '日本' },
        { value: '德国', label: '德国' }
      ]
    },
    formItem: {
      name: 'area',
      label: '地址'
    }
  },
  {
    type: FieldType.date,
    filed: {
      placeholder: '选择注册日期'
    },
    formItem: {
      name: 'createdAt',
      label: '注册日期'
    }
  },

  {
    type: FieldType.dateRange,
    filed: {
      placeholder: ['开始日期', '结束日期'] // 修改为数组形式
    },
    formItem: {
      name: 'createdAtRange',
      label: '注册日期范围'
    }
  }
];
