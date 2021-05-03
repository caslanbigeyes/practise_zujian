import React from 'react';
import { history } from 'umi';
import { ConfigProvider, Menu, Dropdown } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import DownOutlined from '@ant-design/icons/DownOutlined';
import UserOutlined from '@ant-design/icons/UserOutlined'
import AppstoreOutlined from '@ant-design/icons/AppstoreOutlined';
import styles from './index.less';

const { SubMenu } = Menu;
const menus = [
  {
    key: '/system',
    text: '系统管理',
    children: [
      {
        key: '/system/warehouse',
        text: '仓库管理',
      },
      {
        key: '/system/user-management',
        text: '用户管理',
      },
      // {
      //   key: '/permission',
      //   text: '功能权限',
      // },
    ],
  },
  {
    key: '/sorting',
    text: '分拣管理',
    children: [
      {
        key: '/sorting/item-sorting-batch',
        text: '分拣批次导入',
      },
      {
        key: '/sorting/item-sorting',
        text: '商品分拣单 ',
      },
      // {
      //   key: '/item-sorting-record',
      //   text: '商品分拣记录',
      // },
      {
        key: '/sorting/item-sorting-polys',
        text: '商品统计',
      },
      {
        key: '/sorting/item-sorting-stat',
        text: '分拣位统计',
      },
      {
        key: '/sorting/item-sorting-workload',
        text: '工作量统计',
      },
    ],
  },
];

export default function (props: any) {
  const { location = {} } = props;
  const { pathname } = location;

  const pathnameArray = pathname
    .split('/')
    .filter((el: any) => el)
    .filter((_: never, i: number) => i < 2);
  const [selectedKey] = pathnameArray;

  /**
   * 菜单点击事件
   * @param {String} path 要跳转的地址
   */
  const handleMenuClick = ({ key }: any) => {
    history.push(key);
  };

  const dropdownMenu = (
    <Menu>
      <Menu.Item key="0">
        <a style={{ padding: '0 22px' }} onClick={() => history.push('/login')}>退出</a>
      </Menu.Item>
    </Menu>
  );

  if (['/login', '/home'].includes(pathname)) return props.children;

  return (
    <ConfigProvider locale={zhCN}>
    <div className={styles.layout}>
      <div className={styles.header}>
        <div className={styles.logo} onClick={() => history.push('/')}>
          <div className="animate__animated animate__heartBeat">Probe</div>
        </div>
        <div>
        <Dropdown className={styles.userAction} overlay={dropdownMenu} placement="bottomRight" trigger={['click']}>
          <a  onClick={e => e.preventDefault()}>
            <UserOutlined />账号<DownOutlined />
          </a>
        </Dropdown>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.menu}>
          {selectedKey && (
            <Menu
              mode="inline"
              theme="dark"
              defaultOpenKeys={[`/${selectedKey}`]}
              selectedKeys={[`/${selectedKey}`, `/${pathnameArray.join('/')}`]}
              onSelect={handleMenuClick}
            >
              {menus.map((item) => {
                const { key, text, children } = item;
                if (Array.isArray(children)) {
                  return (
                    <SubMenu key={key} title={text} icon={<AppstoreOutlined />}>
                      {children.map((child) => (
                        <Menu.Item key={child.key}>{child.text}</Menu.Item>
                      ))}
                    </SubMenu>
                  );
                }
              })}
            </Menu>
          )}
        </div>
        <div className={styles.content}>{props.children}</div>
      </div>
    </div>
    </ConfigProvider>
  );
}
