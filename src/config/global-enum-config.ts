// 商品分拣单状态值枚举类型
export const itemSortingStatus = {
  0: '未分拣',
  1: '分拣中',
  2: '分拣完成',
  3: '部分缺货',
  4: '全部缺货',
};

export const itemSortingStatusEnum = {
  NO: '未分拣',
  ING: '分拣中',
  SUCCESS: '分拣完成',
  PART: '部分缺货',
  ALL_NO: '全部缺货',
};

export const userActivated = {
  true: '在岗',
  false: '离职',
};

export const authoritiesEnum = {
  ROLE_ADMIN: '仓管',
  ROLE_USER: '分拣员',
};

export default {
  itemSortingStatus,
  itemSortingStatusEnum,
  userActivated,
  authoritiesEnum,
};
