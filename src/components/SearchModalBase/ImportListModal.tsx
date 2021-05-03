import React, { useEffect, useState, useCallback } from 'react';
import { Modal, Select, Form, Upload, Button, message } from 'antd';
import UploadOutlined from '@ant-design/icons/UploadOutlined';
import axios from 'axios';
import { session } from '@/utils/storage';
import styles from './index.less';

export default function ({ importVisible = false, onCancelModal = () => {}, resetForm = () => {}, importUrl = '' }) {
  const [form] = Form.useForm();
  const [allWareHouses, setAllWareHouses] = useState<any>([]);
  const [fileList, setFileList] = useState<any>([]);
  const [importLoading, setImportLoading] = useState(false);

  useEffect(() => {
    if(!importVisible) {
      form.resetFields();
      setFileList([]);
    }
  }, [importVisible])

  const getWareHousesList = useCallback(async () => {
    const res = await axios.get('/api/warehouses/all', {
      headers: { Authorization: `Bearer ${session.get('authenticationToken')}` }
    });
    const { status, data } = res;
    if (status === 200 && Array.isArray(data)) {
      setAllWareHouses(data);
    }
  }, []);

  useEffect(() => {
    if(!importVisible) return;
    getWareHousesList();
  }, [importVisible]);

  const onFinish = async (values: any) => {
    setImportLoading(true);
    const formData = new FormData();
    (fileList || []).forEach((file: any) => {
      formData.append('file', file);
      formData.append('warehouseId', values.wareHouseId);
    });

    try {
      const res = await axios.post(importUrl, formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${session.get('authenticationToken')}`
        },
      });
      const { status, data } = res;
      setImportLoading(false)
      if(status === 200) {
        message.success('导入成功');
        onCancelModal();
        resetForm();
      } 
    } catch (error) {
      if(String(error).includes('Request failed with status code 400')) {
        setImportLoading(false);
      }
    }
    
    
  };

  const uploadProps = {
    onRemove() {
      setFileList([]);
    },
    beforeUpload(file: any) {
      setFileList([file]);
      return false;
    },
    fileList,
  };

  return (
    <Modal
      destroyOnClose
      title="导入"
      width={620}
      visible={importVisible}
      maskClosable={false}
      onCancel={onCancelModal}
      onOk={() => form.submit()}
      okButtonProps={{ loading: importLoading }}
    >
      <div className={styles.importModalContent}>
        <Form form={form} layout="inline" name="list_import" onFinish={onFinish}>
          <Form.Item name="wareHouseId" label="库区" rules={[{ required: true, message: '请选择库区' }]}>
            <Select style={{ width: 180 }}>
              {allWareHouses.map((item: any) => (
                <Select.Option key={item.id} value={item.id}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="file"
            label="excel"
            // noStyle
            rules={[{
              async validator(_, file) {
                if (!file || file.length === 0) {
                  return Promise.reject(new Error('请选择文件'));
                }
              },
            }]}
          >
            <Upload {...uploadProps}>
              <Button>
                <UploadOutlined /> 点击上传
              </Button>
            </Upload>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
}
