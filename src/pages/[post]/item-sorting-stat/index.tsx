import React from 'react';
import { SearchModalBase } from '@/components';
import WareHouseModal from '../../component/WareHouseModal';
import ItemSortingBatchModal from '../../component/ItemSortingBatchModal';
import { itemSortingStatusEnum } from '@/config/global-enum-config';

const config = {
  requestApi: '/api/item-sorting-stats',
  options: [
    {
      type: 'modal',
      name: 'warehouseId.equals',
      label: '库区',
      component: <WareHouseModal />,
    },
    {
      type: 'multipleSelect',
      name: 'status.in',
      label: '状态',
      option: [
        { key: 'NO', name: '未分拣' },
        { key: 'ING', name: '分拣中' },
        { key: 'SUCCESS', name: '完成' },
        { key: 'PART', name: '部分缺货' },
        { key: 'ALL_NO', name: '全部缺货' },
      ],
    },
    {
      type: 'input',
      name: 'sortingName.equals',
      label: '分拣位',
    },
    {
      type: 'input',
      name: 'sowingName.contains',
      label: '播种位',
    },
    {
      type: 'input',
      name: 'line.equals',
      label: '线路',
    },
    {
      type: 'modal',
      name: 'itemSortingBatchId.contains',
      label: '批次号',
      component: <ItemSortingBatchModal reqField="id" resField="id" />,
    },
    {
      type: 'button',
      name: '导出',
      label: null,
      action: 'export',
      path: '/api/item-sorting-stats/export',
    },
    {
      type: 'button',
      name: '打印取货单',
      label: null,
      action: 'print',
      path: '/api/getPickUpListPrint',
      required: 'warehouseId.equals',
    },
    {
      type: 'button',
      name: '打印送货单',
      label: null,
      action: 'print',
      path: '/api/getDeliverySlip',
      required: 'warehouseId.equals',
    },
    {
      type: 'button',
      name: '查询',
      label: null,
      action: 'search',
    },
    {
      type: 'button',
      name: '重置',
      label: null,
      action: 'reset',
    },
  ],
};

const columnConfig = [
  {
    title: '分拣位',
    key: 'sortingName',
    type: 'input',
    width: '120',
  },
  {
    title: '播种位',
    key: 'sowingName',
    type: 'input',
  },
  {
    title: '线路',
    key: 'line',
    type: 'input',
  },
  {
    title: '状态',
    key: 'status',
    type: 'input',
    enum: itemSortingStatusEnum,
  },
  {
    title: '申请数量',
    key: 'applyQty',
    type: 'input',
    width: '120',
  },
  {
    title: '实际数量',
    key: 'actualQty',
    type: 'input',
    width: '120',
  },
  {
    title: '批次Id',
    key: 'itemSortingBatchId',
    type: 'input',
    width: '120',
  },
  {
    title: '仓库',
    key: 'warehouseName',
    type: 'input',
  },
  {
    title: '操作',
    key: 'action',
    type: 'action',
    selectKey: 'id',
    deleteKey: 'id',
    buttons: ['select'],
  },
];

export const ItemSortingStat = () => {
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

export default ItemSortingStat;
