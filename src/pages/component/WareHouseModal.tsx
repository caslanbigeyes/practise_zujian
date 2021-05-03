import React from 'react';
import { SearchModalBase } from '@/components';

const config = {
  requestApi: '/api/warehouses',
  options: [
    {
      type: 'input',
      name: 'warehouseNo.contains',
      label: '仓库编号',
    },
    {
      type: 'input',
      name: 'name.contains',
      label: '名称',
    },
    // {
    //   type: 'select',
    //   name: 'status',
    //   label: '状态',
    //   option: [
    //     { key: 1, name: '正常' },
    //     { key: 2, name: '建设中' },
    //     { key: 3, name: '未启用' }
    //   ]
    // },
    // {
    //   type: 'select',
    //   name: 'expired',
    //   label: '是否过期',
    //   option: [
    //     { key: 1, name: '是' },
    //     { key: 2, name: '否' }
    //   ]
    // },
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
    title: '仓库编号',
    key: 'warehouseNo',
    type: 'input',
    required: true,
  },
  {
    title: '仓库名',
    key: 'name',
    type: 'input',
    required: true,
  },
  {
    title: '备注',
    key: 'remark',
    type: 'input',
    required: true,
  },
  {
    title: '仓库管理员',
    key: 'warehouseAdminLogin',
    type: 'input',
  },
  {
    title: '创建人',
    key: 'createByLogin',
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
