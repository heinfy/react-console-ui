import CopyableText from '@/components/CopyableText';
import EventCalendar from '@/components/EventCalendar';
import { lineOption2 } from '@/mock/chart.json';
import { useAppSelector } from '@/store/hooks';
import { selectUser } from '@/store/user/userSlice';
import type { UserInfo } from '@/types/self';
import echarts from '@/utils/echarts';
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  EditOutlined,
  HeartOutlined,
  ShareAltOutlined
} from '@ant-design/icons';
import type { CardMetaProps } from 'antd';
import {
  Alert,
  Avatar,
  Card,
  Carousel,
  Col,
  Descriptions,
  Row,
  Statistic,
  Timeline
} from 'antd';
import ReactECharts from 'echarts-for-react';
import React, { useMemo } from 'react';

const contentStyle: React.CSSProperties = {
  height: '160px',
  color: '#fff',
  fontSize: '48px',
  fontWeight: 'bold',
  lineHeight: '160px',
  textAlign: 'center',
};

const gridStyle: React.CSSProperties = {
  width: '100%',
  textAlign: 'center'
};

const stylesCardMeta: CardMetaProps['styles'] = {
  title: {
    color: '#A7AAE1'
  },
  description: {
    color: '#A7AAE1'
  }
};

const actions = [
  <HeartOutlined key="heart" style={{ color: '#ff6b6b' }} />,
  <ShareAltOutlined key="share" style={{ color: '#4ecdc4' }} />,
  <EditOutlined key="edit" style={{ color: '#45b7d1' }} />
];

const IndexPage: React.FC = () => {
  const { userInfo } = useAppSelector(selectUser) as { userInfo: UserInfo };

  const descriptions = useMemo(() => {
    const { name, email, roles } = userInfo;
    return [
      {
        label: '姓名',
        children: name,
        span: 1
      },
      {
        label: '邮箱',
        children: <CopyableText text={email} />,
        span: 1
      },
      {
        label: '角色',
        children: roles.map(role => role.display_name).join(', '),
        span: 1
      },
      {
        label: '项目数',
        children: 100
      },
      {
        label: '团队内排名',
        children: '8/73',
        span: { xs: 1, sm: 1, md: 2, lg: 2, xl: 2, xxl: 2 }
      },
      {
        label: '项目完成趋势',
        span: { xs: 1, sm: 1, md: 2, lg: 2, xl: 3, xxl: 3 },
        children: (
          <ReactECharts
            echarts={echarts}
            option={{
              xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
              },
              yAxis: {
                type: 'value'
              },
              series: [
                {
                  data: [10, 30, 24, 18, 35, 47, 60],
                  type: 'line'
                }
              ]
            }}
            style={{ height: '400px', margin: '0', padding: '0' }}
          />
        )
      }
    ];
  }, [userInfo]);

  const getBgColor = () => `#${Math.floor(Math.random() * 0xffffff).toString(16).padEnd(6, '0')}`;
  return (
    <>
      <Alert title="欢迎来到工作台" type="success" closable />

      <Carousel
        style={{ marginTop: '16px' }}
        autoplay
        arrows
        dotPlacement="bottom"
      >
        <div>
          <h3 style={{ ...contentStyle, background: getBgColor() }}>1</h3>
        </div>
        <div>
          <h3 style={{ ...contentStyle, background: getBgColor() }}>2</h3>
        </div>
        <div>
          <h3 style={{ ...contentStyle, background: getBgColor() }}>3</h3>
        </div>
        <div>
          <h3 style={{ ...contentStyle, background: getBgColor() }}>4</h3>
        </div>
      </Carousel>

      <div className="mt-4">
        <Descriptions
          title="工作台"
          bordered
          column={{ xs: 1, sm: 1, md: 2, lg: 2, xl: 3, xxl: 3 }}
          items={descriptions}
        />
      </div>

      <Row className="mt-6" gutter={[16, 16]}>
        <Col md={24} lg={12} xl={16}>
          <Card
            title="进行中的项目"
            extra={<a href="/chart">全部项目</a>}
            style={{
              width: '100%'
            }}
          >
            <Row>
              {Array.of(1, 2, 3, 4, 5, 6).map(item => (
                <Col xs={24} sm={24} md={24} lg={12} xl={8} key={item}>
                  <Card.Grid style={gridStyle}>
                    <Card.Meta
                      avatar={
                        <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />
                      }
                      styles={stylesCardMeta}
                      title={`Item ${item}`}
                      description={`Item ${item} description}`}
                    />
                  </Card.Grid>
                </Col>
              ))}
            </Row>
          </Card>
          <Card title="工作日程" style={{ marginTop: '16px' }}>
            <EventCalendar />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={24} lg={12} xl={8}>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12}>
              <Card title="绩效评估">
                <Statistic
                  title="Active"
                  value={11.28}
                  precision={2}
                  styles={{ content: { color: '#3f8600' } }}
                  prefix={<ArrowUpOutlined />}
                  suffix="%"
                />
              </Card>
            </Col>
            <Col xs={24} sm={12}>
              <Card title="错误率">
                <Statistic
                  title="Idle"
                  value={9.3}
                  precision={2}
                  styles={{ content: { color: '#cf1322' } }}
                  prefix={<ArrowDownOutlined />}
                  suffix="%"
                />
              </Card>
            </Col>
          </Row>
          <Card title="业务分部" style={{ marginTop: 16 }}>
            <ReactECharts
              echarts={echarts}
              option={lineOption2}
              style={{ height: '500px' }}
            />
          </Card>
          <Card title="事项进度" actions={actions} style={{ marginTop: 16 }}>
            <Timeline
              items={[
                {
                  content: 'Create a services site 2015-09-01'
                },
                {
                  content: 'Solve initial network problems 2015-09-01'
                },
                {
                  content: 'Technical testing 2015-09-01'
                },
                {
                  content: 'Network problems being solved 2015-09-01'
                }
              ]}
            />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default IndexPage;
