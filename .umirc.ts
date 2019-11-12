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
          name: '个人设置',
          path: '/accountsettings',
          component: './AccountSettings',
        },
        {
          name: '分析页',
          path: '/dashboardanalysis',
          component: './DashboardAnalysis',
        },
        {
          name: '监控页',
          path: '/dashboardmonitor',
          component: './DashboardMonitor',
        },
        {
          name: '工作台',
          path: '/dashboardworkplace',
          component: './DashboardWorkplace',
        },
        {
          name: '流程编辑器',
          path: '/editorflow',
          component: './EditorFlow',
        },
        {
          name: '拓扑编辑器',
          path: '/editorkoni',
          component: './EditorKoni',
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
