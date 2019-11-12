#### 安装umi
```
npm install -g umi
```
>推荐使用 yarn 代替 npm 来安装 umi ， yarn 会针对部分场景做一些缓存以节省时间，你可以输入以下命令来全局安装 yarn，使用yarn后项目中尽量避免再使用npm，不然可能会发生意想不到的错误。
```
npm install -g yarn

# 安装完成后，使用命令查看是否安装成功
yarn -v

# 使用yarn安装umi
yarn global add umi

# 安装完成后，使用命令查看是否安装成功
umi -v
```
#### umi快速搭建项目
创建项目文件后使用终端工具打开文件

推荐使用 yarn create 命令，能确保每次使用最新的脚手架。
```
yarn create umi / npm create umi
```
>如果提示 create-umi 命令不存在，你需要执行 yarn global bin，然后把 global bin 的路径添加到环境变量 PATH 中。

##### 选择 project,选择app项目回车键确认
```
? Select the boilerplate type (Use arrow keys)
  ant-design-pro  - Create project with an layout-only ant-design-pro boilerplate, use together with umi block.
❯ app             - Create project with a simple boilerplate, support typescript.
  block           - Create a umi block.
  library         - Create a library with umi.
  plugin          - Create a umi plugin.
```
##### 选择是否使用 TypeScript,推荐使用TypeScript，输入y后回车结束
```
? Do you want to use typescript? (y/N)
```
##### 选择你需要的功能
```
? What functionality do you want to enable? (Press <space> to select, <a> to toggle all, <i> to invert selection)
❯◯ antd
 ◯ dva
 ◯ code splitting
 ◯ dll
 ```
##### 项目创建完成
```
启动项目
yarn start / npm run start
```
### 环境配置
在.env文件中可更改环境配置，一般不需要更改，常见更改例如
```
# 更改服务启动端口号
PORT=8001

# 关闭自动打开浏览器，默认为打开
BROWSER=none
```

### config配置
编译时的配置文件，.umirc.(js|ts) 和 config/config.(js|ts)，二者选一，不可共存
推荐在主文件夹下创建config文件，使用config.js进行项目配置（删除自动搭建项目时创建的.umirc.(js|ts)）

config.local.js和config.production.js可在此配置开发环境和线上环境不同的配置，在进行打包时需修改package.json中脚本代码
```
# 下载cross-env开启代码分割功能
yarn add -D cross-env / npm install --save-dev cross-env 

# package.json中 "scripts"修改
"build": "cross-env UMI_ENV=production umi build"
```
### typings.d.ts配置(使用typescript) (重要)
根据实际情况进行后缀添加，否则ts会报导入错误
```
declare module "*.png";
declare module "*.jpg";
declare module '*.less';
```
### tslint.yml配置(使用typescript) (重要)
修改tslint规则，可根据个人使用情况修改，详细配置可见tslint-react相关约定规则
```
# 推荐修改
defaultSeverity: error
extends:
  - tslint-react
  - tslint-eslint-rules
rules:
  eofline: true
  no-console: true
  no-construct: true
  no-debugger: true
  no-reference: true
  no-trailing-whitespace: false
  jsx-no-multiline-js: false
  
  #为true报错 “Multiline JSX elements must be wrapped in parentheses”
  jsx-wrap-multiline: false 
  
  jsx-alignment: false
  jsx-no-lambda: false
 ```
### (js|ts)config.json开启ES7装饰器功能
"experimentalDecorators": true
## 文件详解
```js
- mock文件   //存放mock.js，默认开启mock功能，可在.env文件中关闭： MOCK=none
- src      //所有与项目相关代码存放在src文件之中
  -- assets  //存放静态资源，例如图片文件、字体文件等
  -- components  //存放全局通用组件
  -- layouts  //全局布局，如果该文件夹下有index.(js|tsx)会在所有路由外面嵌套一层路由
  -- models   //全局models,如果有一个以上的页面会使用相同namespace空间内的代码，请将models文件放在此处，不然两个页面之间做交互时，namespace中的代码会产生影响
  -- styles //全局models,如果有一个以上的页面会使用相同namespace空间内的代码，请将models文件放在此处，不然两个页面之间做交互时，namespace中的代码会产生影响
  -- services  //存放全局通用请求
  -- utils //存放通用方法
  -- pages/...  //项目页面文件，在不同文件中创建的components、models、services文件最好只在该页面中使用，可使项目结构变得更加清晰
 
- tests //该文件为测试脚本文件，不会生成路由配置，如果需要使用mock测试，可以在外部mock文件中或者在该文件下创建__mock__文件
```




### src/layouts
全局布局，如果该文件夹下有index.(js|tsx)会在所有路由外面嵌套一层路由
```js
// 例如之前路由为

[
  { path: '/', component: './pages/index' },
  { path: '/users', component: './pages/users' },
]
//嵌套之后为
[
  { path: '/', component: './layouts/index', routes: [
    { path: '/', component: './pages/index' },
    { path: '/users', component: './pages/users' },
  ] }
]

可在index文件中进行全局布局，或者根据pathname修改不同路由下的布局
```
##### src/models
全局models,如果有一个以上的页面会使用相同namespace空间内的代码，请将models文件放在此处，不然两个页面之间做交互时，
namespace中的代码会产生影响

##### src/styles
存放通用样式，如果想覆盖全局样式可在global.(css|less|sass|scss)进行修改，此文件不走 css modules，且会自动被引入。
或者在app.(js|ts)中导入样式文件

##### src/pages/.umi
这是 umi dev 时生产的临时目录，默认包含 umi.js 和 router.js，有些插件也会在这里生成一些其他临时文件。可以在这里做一些验证，但请不要直接在这里修改代码，umi 重启或者 pages 下的文件修改都会重新生成这个文件夹下的文件。
该文件下的router.js可查看自动生成的路由

##### src/pages/...
项目页面文件，在不同文件中创建的components、models、services文件最好只在该页面中使用，可使项目结构变得更加清晰

##### tests
该文件为测试脚本文件，不会生成路由配置，如果需要使用mock测试，可以在外部mock文件中或者在该文件下创建__mock__文件

### Dva.js使用需掌握的知识点
##### Model
在 umi 项目中，你可以使用 dva 来处理数据流，以响应一些复杂的交互操作。这些处理数据流的文件统一放在 models 文件夹下，每一个文件默认导出一个对象，里面包含数据和处理数据的方法，通常我们称之为 model 。一个 model 文件的结构一般是这样的：
```js
export default {
  namespace: 'example', // 这个 model 的名字，必须全局唯一,否则相同namespace的代码会产生影响
  state: {
    count: 0,
  }, // 初始数据
  reducers: {
    save() { ... },
  }, // 用于修改数据
  effects: {
    *getData() { ... },
  }, // 用于获取数据
  subscriptions: {
    setup() { ... },
  }, // 用于订阅数据
}
```
##### Reducer
每一个 reducer 都是一个普通函数，接受 state 和 action 作为参数，即：(state, action) => state ，你可以在函数中更改旧的 state，返回新的 state 。
```js
reducers: {
  save(state, { payload }) {
    return ({ ...state, ...payload });
  },
},
```
##### Effect
每一个 effect 都是一个 生成器函数 ，你可以在这里获取你需要的数据，例如向服务器发起一个请求、或是获取其他 model 里的 state 。为了明确分工，你无法在 effect 中直接修改 state ，但你可以通过 put 方法 调用 reducer 来修改 state
```js
state:{
  assets:{},
},
*changeAssets({ payload }, { call, put, select }) {
  const user = yield select(states => states.user);
  const assets = yield call(fetchData, user);
  yield put({ type: 'save', payload: { assets } });
},
```
##### select
此方法用于获取当前或其他 model 的 state 。
```js
const data = yield select(states => states[namespace]);
```
##### call
此方法用于执行一个异步函数，可以理解为等待这个函数执行结束。项目中常用于发送 http 请求，等待服务端响应数据。
```js
const data = yield call(doSomethingFunc, parameter);
```
##### put
此方法用于触发一个 action，这个 action 既可以是一个 reducer 也可以是一个 effect 。
```js
yield put({ type: 'reducerName', payload: { page } });
```
##### Subscription
subscription 用于订阅一个数据源，根据需要使用 dispatch 触发相应的 action。数据源可以是当前的时间、服务器的 websocket 连接、keyboard 输入、geolocation 变化、history 路由变化等等。 项目中常用于页面初始化数据的自动请求，如：
```js
subscriptions: {
  setup({ dispatch, history }) {
    return history.listen(({ pathname, query }) => {
      // 进入 '/home' 路由，发起一个名叫 'query' 的 effect
      if (pathname === '/home') {
        dispatch({ type: 'query' });
      }
    });
  },
},
```
##### dispatch
类似 effect 中的 put 方法，你可以在 subscription 的参数、或是一个已经 connect 过的组件的 props 中拿到。

##### connect
通过此方法在你的组件中获取到指定 model 的 state 数据。
```js
import { connect } from 'dva';
function App({ user, dispatch }) {
  const handleClick = () => {
    dispatch({ type: 'user/fetchUser' });
  };
  return (
    <div>
      <h2>Hello, {user}</h2>
      <button onClick={handleClick}>Click me</button>
    </div>
  );
}
export default connect(({ user }) => ({ user }))(App);
```
**如果使用es7的装饰器则为**
```js
import { connect } from 'dva';

@connect(({ user }) => ({ user }))
function App({ user, dispatch }) {
  const handleClick = () => {
    dispatch({ type: 'user/fetchUser' });
  };
  return (
    <div>
      <h2>Hello, {user}</h2>
      <button onClick={handleClick}>Click me</button>
    </div>
  );
}
export default App;
```