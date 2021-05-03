import React from 'react';
import {SearchModalBase} from "@/components";
import { userActivated } from "@/config/global-enum-config";
import WareHouseModal from "../../component/WareHouseModal";

const config = {
  requestApi: '/api/users',
  options: [
    {
      type: 'input',
      name: 'login',
      label: '登录账号',
    }, {
      type: 'input',
      name: 'userName',
      label: '姓名',
    }, {
      type: 'modal',
      name: 'warehouseId',
      label: '所属仓库',
      component: <WareHouseModal/>
    }, {
      type: 'select',
      name: 'authorities',
      label: '角色',
      path: '/api/users/authority/select',
    }, {
      type: 'select',
      name: 'status',
      label: '状态',
      option: [
        {key: true, name: '在岗'},
        {key: false, name: '离职'}
      ]
    }, {
      name: 'phone',
      type: 'input',
      label: '电话'
    }, {
      name: 'idCardNum',
      type: 'input',
      label: '身份证',
    }, {
      type: 'button',
      name: '新增',
      label: null,
      action: 'add',
    }, {
      type: 'button',
      name: '查询',
      label: null,
      action: 'search'
    }, {
      type: 'button',
      name: '重置',
      label: null,
      action: 'reset',
    },
  ]
}

const columnConfig = [
  {
    title: '用户ID',
    key: 'id',
    type: 'input',
    width: 60,
    columnHide: true,
    disabled: true,
  }, {
    title: '账号',
    key: 'login',
    type: 'input',
    width: 200,
    required: true,
  }, {
    title: '状态',
    key: 'activated',
    type: 'select',
    width: 60,
    enum: userActivated,
    required: true,
    option: [
      {key: true, name: '在岗'},
      {key: false, name: '离职'}
    ],
  }, {
    title: '姓名',
    key: 'userName',
    type: 'input',
    width: 200,
    required: true,
  }, {
    title: '电话',
    key: 'phone',
    type: 'input',
    required: true,
  }, {
    title: '身份证',
    key: 'idCardNum',
    type: 'input',
    required: true,
  }, {
    title: '邮箱',
    key: 'email',
    type: 'input',
  }, {
    title: '仓库',
    key: 'warehouseId',
    type: 'modal',
    disabled: false,
    required: true,
    component: <WareHouseModal editResld="warehouseId" editResName="warehouseName" />,
    columnHide: true,
  }, {
    title: '仓库',
    key: 'warehouseName',
    type: 'input',
    createShow: false,
  }, {
    title: '角色',
    key: 'authorities',
    type: 'multipleSelect',
    path: '/api/users/authority/select',
    columnHide: true
  }, {
    title: '角色名',
    key: 'authoritiesName',
    type: 'input',
    createShow: false,
    width: 150,
  }, {
    title: '创建者',
    key: 'createdBy',
    type: 'input',
    width: 100,
    createShow: false,
  }, {
    title: '创建时间',
    key: 'createdDate',
    type: 'datePicker',
    width: 180,
    createShow: false,
  }, {
    title: '最后修改者',
    key: 'lastModifiedBy',
    type: 'input',
    columnHide: true,
    createShow: false,
  }, {
    title: '最后修改时间',
    key: 'lastModifiedDate',
    type: 'input',
    columnHide: true,
    createShow: false,
  },
  {
    title: '操作',
    key: 'action',
    type: 'action',
    selectKey: 'login',
    deleteKey: 'login',
    buttons: ['select', 'updata', 'delete'],
  },
]

export const UserManagement = () => {
  return (
    <div>
      <SearchModalBase
        config={config}
        columnConfig={columnConfig}
        isModalSearch={false}
        scrollX= {true}
      />
    </div>
  );
};

export default UserManagement;
