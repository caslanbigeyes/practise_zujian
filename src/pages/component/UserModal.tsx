import React from 'react';
import { SearchModalBase } from '@/components';
import WareHouseModal from './WareHouseModal';

const config = {
  requestApi: '/api/userSelect',
  options: [
    {
      type: 'modal',
      name: 'warehouseId',
      label: '库区',
      component: <WareHouseModal />,
    },
    {
      type: 'input',
      name: 'login',
      label: '账号',
    },
    {
      type: 'input',
      name: 'userName',
      label: '姓名',
    },
    {
      type: 'input',
      name: 'phone',
      label: '电话',
    },
    {
      type: 'input',
      name: 'idCardNum',
      label: '身份证',
    },
    {
      type: 'button',
      name: '重置',
      label: null,
      action: 'reset',
    },
    {
      type: 'button',
      name: '查询',
      label: null,
      action: 'search',
    },
  ],
};

const columnConfig = [
  {
    title: 'ID',
    key: 'id',
    type: 'input',
    disabled: true,
  },
  {
    title: '账号',
    key: 'login',
    type: 'input',
    required: true,
  },
  {
    title: '姓名',
    key: 'userName',
    type: 'input',
    required: true,
  },
  {
    title: '电话',
    key: 'phone',
    type: 'input',
  },
  {
    title: '身份证',
    key: 'idCardNum',
    type: 'input',
  },
  {
    title: '库区名',
    key: 'warehouseName',
    type: 'input',
    createShow: false,
  },
];

export default function ({
  selectRow = { id: null },
  value = null,
  onChange: reOnChange = (id: any) => {},
  reqField = 'id',
  resField = 'name',
  editResld = 'id',
  editResName = 'name',
  disabled = false,
}) {

  return (
    <SearchModalBase
      selectRow={selectRow}
      config={config}
      columnConfig={columnConfig}
      value={value}
      reqField={reqField}
      resField={resField}
      editResld={editResld}
      editResName={editResName}
      onChange={(val: any) => {
        reOnChange(val);
      }}
      disabled={disabled}
    />
  );
}
