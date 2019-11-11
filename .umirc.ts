import { IConfig } from 'umi-types'; // ref: https://umijs.org/config/

const config: IConfig = {
  treeShaking: true,
  routes: [
    {
      path: '/',
      component: '../layouts/index',
      routes: [
        {
          name: '个人中心',
          path: '/accountcenter',
          component: './accountcenter',
        },
        {
          path: '/',
          component: '../pages/index',
        },
      ],
    },
  ],
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: {
          immer: true,
        },
        dynamicImport: false,
        title: 'jiajia',
        dll: false,
        routes: {
          exclude: [/components\//],
        },
        locale: true,
      },
    ],
  ],
  mock: {
    exclude: ['abc', 'add'],
  },
};
export default config;

