import { defineConfig } from 'umi';

export default defineConfig({
  title: 'FORM-TABLE',
  nodeModulesTransform: {
    type: 'none',
  },
  
  proxy: {
    '/api': {
      target: 'http://10.0.25.75:8080/api',
      pathRewrite: { '^/api': '' },
    },
  },
});
