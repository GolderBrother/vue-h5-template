const {
  NODE_ENV,
  VUE_APP_SENTRY_ENABLED
} = process.env
const PROD = NODE_ENV === 'production'
const plugins = []

if (PROD && VUE_APP_SENTRY_ENABLED === 'yes') {
  plugins.push([
    'try-catch-error-report',
    {
      expression: 'window.$sentry.log',
      needFilename: true,
      needLineNo: true,
      needColumnNo: false,
      needContext: true,
      exclude: ['node_modules']
    }
  ])
  // 配置按需引入，对于第三方 UI 组件，如果是全部引入的话，比如会造成打包体积过大，加载首页白屏时间过长的问题，所以按需加载非常必要。vant 也提供了按需加载的方法。babel-plugin-import 是一款 babel 插件，它会在编译过程中将 import 的写法自动转换为按需引入的方式。
  plugins.push(['import', {
    libraryName: 'vant',
    libraryDirectory: 'es',
    style: true
  }, 'vant'])
}
module.exports = {
  plugins,
  presets: ['@vue/cli-plugin-babel/preset']
}
