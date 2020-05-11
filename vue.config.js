const path = require('path')
const SentryPlugin = require('@sentry/webpack-plugin')
const VConsolePlugin = require('vconsole-webpack-plugin')
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const LodashWebpackPlugin = require('lodash-webpack-plugin')
// 为单页面应用注入骨架屏
const SkeletonWebpackPlugin = require('vue-skeleton-webpack-plugin')
// 所有现代浏览器都支持 gzip 压缩，启用 gzip 压缩可大幅缩减传输资源大小，从而缩短资源下载时间，减少首次白屏时间，提升用户体验。
const CompressionPlugin = require('compression-webpack-plugin')
const {
  BundleAnalyzerPlugin
} = require('webpack-bundle-analyzer')
const webpack = require('webpack')
const version = require('./package.json').version

const {
  VUE_APP_TITLE,
  DEVSERVERPORT,
  NODE_ENV,
  VCONSOLE,
  VUE_APP_SENTRY_ENABLED,
  VUE_APP_SENTRY_PLUGIN_ENABLED
} = process.env

const resolve = dir => path.join(__dirname, dir)
const DEV = NODE_ENV === 'development'
const PROD = NODE_ENV === 'production'

module.exports = {
  // 部署应用包时的基本URL，默认为'/'
  publicPath: !DEV ? './' : '/',
  // 将构建好的文件输出到哪里
  outputDir: 'dist',
  // 放置生成的静态资源(js、css、img、fonts)的目录。
  assetsDir: 'static',

  // 可选配置项
  // 指定生成的 index.html 的输出路径
  // indexPath: 'index.html',
  // 是否使用包含运行时编译器的 Vue 构建版本。
  //  runtimeCompiler: false,
  // 默认情况下 babel-loader 会忽略所有 node_modules 中的文件。如果你想要通过 Babel 显式转译一个依赖，可以在这个选项中列出来。
  // transpileDependencies: [],

  // 配置css
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: true,
    sourceMap: true,
    // css预设器配置项
    // loaderOptions: {
    //   postcss: {
    //     // options here will be passed to postcss-loader
    //     plugins: [
    //       require('postcss-px2rem')({
    //         remUnit: 100,
    //       }),
    //     ],
    //   },
    // },
    // 启用 CSS modules for all css / pre-processor files.
    // modules: false,
  },

  lintOnSave: DEV,
  // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
  productionSourceMap: PROD && VUE_APP_SENTRY_ENABLED === 'yes' && VUE_APP_SENTRY_PLUGIN_ENABLED === 'yes',

  // 开发环境服务器
  devServer: {
    host: '0.0.0.0', // 主机地址
    // https: false, // https:{type:Boolean}
    port: Number(DEVSERVERPORT), // 端口号
    open: true, // 配置自动启动浏览器  open: 'Google Chrome'-默认启动谷歌
    overlay: {
      warnings: false,
      errors: true
    }
    // 配置代理服务器，可以用来解决跨域问题
    // proxy: {
    //   '/v1': {
    //     target: 'http://devbuyerapi.ywindex.com',
    //     ws: true, // 代理的WebSockets
    //     changeOrigin: true, // 允许websockets跨域
    //     pathRewrite: {
    //       '^/v1': ''
    //     }
    //   }
    // }
  },
  pwa: {
    name: VUE_APP_TITLE,
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: resolve('src/pwa/service-worker.js')
    }
  },
  // configureWebpack: {
  //   name: VUE_APP_TITLE,
  //   resolve: {
  //     alias: {
  //       '@': resolve('src')
  //     }
  //   },
  // },
  configureWebpack: config => {
    config.name = VUE_APP_TITLE
    config.resolve.alias = {
      '@': resolve('src')
    };
    config.plugins.push(
      new SkeletonWebpackPlugin({
        webpackConfig: {
          entry: {
            app: path.join(__dirname, './src/common/entry-skeleton.js'),
          },
        },
        minimize: true,
        quiet: true,
        router: {
          mode: 'hash',
          routes: [{
              path: '/home',
              skeletonId: 'skeleton1'
            },
            {
              path: '/test/create',
              skeletonId: 'skeleton2'
            },
          ],
        },
      })
    )

    if (PROD) {
      config.plugins.push(new BundleAnalyzerPlugin())
      // gzip 对基于文本格式文件的压缩效果最好（如：CSS、JavaScript 和 HTML），在压缩较大文件时往往可实现高达 70-90% 的压缩率，对已经压缩过的资源（如：图片）进行 gzip 压缩处理，效果很不好。
      config.plugins.push(
        new CompressionPlugin({
          // gzip压缩配置
          test: /\.js$|\.html$|\.css/, // 匹配文件名
          threshold: 10240, // 对超过10kb的数据进行压缩
          deleteOriginalAssets: false, // 是否删除原文件
        })
      )
    }
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        resolve('src/styles/_variables.scss'),
        resolve('src/styles/_mixins.scss'),
        resolve('src/styles/_function.scss'),
        // 摘取部分 antd 样式
        // resolve('src/styles/lib/antd.scss')
      ]
    }
  },
  // 这是一个函数，允许对内部的 webpack 配置进行更细粒度的修改。
  chainWebpack(config) {
    config.set('name', VUE_APP_TITLE)
    config.plugins.delete('preload')
    config.plugins.delete('prefetch')

    // 配置别名
    // config.resolve.alias
    //   .set('@', resolve('src'))
    //   .set('assets', resolve('src/assets'))
    //   .set('components', resolve('src/components'))
    //   .set('views', resolve('src/views'))

    // config.optimization.minimizer('terser').tap((args) => {
    //   // 去除生产环境console
    //   args[0].terserOptions.compress.drop_console = true
    //   return args
    // })

    // 是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建。
    // parallel: require('os').cpus().length > 1,


    config.plugin('__VERSION__')
      .use(new webpack.DefinePlugin({
        __VERSION__: JSON.stringify(version)
      }))
      .end()

    if (!DEV) {
      config.plugin('loadshReplace')
        .use(new LodashWebpackPlugin())
        .end()
    }
    config.plugin('VConsolePlugin')
      .use(new VConsolePlugin({
        filter: [],
        enable: DEV && VCONSOLE === 'yes'
      }))
      .end()

    config.plugin('ProvidePlugin')
      .use(new webpack.ProvidePlugin({
        _: 'lodash'
      }))
      .end()

    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    // set preserveWhitespace
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true
        return options
      })
      .end()

    config
      .when(DEV, config => config.devtool('cheap-source-map'))

    config
      .when(!DEV,
        config => {
          // config
          //   .plugin('ScriptExtHtmlWebpackPlugin')
          //   .after('html')
          //   .use('script-ext-html-webpack-plugin', [{
          //     inline: /runtime\..*\.js$/
          //   }])
          //   .end()
          config
            .optimization.splitChunks({
              chunks: 'all',
              cacheGroups: {
                libs: {
                  name: 'chunk-libs',
                  test: /[\\/]node_modules[\\/]/,
                  priority: 10,
                  chunks: 'initial'
                },
                vantUI: {
                  name: 'chunk-vantUI',
                  priority: 20,
                  test: /[\\/]node_modules[\\/]_?vant(.*)/
                },
                commons: {
                  name: 'chunk-commons',
                  test: resolve('src/components'),
                  minChunks: 3,
                  priority: 5,
                  reuseExistingChunk: true
                }
              }
            })
          config.optimization.runtimeChunk('single')
        }
      )

    if (PROD && VUE_APP_SENTRY_ENABLED === 'yes' && VUE_APP_SENTRY_PLUGIN_ENABLED === 'yes') {
      config.plugin('sentryPlugin')
        .use(new SentryPlugin({
          release: version,
          include: path.join(__dirname, './dist/static/js'),
          urlPrefix: '~/statis/js',
          ignore: ['node_modules']
        }))
        .end()
    }
  },


  // 配置CDN引入资源时可使用，例如
  // <script src="https://cdn.bootcss.com/vue/2.6.10/vue.min.js"></script>
  // <script src="https://cdn.bootcss.com/axios/0.19.0-beta.1/axios.min.js"></script>
  // <script src="https://cdn.bootcss.com/vuex/3.1.0/vuex.min.js"></script>
  // <script src="https://cdn.bootcss.com/vue-router/3.0.2/vue-router.min.js"></script>
  // <script src="https://cdn.bootcss.com/element-ui/2.6.1/index.js"></script>
  // externals: {
  //   'vue': 'Vue',
  //   'vuex': 'Vuex',
  //   'vue-router': 'VueRouter',
  //   'axios':'axios'
  // }
}
