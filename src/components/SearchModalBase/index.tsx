import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from 'react';
import {
  Table,
  Button,
  Modal,
  Input,
  Form,
  Select,
  message,
  Row,
  Col,
  Popconfirm,
} from 'antd';
import EyeOutlined from '@ant-design/icons/EyeOutlined';
import EditOutlined from '@ant-design/icons/EditOutlined';
import DeleteOutlined from '@ant-design/icons/DeleteOutlined';
import axios from 'axios';
import moment from 'moment';
import cloneDeep from 'lodash/cloneDeep';
import forIn from 'lodash/forIn';
import { session } from '@/utils/storage';
import EditItemModal from './EditItemModal';
import ImportListModal from './ImportListModal';
import styles from './index.less';

const { Search } = Input;

const sorterEnum: any = {
  descend: 'desc',
  ascend: 'asc',
  undefined: 'asc',
};

export default function ({
  selectRow = { id: null },
  isModalSearch = true,
  value = null,
  onChange = (val: any) => {},
  config = { requestApi: null, options: [] },
  columnConfig = [],
  reqField = 'id',
  resField = 'name',
  editResld = 'id',
  editResName = 'name',
  scrollX = null,
  scrollY = null,
  disabled = false,
}: any) {
  const { options, requestApi } = config;
  console.log(options,'options');
  const [form] = Form.useForm();
  const [formOptions, setFormOptions] = useState(cloneDeep(options)); // 筛选项配置项
  const [currentValue, setCurrentValue] = useState<any>(null); // 当前输入搜索框的值
  const inputRef = useRef<any>();
  const [modalVisible, setModalVisible] = useState(false); // 控制弹窗是否展示
  const [dataSource, setDataSource] = useState<any>([]); // 表格数据
  const [tableLoading, setTableLoading] = useState(false);
  const [tableTotal, setTableTotal] = useState(0);
  const [searchParams, setSearchParams] = useState({
    page: 1,
    size: 20,
    sort: 'id,asc',
  }); // 表格排序分页等参数，表单查询参数
  const [seletRowKey, setSeletRowKey] = useState<any>({ id: null });
  const [sureSelectRowKey, setSureSelectRowKey] = useState<any>({ id: null });

  const [editModalConfig, setEditModalCongig] = useState({
    visible: false,
    type: 'select',
    id: null,
    rowInfo: {},
  }); // 新增弹框
  const [importVisible, setImportVisible] = useState(false); // 导入弹窗
  const [importUrl, setImportUrl] = useState<any>(null); // 导入接口api

  useEffect(() => {
    if (!modalVisible) {
      form.resetFields();
      setSearchParams({
        page: 1,
        size: 20,
        sort: 'id,asc',
      });
    }
  }, [modalVisible]);

  const getTableData = useCallback(async () => {
    if (!requestApi) return;
    if (modalVisible || !isModalSearch) {
      setTableLoading(true);
      const res = await axios.get(requestApi, {
        headers: {
          Authorization: `Bearer ${session.get('authenticationToken')}`,
        },
        params: { ...searchParams, page: searchParams.page - 1 },
      });
      const { data, headers } = res;
      if (Array.isArray(data)) {
        setDataSource(
          data.map((item: any, index: number) => ({
            ...item,
            index: index + 1,
            id: item.id || index + 1 + searchParams.page * searchParams.size,
          })),
        );
        setTableTotal(headers['x-total-count']);
      }
      setTableLoading(false);
    }
  }, [requestApi, searchParams, modalVisible, isModalSearch]);

  useEffect(() => {
    getTableData();
  }, [getTableData]);

  useEffect(() => {
    if (value && sureSelectRowKey.id) {
      setCurrentValue(sureSelectRowKey[resField]);
      return;
    }
    if (value && selectRow.id) {
      onChange(selectRow[editResld]);
      setCurrentValue(selectRow[editResName]);
    }
  }, [value, selectRow, sureSelectRowKey]);

  useEffect(() => {
    if (!modalVisible) {
      setSeletRowKey({ id: null });
    }
  }, [modalVisible]);

  /**
   * 枚举和时间等格式化
   */
  const dataFormat = (item: any, text: any) => {
    if (item.enum) {
      return item.enum[text];
    } else if (item.type === 'datePicker') {
      return text ? moment(text).format('YYYY-MM-DD HH:mm:ss') : null;
    } else {
      return text;
    }
  };

  const columns = useMemo(
    () => [
      {
        title: '序号',
        dataIndex: 'index',
        key: 'index',
        width: 50,
        ellipsis: true,
      },
      ...columnConfig
        .filter((item: any) => item.type !== 'action' && !item.columnHide)
        .map((item: any) => ({
          ...item,
          dataIndex: item.key,
          sorter: true,
          sortDirections: ['descend', 'ascend'],
          ellipsis: true,
          render: (text: any) => dataFormat(item, text),
        })),
      ...columnConfig
        .filter((item: any) => item.type === 'action')
        .map((item: any) => ({
          title: item.title,
          key: item.key,
          fixed: 'right',
          width: 120,
          render: (_: any, record: any) => (
            <>
              {item.buttons.includes('select') && (
                <Button
                  type="link"
                  icon={<EyeOutlined />}
                  title="查看"
                  onClick={() =>
                    setEditModalCongig({
                      visible: true,
                      type: 'select',
                      id: item.selectKey ? record[item.selectKey] : record.id,
                      rowInfo: record,
                    })
                  }
                />
              )}
              {item.buttons.includes('updata') && (
                <Button
                  type="link"
                  icon={<EditOutlined />}
                  title="编辑"
                  onClick={() =>
                    setEditModalCongig({
                      visible: true,
                      type: 'updata',
                      id: item.selectKey ? record[item.selectKey] : record.id,
                      rowInfo: record,
                    })
                  }
                />
              )}
              {item.buttons.includes('delete') && (
                <Popconfirm
                  placement="topRight"
                  title={`你确定要删除${record.name || ''}吗?`}
                  onConfirm={async () => {
                    const res = await axios.delete(
                      `${requestApi}/${
                        item.deleteKey ? record[item.deleteKey] : record.id
                      }`,
                      {
                        headers: {
                          Authorization: `Bearer ${session.get(
                            'authenticationToken',
                          )}`,
                        },
                      },
                    );
                    const { status, statusText } = res;
                    if (status === 204 && statusText === 'No Content') {
                      message.success('删除成功');
                      getTableData();
                    }
                  }}
                  okText="是"
                  cancelText="否"
                >
                  <Button type="link" icon={<DeleteOutlined />} title="删除" />
                </Popconfirm>
              )}
            </>
          ),
        })),
    ],
    [],
  );

  /**
   * 打印
   */
  const touchPrint = (path: string, requireStr: string) => {
    let mark = true;
    requireStr.split(',').forEach((element) => {
      if (!mark) return;
      if (!form.getFieldsValue()[element]) {
        const unfilledItem: any = formOptions.filter(
          (item: any) => item.name === element,
        );
        if (unfilledItem.length === 1) {
          message.info(`请选择${unfilledItem[0].label}`);
          mark = false;
        }
      }
    });
    if (mark) {
      axios
        .get(path, {
          params: { ...form.getFieldsValue() },
          responseType: 'blob',
          headers: {
            Authorization: `Bearer ${session.get('authenticationToken')}`,
          },
        })
        .then((res: any) => {
          const { data } = res;
          if (data.message) {
            message.error(data.message);
          } else {
            const blob = new Blob([data], {
              type: 'application/pdf;chartset=UTF-8',
            });
            const fileURL = URL.createObjectURL(blob);
            window.open(fileURL);
          }
        });
    }
  };

  /**
   * 按钮事件
   * @param action 按钮事件
   */
  const handleClick = ({
    action,
    path = null,
    required = 'warehouseId.equals',
  }: any) => {
    switch (action) {
      case 'add':
        setEditModalCongig({
          visible: true,
          type: 'add',
          id: null,
          rowInfo: {},
        });
        break;
      case 'search':
        form.submit();
        break;
      case 'reset':
        form.resetFields();
        break;
      case 'export':
        axios
          .get(path, {
            params: { ...form.getFieldsValue() },
            responseType: 'blob',
            headers: {
              Authorization: `Bearer ${session.get('authenticationToken')}`,
            },
          })
          .then((res: any) => {
            console.log(res,'res');
            const { status, data } = res;
            // if (status === 200 && data) {
            //   message.success('导出成功');
            //   let fileName;
            //   if (res.headers['content-disposition']) {
            //     fileName = decodeURI(
            //       res.headers['content-disposition'].split('=')[1],
            //     );
            //   }
            //   const content = res.data; // 文件流
            //   const blob = new Blob([content]);
            //   if ('download' in document.createElement('a')) {
            //     // 非IE下载
            //     const link: any = document.createElement('a');
            //     link.download = fileName;
            //     link.style.display = 'none';
            //     link.href = URL.createObjectURL(blob);
            //     document.body.appendChild(link);
            //     link.click();
            //     URL.revokeObjectURL(link.href); // 释放URL 对象
            //     document.body.removeChild(link);
            //   } else {
            //     // IE10+下载
            //     navigator.msSaveBlob(blob);
            //   }
            // }
          });
        break;
      case 'import':
        setImportVisible(true);
        setImportUrl(path);
        break;
      case 'print':
        touchPrint(path, required);
        break;
      default:
        break;
    }
  };

  /**
   * 如果下拉选项没有option，是根据接口调用得
   */
  const getSelectOptions = ({ path, name }: any) => {
    if (!path) return;
    axios
      .get(path, {
        headers: {
          Authorization: `Bearer ${session.get('authenticationToken')}`,
        },
      })
      .then((res: any) => {
        const { status, data } = res;
        if (status === 200 && Array.isArray(data)) {
          const opt = data.map((item) => ({ key: item.id, name: item.name }));
          const news: any = cloneDeep(formOptions);
          news.forEach((item: any, index: number) => {
            if (item.name === name) {
              news[index] = { ...news[index], option: [...opt] };
            }
          });
          setFormOptions(news);
        }
      });
  };

  /**
   * 根据type判断表单项
   * @param params
   */
  const getFormChild = (params: any) => {
    const { type, option, path = null, component = null } = params;
    if (type === 'input') {
      return <Input />;
    } else if (['multipleSelect', 'select'].includes(type)) {
      if (!Array.isArray(option) && path) {
        getSelectOptions(params);
      }
      return (
        <Select mode={type === 'multipleSelect' ? 'multiple' : undefined}>
          {Array.isArray(option) &&
            option.map((item) => (
              <Select.Option key={item.key} value={item.key}>
                {item.name}
              </Select.Option>
            ))}
        </Select>
      );
    } else if (type === 'modal') {
      return component;
    } else {
      return null;
    }
  };

  /**
   * 获取按钮表单布局
   */
  const getFormLayout = () => {
    const nonBtns: any = [];
    const leftBtns: any = [];
    const rightBtns: any = [];
    const opt = [...formOptions];

    opt.forEach((item: any) => {
      const { type, name, label, action } = item;
      if (type === 'button') {
        if (['search', 'reset'].includes(action)) {
          rightBtns.push(
            <Button
              key={item.name}
              type="primary"
              onClick={() => handleClick(item)}
              style={{ marginLeft: 24 }}
            >
              {name}
            </Button>,
          );
        } else {
          leftBtns.push(
            <Button
              key={item.name}
              onClick={() => handleClick(item)}
              style={{ marginRight: 24 }}
            >
              {name}
            </Button>,
          );
        }
      } else {
        nonBtns.push(
          <Col span={isModalSearch ? 8 : 6} key={item.name}>
            <Form.Item
              labelCol={{ span: 6 }}
              name={name}
              label={label}
              rules={[{ required: false, message: '请输入' }]}
            >
              {getFormChild(item)}
            </Form.Item>
          </Col>,
        );
      }
    });
    return (
      <>
        {nonBtns}
        <Row gutter={[8, 4]} style={{ width: '100%', paddingLeft: 12 }}>
          <Col span={12} className={styles.leftBtnWrap}>
            {leftBtns}
          </Col>
          <Col span={12} className={styles.rightBtnWrap}>
            {rightBtns}
          </Col>
        </Row>
      </>
    );
  };

  /**
   * 过滤空字符串参数
   * @param values
   */
  const filterNullString = (values: any) => {
    const obj = { ...values };
    forIn(values, (val, key) => {
      obj[key] = val === '' ? undefined : val;
    });
    return obj;
  };

  /**
   * 过滤查询表单
   * @param values
   */
  const onFinish = (values: any) => {
    setSearchParams({
      ...searchParams,
      page: 1,
      ...filterNullString({ ...values }),
    });
  };

  const handleTableChange = (pagination: any, _: any, sorter: any) => {
    const { columnKey, order } = sorter;
    let sortSpellStr = 'id,asc';
    if (columnKey && order) {
      sortSpellStr = columnKey + ',' + sorterEnum[order];
    }
    setSearchParams({
      ...searchParams,
      page: pagination.current,
      size: pagination.pageSize,
      sort: sortSpellStr,
    });
  };

  /**
   * 封装该组件主体内容，不包含弹窗
   */
  const getContentHTML = () => {
    return (
      <>
        <Form
          form={form}
          className={styles.searchBar}
          name="advanced_search"
          onFinish={onFinish}
        >
          <Row gutter={[12, 4]} style={{ width: '100%' }}>
            {getFormLayout()}
          </Row>
        </Form>
        <Table
          onRow={(record) => {
            return {
              onClick() {
                setSeletRowKey(
                  record.id === seletRowKey.id ? { id: null } : record,
                );
              }, // 点击行
              onDoubleClick() {
                setModalVisible(false);
                setSureSelectRowKey(record);
                onChange(record[reqField]);
              }, // 双击
            };
          }}
          rowKey="id"
          style={{ margin: '0 12px' }}
          columns={columns}
          dataSource={dataSource}
          size="small"
          scroll={{
            x: scrollX || columns.length * 220,
            y: scrollY || isModalSearch ? 460 : 580,
          }}
          bordered
          loading={tableLoading}
          pagination={{
            pageSize: searchParams.size,
            current: searchParams.page,
            total: tableTotal,
            showTotal: (total) => `共${total}条`,
            showSizeChanger: true,
            showQuickJumper: true,
          }}
          rowClassName={(record: any) =>
            record.id === seletRowKey.id ? styles.tableRowLight : null
          }
          onChange={handleTableChange}
        />
      </>
    );
  };

  /**
   * 查看、创建、更新、数据项 表单提交事件
   * @param val
   */
  const onFinishCommit = async (val: any) => {
    if (editModalConfig.type === 'add') {
      const res = await axios.post(
        requestApi,
        { ...val },
        {
          headers: {
            Authorization: `Bearer ${session.get('authenticationToken')}`,
          },
        },
      );
      const { status, data } = res;
      if (status === 201 && data.id) {
        message.success('创建成功');
        setEditModalCongig({ visible: false, type: '', id: null, rowInfo: {} });
        getTableData();
      }
    } else if (editModalConfig.type === 'select') {
      setEditModalCongig({ visible: false, type: '', id: null, rowInfo: {} });
    } else if (editModalConfig.type === 'updata') {
      const res = await axios.put(
        requestApi,
        { ...val },
        {
          headers: {
            Authorization: `Bearer ${session.get('authenticationToken')}`,
          },
        },
      );
      const { status, data } = res;
      if (status === 200 && data.id) {
        message.success('更新成功');
        setEditModalCongig({ visible: false, type: '', id: null, rowInfo: {} });
        getTableData();
      }
    }
  };

  return (
    <>
      {isModalSearch && (
        <Search
          disabled={disabled}
          ref={inputRef}
          enterButton
          onSearch={() => setModalVisible(true)}
          value={currentValue}
          onChange={(e) => setCurrentValue(e.target.value)}
          onBlur={(e) => {
            if (value && sureSelectRowKey.id) {
              setCurrentValue(
                e.target.value ? sureSelectRowKey[resField] : undefined,
              );
              onChange(e.target.value ? sureSelectRowKey[reqField] : undefined);
            } else if (value && selectRow.id) {
              setCurrentValue(
                e.target.value ? selectRow[editResld] : undefined,
              );
              onChange(e.target.value ? selectRow[editResName] : undefined);
            } else {
              setCurrentValue(undefined);
            }
          }}
        />
      )}
      {isModalSearch && (
        <Modal
          destroyOnClose
          width={900}
          visible={modalVisible}
          maskClosable={false}
          onCancel={() => setModalVisible(false)}
          onOk={() => {
            setModalVisible(false);
            setSureSelectRowKey(seletRowKey);
            onChange(seletRowKey[reqField]);
          }}
        >
          {getContentHTML()}
        </Modal>
      )}
      {!isModalSearch && getContentHTML()}
      <EditItemModal
        editModalConfig={editModalConfig}
        columnConfig={columnConfig}
        onCancel={() =>
          setEditModalCongig({
            visible: false,
            type: 'select',
            id: null,
            rowInfo: {},
          })
        }
        onFinishCommit={onFinishCommit}
        requestApi={requestApi}
      />
      <ImportListModal
        importVisible={importVisible}
        onCancelModal={() => setImportVisible(false)}
        importUrl={importUrl}
        resetForm={() => {
          form.resetFields();
          setSearchParams({
            page: 1,
            size: searchParams.size,
            sort: searchParams.sort,
          });
        }}
      />
    </>
  );
}
