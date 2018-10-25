const ExtractTextPlugin = require('extract-text-webpack-plugin')

exports.cssLoaders = function (options) {
  options = options || {}

  const styleLoader = {
    loader: 'style-loader',
    options: {
      sourceMap: options.sourceMap,
    },
  }

  const cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap: options.sourceMap,
    },
  }

  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      ident: 'postcss',
      sourceMap: options.sourceMap,
      plugins: [
        options.px2rem ? require('postcss-pxtorem')(typeof options.px2rem === 'object' ? options.px2rem : {
          rootValue: 16, // 你在html节点设的font-size大小
          unitPrecision: 5, // 转rem精确到小数点多少位
          propList: ['*'], // 指定转换成rem的属性，支持 * ！
          selectorBlackList: [], // str/reg 指定不转换的选择器，str时包含字段即匹配
          replace: true,
          mediaQuery: false, // 媒体查询内的px是否转换
          minPixelValue: 0, // 小于指定数值的px不转换
        }) : (...args) => args,
        require('postcss-cssnext')(),
      ],
    },
  }

  function generateLoaders (loader, loaderOptions) {
    const loaders = options.usePostCSS ? [styleLoader, cssLoader, postcssLoader] : [styleLoader, cssLoader]

    if (loader) {
      loaders.push({
        loader: `${loader}-loader`,
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap,
        }),
      })
    }

    if (options.extract) {
      loaders.splice(loaders.indexOf(styleLoader), 1)
      return ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: loaders,
      })
    }

    return loaders
  }

  return {
    css: generateLoaders(),
    less: generateLoaders('less', { javascriptEnabled: true }),
  }
}

exports.styleLoaders = function (options) {
  const output = []
  const loaders = exports.cssLoaders(options)

  for (const extension in loaders) {
    const loader = loaders[extension]
    output.push({
      test: new RegExp(('\\.' + extension + '$')),
      use: loader,
    })
  }

  return output
}
