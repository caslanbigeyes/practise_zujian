import React from 'react';
import { SearchModalBase } from '@/components';
import WareHouseModal from '../../component/WareHouseModal';
import ItemSortingBatchModal from '../../component/ItemSortingBatchModal';
import UserModal from '../../component/UserModal';
import { itemSortingStatus } from '@/config/global-enum-config';

const config = {
  requestApi: '/api/item-sorting-polys',
  options: [
    {
      type: 'modal',
      name: 'wareHouseId.equals',
      label: '库区',
      component: <WareHouseModal />,
    },
    {
      type: 'multipleSelect',
      name: 'status.in',
      label: '状态',
      option: [
        { key: 0, name: '未分拣' },
        { key: 1, name: '分拣中' },
        { key: 2, name: '完成' },
        { key: 3, name: '部分缺货' },
        { key: 4, name: '全部缺货' },
      ],
    },
    {
      type: 'input',
      name: 'itemName.contains',
      label: '商品名称',
    },
    {
      type: 'input',
      name: 'barcode.contains',
      label: '商品条码',
    },
    {
      type: 'input',
      name: 'uom.contains',
      label: '单位',
    },
    {
      type: 'modal',
      name: 'userId.equals',
      label: '分拣人',
      component: <UserModal reqField="id" resField="login" />,
    },
    {
      type: 'modal',
      name: 'batchNo.equals',
      label: '批次号',
      component: (
        <ItemSortingBatchModal reqField="batchNo" resField="batchNo" />
      ),
    },
    {
      type: 'button',
      name: '导出',
      label: null,
      action: 'export',
      path: '/api/createItemSortingStat/export',
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
    width: 100,
  },
  {
    title: '条形码',
    key: 'barcode',
    type: 'input',
    required: true,
  },
  {
    title: '商品名称',
    key: 'itemName',
    type: 'input',
    required: true,
  },
  {
    title: '单位',
    key: 'uom',
    type: 'input',
    required: true,
    width: 100,
  },
  {
    title: '申请数量',
    key: 'applyQty',
    type: 'input',
    required: true,
    width: 100,
  },
  {
    title: '实际数量',
    key: 'actualQty',
    type: 'input',
    required: true,
    width: 100,
  },
  {
    title: '状态',
    key: 'status',
    type: 'input',
    enum: itemSortingStatus,
  },
  {
    title: '分拣人',
    key: 'userName',
    type: 'input',
    required: true,
    width: 150,
  },
  {
    title: '仓库名称',
    key: 'warehouseName',
    type: 'input',
    required: true,
    width: 150,
  },
  {
    title: '创建时间',
    key: 'gmtCreate',
    type: 'datePicker',
    required: true,
  },
  {
    title: '修改时间',
    key: 'gmtModified',
    type: 'datePicker',
    required: true,
  },
  {
    title: '操作',
    key: 'action',
    type: 'action',
    selectKey: 'id',
    deleteKey: 'id',
    buttons: ['select', 'updata'],
  },
];

export const ItemSortingPolys = () => {
  return (
    <div>
      <SearchModalBase
        config={config}
        columnConfig={columnConfig}
        isModalSearch={false}
        scrollX={true}
      />
    </div>
  );
};

export default ItemSortingPolys;
