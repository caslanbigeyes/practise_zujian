
const prefix = '-_-'

export const local = {
  get(key: any) {
    const strValue: any = localStorage.getItem(prefix + key);
    return JSON.parse(strValue);
  },
  set(key: any, jsonValue: any) {
    const strValue = JSON.stringify(jsonValue);
    localStorage.setItem(prefix + key, strValue);
  },
  remove(key: any) {
    localStorage.removeItem(prefix + key);
  },
  clear() {
    localStorage.clear();
  },
};

export const session = {
  get(key: any) {
    const strValue: any = sessionStorage.getItem(prefix + key);
    let value = null
    try {
      value = JSON.parse(strValue);
    } catch (error) {
      value = strValue
    }
    return value;
  },
  set(key: any, jsonValue: any) {
    const strValue = JSON.stringify(jsonValue);
    sessionStorage.setItem(prefix + key, strValue);
  },
  remove(key: any) {
    sessionStorage.removeItem(prefix + key);
  },
  clear() {
    sessionStorage.clear();
  },
};
