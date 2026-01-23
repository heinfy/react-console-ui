import { DragHandle, SortableListItem } from '@/components/SortableListItem';
import useEmotionCss from '@/hooks/useEmotionCss';
import { useBreakpoint } from '@/hooks/useMediaQuery';
import { sizeTypeMap } from '@/types/types';
import {
  ColumnHeightOutlined,
  DeleteOutlined,
  PlusCircleOutlined,
  RedoOutlined,
  SettingOutlined,
  VerticalAlignBottomOutlined,
  VerticalAlignTopOutlined
} from '@ant-design/icons';
import type { DragEndEvent } from '@dnd-kit/core';
import { DndContext } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import type { CardProps, CheckboxProps, MenuProps, TableProps } from 'antd';
import {
  Button,
  Card,
  Checkbox,
  Divider,
  Dropdown,
  Flex,
  Popconfirm,
  Space,
  Table,
  Tooltip
} from 'antd';
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import classnames from 'classnames';
import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface TableCardProps<T> {
  size?: SizeType;
  data?: T[];
  columns?: TableProps<T>['columns'];
  tableCardTitle?: React.ReactNode | string;
  extra?: React.ReactNode[];
  isFetching?: boolean;
  createHandle?: () => void;
  deleteHandle?: () => void;
  refreshHandle?: () => void;
  tableProps?: Omit<TableProps<T>, 'columns' | 'dataSource' | 'size'>;
  cardProps?: Omit<CardProps, 'title' | 'extra'>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TableCard = <T = any>({
  size = sizeTypeMap.large,
  data = [],
  columns = [],
  tableCardTitle = '',
  extra = [],
  isFetching = false,
  createHandle,
  deleteHandle,
  refreshHandle,
  tableProps = {},
  cardProps = {}
}: TableCardProps<T>) => {
  const { t, i18n } = useTranslation();
  const [columnState, setColumnState] = useState([...columns]);
  const [sizeState, setSizeState] = useState<SizeType>(size);
  const [showAllColumns, setShowAllColumns] = useState<boolean>(true);
  const [columnMenus, setColumnMenus] = useState(
    () =>
      columns.map(column => ({
        label: column.title,
        key: column.key as string,
        checked: true
      })),
  )!;
  const colSize = useBreakpoint();
  const isMobile = useMemo(() => {
    const isM = colSize === 'sm' || colSize === 'xs';
    return isM;
  }, [colSize]);

  const tableSizeItems: MenuProps['items'] = useMemo(() => [
    {
      label: t('com.table.large'),
      key: sizeTypeMap.large
    },
    {
      label: t('com.table.middle'),
      key: sizeTypeMap.middle
    },
    {
      label: t('com.table.small'),
      key: sizeTypeMap.small
    }
  ], [t, i18n.language]);

  const columnMap = useMemo(() => {
    return columns.reduce((acc, column) => {
      acc[column.key] = column;
      return acc;
    }, {} as Record<string, TableProps<T>['columns']>)
  }, [columns]);

  useEffect(() => {
    setShowAllColumns(columnMenus.every(i => i.checked))
    const columnState: TableProps<T>['columns'] = []
    columnMenus.forEach(menu => {
      if (menu.checked) {
        columnState.push(columnMap[menu.key])
      }
    })
    setColumnState(columnState)
  }, [columnMenus, columnMap]);

  // 行宽设置
  const onSize: MenuProps['onClick'] = ({ key }) => {
    setSizeState(key as SizeType);
  };

  // 展示全部列
  const onShowAllColumnsChange: CheckboxProps['onChange'] = e => {
    const checked = e.target.checked;
    setShowAllColumns(checked);
    setColumnState(checked ? [...columns] : [])
    setColumnMenus(prevMenus => prevMenus.map(menu => ({ ...menu, checked })))
  };

  // 展示/隐藏某列
  const onShowColumnChange = (checked: boolean, key: string) => {
    setColumnMenus(prevMenus => {
      return prevMenus.map(menu => {
        if (menu.key === key) {
          return {
            ...menu,
            checked
          };
        }
        return menu;
      });
    })
  };

  // 重置列
  const resetColumns = () => {
    setColumnMenus(
      columns.map(column => ({
        label: column.title,
        key: column.key as string,
        checked: true
      })),
    );
  };


  const moveItemUp = (key: string) => {
    const localColumnMenus = [...columnMenus];
    let index = columnMenus.findIndex(menu => menu.key === key);
    if (index == 0) return;
    while (index > 0) {
      const temp = localColumnMenus[index];
      localColumnMenus[index] = localColumnMenus[index - 1];
      localColumnMenus[index - 1] = temp;
      index--;
    }
    setColumnMenus(localColumnMenus)
  };

  const moveItemDown = (key: string) => {
    const localColumnMenus = [...columnMenus];
    let index = columnMenus.findIndex(menu => menu.key === key);
    const len = localColumnMenus.length - 1;
    if (index == len) return;
    while (index < len) {
      const temp = localColumnMenus[index];
      localColumnMenus[index] = localColumnMenus[index + 1];
      localColumnMenus[index + 1] = temp;
      index++;
    }
    setColumnMenus(localColumnMenus)
  };

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (!active || !over) {
      return;
    }
    if (active.id !== over.id) {
      setColumnMenus((prevState) => {
        const activeIndex = prevState.findIndex((i) => i.key === active.id);
        const overIndex = prevState.findIndex((i) => i.key === over.id);
        return arrayMove(prevState, activeIndex, overIndex);
      });
    }
  };

  const dropdownClassName = useEmotionCss(({ token }) => ({
    backgroundColor: token.colorBgElevated,
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowSecondary
  }));

  const dropdownFlexClassName = useEmotionCss(({ token }) => ({
    width: '100%',
    padding: '8px 16px',
    borderRadius: 4,
    color: token.colorTextLabel,
    '&:hover': {
      color: token.colorPrimaryText,
      backgroundColor: token.colorBgContainer,
      '.iconTop,.iconBottom': {
        cursor: 'pointer',
      },
      '.iconTop:hover,.iconBottom:hover': {
        color: token.colorPrimaryTextHover,
      }
    },
  }));

  return (
    <Card
      title={tableCardTitle}
      extra={
        <Space>
          {/* 新增 */}
          {createHandle && (
            <Tooltip title={t('com.table.card.create')}>
              <Button type='primary' icon={<PlusCircleOutlined />} onClick={createHandle}>
              </Button>
            </Tooltip>
          )}
          {/* 刷新 */}
          {refreshHandle && (
            <Tooltip title={t('com.table.card.refresh')}>
              <Button icon={<RedoOutlined />} onClick={refreshHandle} />
            </Tooltip>
          )}
          {/* 删除 */}
          {deleteHandle && (
            <Popconfirm
              title={t('common.confirm.content')}
              okText={t('common.ok')}
              cancelText={t('common.cancel')}
            >
              <Button danger icon={<DeleteOutlined />} />
            </Popconfirm>
          )}
          {extra}
          {
            isMobile ? null : <>
              {/* 行宽设置 */}
              <Dropdown
                menu={{
                  items: tableSizeItems,
                  onClick: onSize,
                  defaultSelectedKeys: [sizeTypeMap.large],
                  selectedKeys: [sizeState!]
                }}
              >
                <Button icon={<ColumnHeightOutlined />} />
              </Dropdown>
              {/* columns 显示 */}
              <Dropdown
                popupRender={() => (
                  <div className={classnames(dropdownClassName)}>
                    <Flex
                      style={{ padding: 8 }}
                      justify="space-between"
                      align="center"
                    >
                      <Checkbox checked={showAllColumns} onChange={onShowAllColumnsChange}>{t('com.table.card.columnSetting')}</Checkbox>
                      <Button type="link" onClick={resetColumns}>{t('com.table.card.columnReset')}</Button>
                    </Flex>
                    <Divider style={{ margin: 0 }} />
                    <div className='column-setting'>
                      <DndContext
                        modifiers={[restrictToVerticalAxis]}
                        onDragEnd={onDragEnd}
                        id="list-drag-sorting-handler"
                      >
                        <SortableContext items={columnMenus.map((item) => item.key)} strategy={verticalListSortingStrategy}>
                          {columnMenus.map(({ key, checked, label }) => (
                            <SortableListItem key={key} itemKey={key}>
                              <Flex
                                className={classnames(dropdownFlexClassName)}
                                justify="space-between"
                                align="center"
                                key={key}
                              >
                                <Space>
                                  <DragHandle />
                                  <Checkbox checked={checked} onChange={() => onShowColumnChange(!checked, key)}>
                                    {label as string}
                                  </Checkbox>
                                </Space>
                                <Space>
                                  <Tooltip title={t('com.table.card.columnFixed.left')}>
                                    <VerticalAlignTopOutlined
                                      className='iconTop'
                                      onClick={() => moveItemUp(key)}
                                    />
                                  </Tooltip>
                                  <Tooltip title={t('com.table.card.columnFixed.right')}>
                                    <VerticalAlignBottomOutlined
                                      className='iconBottom'
                                      onClick={() => moveItemDown(key)}
                                    />
                                  </Tooltip>
                                </Space>
                              </Flex>
                            </SortableListItem>
                          ))}
                        </SortableContext>
                      </DndContext>
                    </div>
                  </div>
                )}
                trigger={['click']}
              >
                <Button icon={<SettingOutlined />} />
              </Dropdown></>
          }

        </Space>
      }
      {...cardProps}
    >
      <Table<T>
        size={sizeState}
        columns={columnState}
        loading={isFetching}
        dataSource={data}
        {...tableProps}
      />
    </Card>
  );
};

export default TableCard;
