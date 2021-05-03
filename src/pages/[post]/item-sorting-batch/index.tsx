import React from 'react';
import {SearchModalBase} from "@/components";
import WareHouseModal from '../../component/WareHouseModal';
import ItemSortingBatchModal from '../../component/ItemSortingBatchModal';

const config = {
  requestApi: '/api/item-sorting-batches',
  options: [
    {
      type: 'modal',
      name: 'warehouseId.equals',
      label: '库区',
      component: <WareHouseModal />
    },
    {
      type: 'modal',
      name: 'batchNo.contains',
      label: '批次号',
      component: <ItemSortingBatchModal reqField="batchNo" resField="batchNo" />
    },
    {
      type: 'input',
      name: 'fileName.contains',
      label: '名称',
    },
    {
      type: 'button',
      name: '导入',
      label: null,
      action: 'import',
      path: '/api/importItemSorting',
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
    },
  ]
}

const columnConfig = [
  {
    title: 'ID',
    key: 'id',
    type: 'input',
    disabled: true,
    width: 100
  },
  {
    title: '批次号',
    key: 'batchNo',
    type: 'input',
    required: true,
    width: 100
  },
  {
    title: '仓库名称',
    key: 'warehouseName',
    type: 'input',
    required: true,
    width: 200
  },
  {
    title: '文件名称',
    key: 'fileName',
    type: 'input',
    required: true,
    width: 200
  },
  {
    title: '实际行数',
    key: 'actualRow',
    type: 'input',
    required: true,
    width: 100
  },
  {
    title: '计划行数',
    key: 'planRow',
    type: 'input',
    required: true,
    width: 100
  },
  {
    title: '总个数',
    key: 'totalQty',
    type: 'input',
    required: true,
    width: 100
  },
  {
    title: '文件地址',
    key: 'fileUrl',
    type: 'input',
    required: true,
    width: 200
  },{
    title: '创建人名称',
    key: 'createUserName',
    type: 'input',
    required: true,
    width: 150
  },{
    title: '创建时间',
    key: 'createDate',
    type: 'datePicker',
    required: true,
  },
  {
    title: '操作',
    key: 'action',
    type: 'action',
    selectKey: 'id',
    deleteKey: 'id',
    buttons: ['select'],
  }
]

export const ItemSortingBatch = () => {

  return (
    <div>
      <SearchModalBase
        config={config}
        columnConfig={columnConfig}
        isModalSearch={false}
        scrollX={1500}
      />
    </div>
  );
};

export default ItemSortingBatch;
