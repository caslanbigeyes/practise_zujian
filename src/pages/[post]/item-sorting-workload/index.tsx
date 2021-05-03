import React from 'react';
import { SearchModalBase } from '@/components';
import WareHouseModal from '../../component/WareHouseModal';
import ItemSortingBatchModal from '../../component/ItemSortingBatchModal';
import UserModal from '../../component/UserModal';

const config = {
  requestApi: '/api/item-sorting-workloads',
  options: [
    {
      type: 'modal',
      name: 'warehouseId',
      label: '库区',
      component: <WareHouseModal />,
    },
    {
      type: 'modal',
      name: 'userId',
      label: '分拣人',
      component: <UserModal reqField="id" resField="login" />,
    },
    {
      type: 'modal',
      name: 'batchNo',
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
      path: '/api/item-sorting-workloads/export',
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
    title: '用户id',
    key: 'userId',
    type: 'input',
    required: true,
    width: 150,
  },
  {
    title: '分拣人',
    key: 'userName',
    type: 'input',
    required: true,
    width: 200,
  },
  {
    title: '商品品项',
    key: 'barcode',
    type: 'input',
    required: true,
    width: 200,
  },
  {
    title: '团次',
    key: 'sortingName',
    type: 'input',
    required: true,
    width: 200,
  },
  {
    title: '总件数',
    key: 'sortNum',
    type: 'input',
    required: true,
    width: 200,
  },
  {
    title: '创建时间',
    key: 'gmtCreate',
    type: 'datePicker',
    required: true,
    width: 200,
  },
  {
    title: '修改时间',
    key: 'gmtModified',
    type: 'datePicker',
    required: true,
  },
];

export const ItemSortingWorkload = () => {
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

export default ItemSortingWorkload;
