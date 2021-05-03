import React from 'react';
import {SearchModalBase } from '@/components';
import { itemSortingStatus } from '@/config/global-enum-config'
import WareHouseModal from '../../component/WareHouseModal';
import ItemSortingBatchModal from "../../component/ItemSortingBatchModal";

const config = {
  requestApi: '/api/item-sortings',
  options: [
    {
      type: 'modal',
      name: 'warehouseId.equals',
      label: '仓库',
      component: <WareHouseModal />
    },
    {
      type: 'input',
      name: 'itemName.contains',
      label: '商品名称',
    },
    {
      type: 'input',
      name: 'barcode.contains',
      label: '条形码',
    },
    {
      type: 'input',
      name: 'sowingName.equals',
      label: '播种位',
    },
    {
      type: 'input',
      name: 'sortingName.equals',
      label: '分拣位',
    },
    {
      type: 'modal',
      name: 'itemSortingBatchId.equals',
      label: '批次号',
      component: <ItemSortingBatchModal reqField="id" resField="batchNo" />
    },
    {
      type: 'select',
      name: 'status.equals',
      label: '分拣状态',
      option: [
        {key: 0, name: '未分拣'},
        {key: 1, name: '分拣中'},
        {key: 2, name: '已分拣'},
        {key: 3, name: '部分缺货'},
        {key: 4, name: '全部缺货'}
      ]
    },
    {
      type: 'button',
      name: '导出',
      label: null,
      action: 'export',
      path: '/api/exportItemSorting',
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
      action: 'search'
    }
  ]
}

const columnConfig = [
  {
    title: '批次号',
    key: 'itemSortingBatchBatchNo',
    type: 'input',
    disabled: true,
    width: 100
  },
  {
    title: '商品名称',
    key: 'itemName',
    type: 'input',
    required: true,
    width: 200
  },
  {
    title: '商品条码',
    key: 'barcode',
    type: 'input',
    required: true,
  },
  {
    title: '单位',
    key: 'uom',
    type: 'input',
    required: true,
    width: 100
  },
  {
    title: '申请数量',
    key: 'applyQty',
    type: 'input',
    width: 100
  }, {
    title: '实际数量',
    key: 'actualQty',
    type: 'input',
    width: 100
  }, {
    title: '状态',
    key: 'status',
    type: 'input',
    enum: itemSortingStatus,
    width: 100
  }, {
    title: '分拣位',
    key: 'sortingName',
    type: 'input',
    width: 100
  }, {
    title: '播种位',
    key: 'sowingName',
    type: 'input',
    width: 100
  }, {
    title: '线路',
    key: 'line',
    type: 'input',
    width: 100
  }, {
    title: '仓库',
    key: 'warehouseName',
    type: 'input',
    width: 200
  }, {
    title: '操作',
    key: 'action',
    type: 'action',
    selectKey: 'id',
    deleteKey: 'id',
    buttons: ['select', 'updata', 'delete'],
  }
]

export const ItemSorting = () => {

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

export default ItemSorting;
