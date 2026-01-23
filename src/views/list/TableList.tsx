import QueryForm from '@/components/QueryForm';
import TableCard from '@/components/TableCard';
import { sizeTypeMap } from '@/types/types';
import type { TableColumnsType } from 'antd';
import { Flex, Space, Tag } from 'antd';
import type { TableRowSelection } from 'antd/es/table/interface';
import React, { useEffect, useState } from 'react';
import { dataSource, fields } from './mock';

export interface DataType {
  key: React.Key;
  name: string;
  age: number;
  createAt: string;
  address: string;
  tags: string[];
}


const TableList: React.FC = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [data, setData] = useState<DataType[]>([]);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const columns: TableColumnsType<DataType> = [
    { title: '姓名', key: 'name', dataIndex: 'name' },
    { title: '性别', key: 'gender', dataIndex: 'gender', ellipsis: true },
    { title: '年龄', key: 'age', dataIndex: 'age', ellipsis: true },
    { title: '创建日期', key: 'createAt', dataIndex: 'createAt' },
    { title: '地址', key: 'address', dataIndex: 'address' },
    {
      title: '标签',
      key: 'tags',
      dataIndex: 'tags',
      render: (_, { tags }) => (
        <Flex gap="small" align="center" wrap>
          {tags.map((tag) => {
            const color = Math.floor(Math.random() * 10) > 5 ? 'geekblue' : 'green';
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </Flex>
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a>Invite {record.key}</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];

  const getMockData = () => {
    setIsFetching(true)
    const delay = Math.floor(Math.random() * 1000);
    setTimeout(() => {
      setIsFetching(false)
      setData(dataSource.slice((current - 1) * pageSize, current * pageSize))
    }, delay);
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getMockData();
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getMockData();
  }, [current, pageSize]);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys,
    onChange: onSelectChange,
  };


  const handleQuery = values => {
    console.log('查询参数:', values);
  };

  const handleReset = () => {
    console.log('表单已重置');
    setCurrent(1)
    setPageSize(10)
  };

  const refreshHandle = () => {
    getMockData();
  }

  return (
    <Flex gap="middle" vertical>
      <QueryForm fields={fields} onQuery={handleQuery} onReset={handleReset} isFetching={isFetching} />
      <TableCard<DataType>
        tableCardTitle="Table List"
        data={data}
        columns={columns}
        size={sizeTypeMap.small}
        isFetching={isFetching}
        createHandle={() => { }}
        deleteHandle={() => { }}
        refreshHandle={refreshHandle}
        extra={[<Tag color="green">Tag</Tag>]}
        tableProps={{
          rowSelection: rowSelection,
          scroll: {
            x: 'max-content'
          },
          pagination: {
            total: dataSource.length,
            showTotal: (total, range) => `${range[0]}-${range[1]}/${total}条`,
            defaultCurrent: 1,
            defaultPageSize: 10,
            current: current,
            pageSize: pageSize,
            onChange: (page, pageSize) => {
              setCurrent(page)
              setPageSize(pageSize)
            }
          }
        }}
      />
    </Flex>
  );
};

export default TableList;
