import React, { useEffect, useState } from 'react';
import { Form, Modal, Input, Select, DatePicker } from 'antd';
import axios from 'axios';
import moment from 'moment';
import { session } from '@/utils/storage';
import cloneDeep from 'lodash/cloneDeep';

const titleEnum: any = {
  select: '查看',
  update: '更新',
  add: '新增',
};

export default function ({
  editModalConfig = { visible: false, type: 'select', id: null, rowInfo: {} },
  columnConfig = [],
  onCancel = () => {},
  onFinishCommit = (val: any) => {},
  requestApi = null,
}) {
  const [form] = Form.useForm();
  const [formOptions, setFormOptions] = useState(cloneDeep(columnConfig)); // 筛选项配置项

  useEffect(() => {
    if (editModalConfig.visible && editModalConfig.id) {
      axios.get(`${requestApi}/${editModalConfig.id}`, {
        headers: { Authorization: `Bearer ${session.get('authenticationToken')}` }
      }).then(res => {
        const { status, data } = res;
        if (status === 200 && data.id) {
          formOptions.forEach((item: any) => {
            if (item.type === 'datePicker') {
              form.setFieldsValue({
                [item.key]: data[item.key] ? moment(data[item.key]) : null,
              });
            } else {
              form.setFieldsValue({
                [item.key]: data[item.key],
              });
            }
          });
        }
      });
    } else {
      form.resetFields();
    }
  }, [editModalConfig]);

  /**
   * 获取单选多选下拉选项
   */
  const getSelectOption = (params: any) => {
    const { option, path, key, type } = params;

    const getSelectOptionByApi = () => {
      if (!path) return;
      axios.get(path, { headers: { Authorization: `Bearer ${session.get('authenticationToken')}` } }).then(res => {
        const { status, data } = res;
        if (status === 200 && Array.isArray(data)) {
          const opt = data.map(item => ({ key: item.id, name: item.name }));
          const news: any = cloneDeep(formOptions);
          news.forEach((item: any, index: number) => {
            if (item.key === key) {
              news[index] = { ...news[index], option: [...opt] };
            }
          });
          setFormOptions(news);
        }
      });
    };

    if (!Array.isArray(option) && path) {
      getSelectOptionByApi();
    }
    return (
      <Select mode={type === 'multipleSelect' ? 'multiple' : undefined}>
        {Array.isArray(option) &&
          option.map(item => (
            <Select.Option key={item.key} value={item.key}>
              {item.name}
            </Select.Option>
          ))}
      </Select>
    );
  };

  /**
   * 获取新增编辑查看输入项
   */
  const getDetailHTML = () => {
    const listHtml: any = [];
    formOptions.forEach(item => {
      const {
        key,
        title = null,
        type = null,
        option = [],
        path = null,
        required,
        createShow = true,
        component,
        disabled,
        phoneCheck = false,
        idCardCheck = false,
      }: any = item;
      const rules = [];
      if(phoneCheck || title === '电话') {
        rules.push({ pattern: /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/, message: '请输入正确的手机号!' })
      }
      if(idCardCheck || title === '身份证') {
        rules.push({ pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, message: '请输入正确的身份证号!' })
      }
      
      if(component && component.props) {
        component.props.selectRow = { ...editModalConfig.rowInfo };
        component.props.disabled = disabled;
      }

      if ((type === 'input' && key !== 'id' && createShow) || (key === 'id' && editModalConfig.type !== 'add')) {
        listHtml.push(
          <Form.Item label={title} name={key} key={key} rules={[{ required: required || false, message: `请输入${title}` }, ...rules]}>
            <Input disabled={key === 'id' || disabled} />
          </Form.Item>
        );
      } else if (type === 'modal' && createShow) {
        listHtml.push(
          <Form.Item label={title} name={key} key={key} rules={[{ required: required || false, message: `请输入${title}` }, ...rules]}>
            {component}
          </Form.Item>
        );
      } else if (['multipleSelect', 'select'].includes(type) && createShow) {
        listHtml.push(
          <Form.Item label={title} name={key} key={key} rules={[{ required: required || false, message: `请选择${title}` }, ...rules]}>
            {getSelectOption(item)}
          </Form.Item>
        );
      } else if (type === 'datePicker') {
        listHtml.push(
          <Form.Item label={title} name={key} key={key} rules={[{ required: required || false, message: `请选择${title}` }, ...rules]}>
            <DatePicker showTime />
          </Form.Item>
        );
      }
    });
    return listHtml;
  };

  return (
    <Modal
      destroyOnClose
      title={titleEnum[editModalConfig.type]}
      width={640}
      visible={editModalConfig.visible}
      onCancel={onCancel}
      onOk={() => {
        if (editModalConfig.type === 'select') {
          onCancel();
        }
        form.submit();
      }}
    >
      {formOptions.length > 0 && (
        <Form form={form} name="edit_detail" onFinish={onFinishCommit} labelCol={{ span: 4 }} wrapperCol={{ span: 18 }}>
          {getDetailHTML()}
        </Form>
      )}
      {editModalConfig.type === 'select' && (
        <div style={{ position: 'absolute', width: '100%', height: 'calc(100% - 54px)', top: 0, left: 0 }} />
      )}
    </Modal>
  );
}
