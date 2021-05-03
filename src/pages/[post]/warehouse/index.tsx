import React from 'react';
import { SearchModalBase } from '@/components';
import UserModal from '../../component/UserModal' 

/**
 * 配置表单项.
 * type: 表单子项类型
 *     1.input -----  输入框
 *     2.select -----  下拉选择
 *          <1>.option: 配置下拉选项
 *          <2>.path: 接口api，通过接口获取下拉选项
 *          注意: 每项都有key和name，接口返回需按规范返回
 *     3.modal ---- 模态框查询
 *     4.button -----  按钮
 *          <1>.name: 按钮名称
 *          <2>.action: 按钮行为 >> >> 目前支持add(添加)、import(导入)、export(导出)、reset(重置)、search(查询)
 *          <3>.path: 导入导出等自定义按钮接口地址
 * name: 表单子项字段
 * label: 表单子项标签
 */
const config = {
  requestApi: '/api/warehouses',

  options: [
    {
      type: 'input',
      name: 'warehouseNo.contains',
      label: '车型',
    },
    {
      type: 'input',
      name: 'name.contains',
      label: '车牌号',
    },
    {
      type: 'input',
      name: 'remark.contains',
      label: '车架号',
    },
    {
      type: 'select',
      name: 'remark.contains',
      label: '租赁状态',
    },
    {
      type: 'select',
      name: 'remark.contains',
      label: '运营状态',
    },
    {
      type: 'select',
      name: 'remark.contains',
      label: '关联门店',
    },
    {
      type: 'select',
      name: 'remark.contains',
      label: '运营主体',
    },
    {
      type: 'date',
      name: 'remark.contains',
      label: '更新时间',
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
    {
      type: 'button',
      name: '新增',
      label: null,
      action: 'add',
    },
    {
      type: 'button',
      name: '导入',
      label: null,
      action: 'add',
    },
    {
      type: 'button',
      name: '导出',
      label: null,
      action: 'add',
    },
    {
      type: 'button',
      name: '下载导入数据模版',
      label: null,
      action: 'add',
    },
  ]
}

/**
 * 表格配置项。创建页面也从这个配置里读取。
 * title: 表头名称
 * key: 表格列对应字段
 * type: 创建时的字段输入类型
 *     1.input -----  输入框
 *     2.select -----  下拉选择框
 *     3.datapicker ----  日期选择框
 * disabled: 是否可点击(查看时默认所有不可点击，编辑时默认可点击) true ---- 不可点击  false ---- 可点击
 * required: 是否必填项目
 * createShow: 创建时是否展示(默认展示)
 */
const columnConfig = [
  {
    title: '运营主体',
    key: 'id',
    type: 'input',
    width: 60,
    disabled: true,
  },
  {
    title: '关联门店',
    key: 'warehouseNo',
    type: 'input',
    required: true,
  },
  {
    title: '车架号',
    key: 'name',
    type: 'input',
    required: true,
  },
  {
    title: '车牌号',
    key: 'remark',
    type: 'input',
    required: true,
  },
  {
    title: '车型',
    key: 'warehouseAdminLogin', // 张三、李四  warehouseAdminId
    isCreateShow: false,
  },
  {
    title: '颜色',
    key: 'warehouseAdminId', // 张三、李四  warehouseAdminId
    type: 'modal',
    component: <UserModal reqField="id" resField="userName" editResName="warehouseAdminLogin" />,
    columnHide: true,
  },
  {
    title: '租赁状态',
    key: 'createById',
    type: 'modal',
    component: <UserModal reqField="id" resField="userName" editResName="warehouseAdminLogin" />,
    columnHide: true,
    disabled: true,
  },
  {
    title: '运营状态',
    key: 'createByLogin',
    type: 'input',
    createShow: false,
    disabled: true
  },
  {
    title: '更新时间',
    key: 'createByLogin',
    type: 'input',
    createShow: false,
    disabled: true
  },

  {
    title: '操作',
    key: 'action',
    type: 'action',
    selectKey: 'id',
    deleteKey: 'id',
    buttons: ['select', 'updata', 'delete'],
  }
]


export const Warehouse = () => {

  return (
    <div>
      <SearchModalBase
        config={config}
        columnConfig={columnConfig}
        isModalSearch={false}
      />
    </div>
  );
};

export default Warehouse;
