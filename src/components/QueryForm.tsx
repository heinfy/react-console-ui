import { useBreakpoint } from '@/hooks/useMediaQuery';
import { ArrowDownOutlined, ArrowUpOutlined, RedoOutlined, SearchOutlined } from '@ant-design/icons';
import type { Breakpoint, CascaderProps, FormItemProps, InputProps, SelectProps } from 'antd';
import { Button, Card, Cascader, Col, DatePicker, Flex, Form, Input, Row, Select, Slider, Switch, TimePicker, } from 'antd';
import classnames from 'classnames';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

const { Option } = Select;
const DateRangePicker = DatePicker.RangePicker;
const TimeRangePicker = TimePicker.RangePicker;

// 使用常量对象替代枚举
export const FieldType = {
  input: 'input',
  select: 'select',
  cascader: 'cascader',
  switch: 'switch',
  date: 'date',
  dateRange: 'dateRange',
  time: 'time',
  timeRange: 'timeRange',
  slider: 'slider'
} as const;

export interface RenderInputFiledProps {
  type: typeof FieldType.input;
  filed: InputProps;
  formItem: FormItemProps;
}

export interface RenderSelectFiledProps {
  type: typeof FieldType.select;
  filed: SelectProps;
  formItem: FormItemProps;
}

export interface RenderCascaderFiledProps {
  type: typeof FieldType.cascader;
  filed: Omit<CascaderProps, 'multiple'>;
  formItem: FormItemProps;
}

export interface RenderSwitchFiledProps {
  type: typeof FieldType.switch;
  filed: Parameters<typeof Switch>[0];
  formItem: FormItemProps;
}

export interface RenderDateFiledProps {
  type: typeof FieldType.date;
  filed: Parameters<typeof DatePicker>[0];
  formItem: FormItemProps;
}

export interface RenderDateRangeFiledProps {
  type: typeof FieldType.dateRange;
  filed: Parameters<typeof DateRangePicker>[0];
  formItem: FormItemProps;
}

export interface RenderTimeFiledProps {
  type: typeof FieldType.time;
  filed: Parameters<typeof TimePicker>[0];
  formItem: FormItemProps;
}

export interface RenderTimeRangeFiledProps {
  type: typeof FieldType.timeRange;
  filed: Parameters<typeof TimeRangePicker>[0];
  formItem: FormItemProps;
}

// 修改RenderSliderFiledProps接口定义
export interface RenderSliderFiledProps {
  type: typeof FieldType.slider;
  filed: Parameters<typeof Slider>[0];
  formItem: FormItemProps;
}

export type QueryFormFileds =
  | RenderInputFiledProps
  | RenderSelectFiledProps
  | RenderCascaderFiledProps
  | RenderSwitchFiledProps
  | RenderDateFiledProps
  | RenderDateRangeFiledProps
  | RenderTimeFiledProps
  | RenderTimeRangeFiledProps
  | RenderSliderFiledProps;

const formItemStyle: React.CSSProperties = {
  marginBottom: '0px',
};

// 根据 type 渲染对应组件
const renderField = (type: QueryFormFileds['type'], field: QueryFormFileds['filed']) => {
  switch (type) {
    case FieldType.input:
      return <Input {...field as InputProps} />;

    case FieldType.select:
      return (
        <Select {...field as SelectProps}>
          {(field as SelectProps).options?.map((opt) => (
            <Option key={opt.value} value={opt.value}>
              {opt.label}
            </Option>
          ))}
        </Select>
      );

    case FieldType.cascader:
      return <Cascader {...field as RenderCascaderFiledProps['filed']} />;

    case FieldType.switch:
      return <Switch {...field as Parameters<typeof Switch>[0]} />;

    case FieldType.date:
      return <DatePicker style={{ width: '100%' }} {...field as Parameters<typeof DatePicker>[0]} />;

    case FieldType.dateRange:
      return <DateRangePicker style={{ width: '100%' }} {...field as Parameters<typeof DateRangePicker>[0]} />;


    case FieldType.time:
      return <TimePicker style={{ width: '100%' }} {...field as Parameters<typeof TimePicker>[0]} />;

    case FieldType.timeRange:
      return <TimeRangePicker style={{ width: '100%' }} {...field as Parameters<typeof TimeRangePicker>[0]} />;

    case FieldType.slider:
      return (
        <Slider  {...field as Parameters<typeof Slider>[0]} />
      );

    default:
      console.warn(`Unsupported field type: ${type}`);
      return <Input placeholder="Unknown field" />;
  }
};

const isRangeType = (type: QueryFormFileds['type']) => type === FieldType.dateRange || type === FieldType.timeRange || type === FieldType.slider;

// 响应式栅格配置
const getColSpan = (type: QueryFormFileds['type']) => {
  const isRange = isRangeType(type);
  return {
    xs: 24,   // 手机 <576px
    sm: isRange ? 24 : 12,   // 平板 ≥576px
    md: isRange ? 24 : 12,   // 中屏 ≥768px
    lg: isRange ? 12 : 8,    // 笔记本 ≥992px
    xl: isRange ? 12 : 6,    // 大屏 ≥1200px
    xxl: isRange ? 8 : 4,   // 超大屏 ≥1600px
  };
};

const getQueryFormGrid = (totalColSpan: number[], colSize: Breakpoint) => {
  const grid = []
  for (let i = 0; i < totalColSpan.length; i++) {
    if (i === 0) grid.push([]);

    const lastRow: number[] = grid[grid.length - 1];
    const colSpan = totalColSpan[i];
    const lastColSpans = lastRow.reduce((sum, val) => sum + val, 0);
    switch (colSize) {
      case 'xs':
        if (i === 0) lastRow.push(colSpan);
        else grid.push([colSpan]);
        break;
      case 'sm':
        if (lastColSpans == 24 || colSpan == 24) {
          if (i === 0) lastRow.push(colSpan);
          else grid.push([colSpan]);
        } else if (lastColSpans + colSpan <= 24) {
          lastRow.push(colSpan);
        } else {
          grid.push([colSpan]);
        }
        break;
      case 'md':
        if (lastColSpans == 24 || colSpan == 24) {
          if (i === 0) lastRow.push(colSpan);
          else grid.push([colSpan]);
        } else if (lastColSpans + colSpan <= 24) {
          lastRow.push(colSpan);
        } else {
          grid.push([colSpan]);
        }
        break;
      case 'lg':
        if (lastColSpans == 24) {
          if (i === 0) lastRow.push(colSpan);
          else grid.push([colSpan]);
        } else if (lastColSpans + colSpan <= 24) {
          lastRow.push(colSpan);
        } else {
          grid.push([colSpan]);
        }
        break;
      case 'xl':
        if (lastColSpans == 24) {
          if (i === 0) lastRow.push(colSpan);
          else grid.push([colSpan]);
        } else if (lastColSpans + colSpan <= 24) {
          lastRow.push(colSpan);
        } else {
          grid.push([colSpan]);
        }
        break;
      case 'xxl':
        if (lastColSpans == 24) {
          if (i === 0) lastRow.push(colSpan);
          else grid.push([colSpan]);
        } else if (lastColSpans + colSpan <= 24) {
          lastRow.push(colSpan);
        } else {
          grid.push([colSpan]);
        }
        break;
      default:
    }
  }
  return grid;
};

const QueryForm = ({ fields, onQuery, onReset, isFetching }: {
  fields: QueryFormFileds[];
  onQuery?: (values: object) => void;
  onReset?: () => void;
  isFetching?: boolean;
}
) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const colSize = useBreakpoint();
  const isMobile = useMemo(() => {
    return colSize === 'sm' || colSize === 'xs';
  }, [colSize]);

  const totalColSpan = useMemo(() => fields.map(({ type }) => {
    const isRange = isRangeType(type);
    let colSpan = 24;
    switch (colSize) {
      case 'xs':
        colSpan = 24;
        break;
      case 'sm':
        colSpan = isRange ? 24 : 12;
        break;
      case 'md':
        colSpan = isRange ? 24 : 12;
        break;
      case 'lg':
        colSpan = isRange ? 12 : 8;
        break;
      case 'xl':
        colSpan = isRange ? 8 : 6;
        break;
      case 'xxl':
        colSpan = isRange ? 8 : 4;
        break;
      default:
    }
    return colSpan
  }), [colSize, fields]);

  const grid = useMemo(() => getQueryFormGrid(totalColSpan, colSize), [totalColSpan, colSize]);
  // 预计算显示状态相关数据
  const showExpandBtn = useMemo(() => grid.length > 1, [grid]);
  const showFieldCountState = useMemo(() => grid[0]?.length || 0, [grid]);

  const [isShowAllFields, setIsShowAllFields] = useState(false);

  const handleFinish = (values: object) => {
    console.log('Query values:', values);
    if (onQuery) onQuery(values);
  };

  const handleReset = () => {
    form.resetFields();
    if (onReset) onReset();
  };


  // 收起/展开按钮点击
  const handleToggleShow = () => {
    setIsShowAllFields(!isShowAllFields);
  };

  return (
    <div className="query-form-wrapper relative">
      <Card>
        <Form
          form={form}
          onFinish={handleFinish}
          className="query-form"
          layout='horizontal'
        >
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={20} lg={20} xl={20} xxl={22}>
              <Row gutter={[16, 16]}>
                {/* 表单字段区域 */}
                {(isShowAllFields ? fields : fields.slice(0, showFieldCountState)).map(({ type, filed, formItem }, index) => (
                  <Col key={`${formItem.name || formItem.label}-${index}`} {...getColSpan(type)}>
                    <Form.Item
                      style={formItemStyle}
                      {...formItem}
                    >
                      {renderField(type, filed)}
                    </Form.Item>
                  </Col>
                ))}
              </Row>
            </Col >
            <Col xs={24} sm={24} md={4} lg={4} xl={4} xxl={2} style={{ position: 'relative' }}>
              {!isMobile && <div className='absolute top-0 left-2 w-px h-full bg-gray-200'></div>}
              <Flex gap="small" vertical={!isMobile} justify="center" align="center">
                <Button type="primary" htmlType="submit" icon={<SearchOutlined />} loading={isFetching}>
                  {t('com.query.form.search')}
                </Button>
                <Button onClick={handleReset} icon={<RedoOutlined />}>
                  {t('com.query.form.reset')}
                </Button>
              </Flex>
            </Col>
          </Row>
        </Form>
      </Card>
      {/* 下方箭头指示器 */}
      {
        showExpandBtn && <div className={classnames(
          'absolute -bottom-4 left-1/2 transform -translate-x-1/2',
          isShowAllFields ? 'animate-none' : 'animate-bounce'  // 只在收起状态有弹跳动画
        )}>
          <Button
            shape="circle"
            size="small"
            icon={isShowAllFields ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
            onClick={handleToggleShow}
          />
        </div>
      }
    </div>
  );
};

export default QueryForm;