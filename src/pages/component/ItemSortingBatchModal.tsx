import React, { useState } from 'react';
import { SearchModalBase } from '../../components';
import WareHouseModal from './WareHouseModal';

const config = {
  requestApi: '/api/item-sorting-batches',
  options: [
    {
      type: 'modal',
      name: 'warehouseId.equals',
      label: '库区',
      component: <WareHouseModal />,
    },
    {
      type: 'input',
      name: 'name.contains',
      label: '名称',
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
    title: '批次号',
    key: 'batchNo',
    type: 'input',
    required: true,
  },
  {
    title: '仓库名',
    key: 'warehouseName',
    type: 'input',
    required: true,
  },
  {
    title: '文件名称',
    key: 'fileName',
    type: 'input',
    required: true,
  },
  {
    title: '创建人名称',
    key: 'createUserName',
    type: 'input',
  },
  {
    title: '创建时间',
    key: 'createDate',
    type: 'datePicker',
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

