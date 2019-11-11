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
          component: './AccountCenter',
        },
        {
          name: '分析页',
          path: '/dashboardanalysis',
          component: './DashboardAnalysis',
        },
        {
          name: '个人中心',
          path: '/usercenter',
          component: './UserCenter',
        },
        {
          name: '个人设置',
          path: '/accountsettings',
          component: './AccountSettings',
        },
        {
          name: '流程编辑器',
          path: '/editorflow',
          component: './EditorFlow',
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
          name: '拓扑编辑器',
          path: '/editorkoni',
          component: './EditorKoni',
        },
        {
          name: '脑图编辑器',
          path: '/editormind',
          component: './EditorMind',
        },
        {
          name: '403',
          path: '/exception403',
          component: './Exception403',
        },
        {
          name: '404',
          path: '/exception404',
          component: './Exception404',
        },
        {
          name: '500',
          path: '/exception500',
          component: './Exception500',
        },
        {
          name: '高级表单',
          path: '/formadvancedform',
          component: './FormAdvancedForm',
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
        dva: true,
        dynamicImport: {
          webpackChunkName: true,
        },
        title: 'jiajia',
        dll: true,
        locale: {
          enable: true,
          default: 'zh-CN',
          baseNavigator: true,
        },
        routes: {
          exclude: [
            /models\//,
            /services\//,
            /model\.(t|j)sx?$/,
            /service\.(t|j)sx?$/,
            /components\//,
          ],
        },
      },
    ],
  ],
};
export default config;
