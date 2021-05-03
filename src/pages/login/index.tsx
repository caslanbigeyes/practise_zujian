import React from 'react';
import axios from 'axios';
import { history } from 'umi'
import { Form, Button, Input } from 'antd';
import UserOutlined from '@ant-design/icons/UserOutlined';
import LockOutlined from '@ant-design/icons/UserOutlined';
import { session } from '@/utils/storage';
import styles from './index.less'

const layout = {
  wrapperCol: { span: 24 },
};

export default function() {
  const [form] = Form.useForm();

  //  表单登录提交验证成功事件
  const onFinish = async (values: any) => {
    const { username, password, rememberMe = false } = values;
    const res = await axios.post('/api/authenticate', { username, password, rememberMe })
    const { data } = res;
    const { id_token } = data;
    if(id_token) {
      session.set('authenticationToken', id_token);
      history.push('/');
    }
  };
  // 表单提交验证失败事件
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className={styles.loginWrap}>
      <div className={styles.pageTop}>
        Probe
      </div>
      <div className={styles.pageMain}>
        <Form
          form={form}
          {...layout}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: '账号是必填项!' }]}
          >
            <Input prefix={<UserOutlined style={{ color: '#1890ff' }} />} />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: '密码是必填项!' }]}
          >
            <Input.Password prefix={<LockOutlined style={{ color: '#1890ff' }} />} />
          </Form.Item>

          {/* <Form.Item name="remember" valuePropName="checked">
            <Checkbox>记住账号</Checkbox>
          </Form.Item> */}

          <Form.Item noStyle>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              提交
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
};
